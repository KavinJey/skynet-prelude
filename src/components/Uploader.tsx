import bytes from "bytes";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { useContext, useState, useEffect } from "react";
import path from "path-browserify";
import { useDropzone } from "react-dropzone";
import { SkynetContext } from "../state/SkynetContext";

import { Container, Header, Icon, Progress, Segment } from "semantic-ui-react";
import { useStoreActions } from "../state/easy-peasy-typed";
import { MUSIC_DATA_FOLDER_PATH, MUSIC_FOLDER_PATH } from "../state/store";

const getFilePath = (file) => file.webkitRelativePath || file.path || file.name;

const getRelativeFilePath = (file) => {
  const filePath = getFilePath(file);
  const { root, dir, base } = path.parse(filePath);
  const relative = path
    .normalize(dir)
    .slice(root.length)
    .split(path.sep)
    .slice(1);

  return path.join(...relative, base);
};

const getRootDirectory = (file) => {
  const filePath = getFilePath(file);
  const { root, dir } = path.parse(filePath);

  return path.normalize(dir).slice(root.length).split(path.sep)[0];
};

const createUploadErrorMessage = (error) => {
  // The request was made and the server responded with a status code that falls out of the range of 2xx
  if (error.response) {
    if (error.response.data.message) {
      return `Upload failed with error: ${error.response.data.message}`;
    }

    const statusCode = error.response.status;
    const statusText = getReasonPhrase(error.response.status);

    return `Upload failed, our server received your request but failed with status code: ${statusCode} ${statusText}`;
  }

  // The request was made but no response was received. The best we can do is detect whether browser is online.
  // This will be triggered mostly if the server is offline or misconfigured and doesn't respond to valid request.
  if (error.request) {
    if (!navigator.onLine) {
      return "You are offline, please connect to the internet and try again";
    }

    // TODO: We should add a note "our team has been notified" and have some kind of notification with this error.
    return "Server failed to respond to your request, please try again later.";
  }

  // TODO: We should add a note "our team has been notified" and have some kind of notification with this error.
  return `Critical error, please refresh the application and try again. ${error.message}`;
};

const UploadElement = ({ file, status, error, url = "", progress = 0 }) => {
  return (
    <Segment>
      <div className="flex items-center">
        {status === "uploading" && <Icon loading name="circle notch" />}
        {status === "processing" && <Icon loading name="spinner" />}
        {status === "complete" && <Icon name="check circle" />}
        {status === "error" && <Icon name="delete" />}
        <div>
          <div>{file.name}</div>
          <div>
            <div>
              {status === "uploading" && (
                <span className="tabular-nums">
                  Uploading {bytes(file.size * progress)} of {bytes(file.size)}
                </span>
              )}

              {status === "processing" && (
                <span className="text-palette-300">Processing...</span>
              )}

              {status === "complete" && <a href={url}>{url}</a>}

              {status === "error" && error && (
                <span className="text-error">{error}</span>
              )}
            </div>
            <div>
              {status === "uploading" && (
                <span className="uppercase tabular-nums">
                  {Math.floor(progress * 100)}%
                  <span className="hidden desktop:inline"> completed</span>
                </span>
              )}
              {status === "processing" && (
                <span className="uppercase text-palette-300">Wait</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <Container>
        {status !== "processing" &&
          status !== "error" &&
          status !== "complete" && (
            <Progress size="tiny" percent={Math.floor(progress * 100)} />
          )}
      </Container>
    </Segment>
  );
};

const Uploader = ({ uploadMode }) => {
  const { fileSystem, client } = useContext(SkynetContext);
  const [mode, setMode] = useState(uploadMode ? uploadMode : "file");
  const [files, setFiles] = useState([]);
  const acceptedFormats = [
    "audio/mpeg",
    "audio/ogg",
    "audio/flac",
    "audio/wav",
  ];

  const addAudioFileInDirectory = useStoreActions(
    (actions) => actions.music.addAudioFileInDirectory
  );

  const handleDrop = async (acceptedFiles) => {
    if (mode === "directory" && acceptedFiles.length) {
      const rootDir = getRootDirectory(acceptedFiles[0]); // get the file path from the first file

      acceptedFiles = [
        { name: rootDir, directory: true, files: acceptedFiles },
      ];
    }

    setFiles((previousFiles) => [
      ...acceptedFiles.map((file) => ({ file, status: "uploading" })),
      ...previousFiles,
    ]);

    const onFileStateChange = (file, state) => {
      setFiles((previousFiles) => {
        const index = previousFiles.findIndex((f) => f.file === file);

        return [
          ...previousFiles.slice(0, index),
          {
            ...previousFiles[index],
            ...state,
          },
          ...previousFiles.slice(index + 1),
        ];
      });
    };

    acceptedFiles.forEach((file) => {
      console.log(acceptedFormats.includes(file.type));
      console.log(file.type);
      console.log(file.name);
      console.log("found file", file);
      console.log(fileSystem);
      if (!acceptedFormats.includes(file.type)) {
        onFileStateChange(file, {
          status: "error",
          error:
            "This file is not an supported format. Currently support mp3s.",
        });

        return;
      }

      const onUploadProgress = (progress) => {
        const status = progress === 1 ? "processing" : "uploading";

        onFileStateChange(file, { status, progress });
      };

      // Reject files larger than our hard limit of 1 GB with proper message
      if (file.size > bytes("1 GB")) {
        onFileStateChange(file, {
          status: "error",
          error: "This file size exceeds the maximum allowed size of 1 GB.",
        });

        return;
      }

      const upload = async () => {
        try {
          let response;

          const songFileData = await fileSystem.uploadFileData(
            file,
            file.name,
            onUploadProgress
          );
          const createdSong = await fileSystem.createFile(
            MUSIC_FOLDER_PATH,
            file.name,
            songFileData
          );

          if (createdSong.success) {
            const browserUrl = await fileSystem.client.getSkylinkUrl(
              songFileData.url
            );
            addAudioFileInDirectory({
              title: file.name,
              skylink: songFileData.url,
              src: browserUrl,
            });

            onFileStateChange(file, { status: "complete", url: browserUrl });
          } else {
            throw Error(createdSong.error);
          }
        } catch (error) {
          if (
            error.response &&
            error.response.status === StatusCodes.TOO_MANY_REQUESTS
          ) {
            onFileStateChange(file, { progress: -1 });

            return new Promise((resolve) =>
              setTimeout(() => resolve(upload()), 3000)
            );
          }

          onFileStateChange(file, {
            status: "error",
            error: createUploadErrorMessage(error),
          });
        }
      };

      upload();
    });
  };

  const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
    onDrop: handleDrop,
  });
  const inputElement = inputRef.current;

  useEffect(() => {
    if (!inputElement) return;
    if (mode === "directory")
      inputElement.setAttribute("webkitdirectory", "true");
    if (mode === "file") inputElement.removeAttribute("webkitdirectory");
  }, [inputElement, mode]);

  return (
    <Container>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Container textAlign="center">
          <Segment stacked>
            <Header as="h3" color="grey">
              <Icon name="add" size="large" />
              {mode === "file" &&
                "Add or drop your music files here to pin to Skynet and access through the player."}
              {mode === "directory" &&
                "Add or drop your build folder here to deploy to Skynet"}
            </Header>
          </Segment>
        </Container>
      </div>

      {files.length > 0 && (
        <Segment.Group>
          {files.map((file, index) => (
            <UploadElement key={index} {...file} />
          ))}
        </Segment.Group>
      )}
    </Container>
  );
};

export default Uploader;
