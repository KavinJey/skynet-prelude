import {
  Input,
  Button,
  Form,
  Segment,
  Image,
  Label,
  Container,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "../state/easy-peasy-typed";

import copy from "copy-text-to-clipboard";

function EditSongForm({
  title,
  pageMode,
}: {
  title: string;
  pageMode?: boolean;
}) {
  const currentSongToEdit = useStoreState(
    (state) => state.music.audioLibrary[title]
  );

  const editSong = useStoreActions(
    (actions) => actions.music.prepareDetailsToAudioFile
  );

  const [currentTitle, setCurrentTitle] = useState("");
  const [localSongTitle, setSongTitle] = useState("");
  const [localCover, setCover] = useState<File>();
  const [localArtist, setSongArtist] = useState("");
  const [localAlbum, setLocalAlbum] = useState("");
  const [preview, setPreview] = useState("");
  const [changeImage, setChangeImage] = useState(false);

  const addMessage = useStoreActions((actions) => actions.ui.addMessage);

  useEffect(() => {
    if (!localCover) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(localCover);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [localCover]);

  useEffect(() => {
    console.log("thisis song", currentSongToEdit);
    setCurrentTitle(currentSongToEdit?.title);
    setLocalAlbum(currentSongToEdit?.album);
    setPreview(currentSongToEdit?.cover);
    setSongTitle(currentSongToEdit?.title);
  }, [currentSongToEdit]);

  return (
    <Segment>
      <Container fluid>
        <Form
          onSubmit={() => {
            editSong({
              title: localSongTitle,
              artist: localArtist,
              currentTitle: currentTitle,
              coverFile: localCover,
              album: localAlbum,
            });
          }}
        >
          <Form.Group>
            <Form.Field>
              <label>Song Title</label>
              <Input
                onChange={(e) => setSongTitle(e.target.value)}
                placeholder={currentSongToEdit?.title}
                value={localSongTitle}
              />
            </Form.Field>

            <Form.Field>
              <label>Artist</label>
              <Input
                onChange={(e) => setSongArtist(e.target.value)}
                placeholder={currentSongToEdit?.artist}
                value={localArtist}
              />
            </Form.Field>

            <Form.Field>
              <label>Album</label>
              <Input
                onChange={(e) => setLocalAlbum(e.target.value)}
                placeholder={currentSongToEdit?.album}
                value={localAlbum}
              />
            </Form.Field>
            {pageMode && (
              <Form.Field>
                File Name:{" "}
                <Label horizontal color="purple">
                  {title.trim()}{" "}
                </Label>
              </Form.Field>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <label>Cover</label>

              {preview && (
                <>
                  <Image src={preview} size="small" alt="album cover image" />
                  <Button
                    size="small"
                    color="pink"
                    onClick={() => setChangeImage(true)}
                  >
                    Change Image
                  </Button>
                </>
              )}
              {(!preview || changeImage) && (
                <Input
                  type="file"
                  onChange={(e) => {
                    if (!e.target.files || e.target.files.length === 0) {
                      setCover(undefined);
                      return;
                    }

                    // I've kept this example simple by using the first image instead of multiple
                    setCover(e.target.files[0]);
                    setChangeImage(false);
                    console.log("this is the image", e.target.files[0]);
                  }}
                />
              )}
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <Input
                readOnly
                action={{
                  color: "purple",
                  labelPosition: "right",
                  icon: "copy",
                  content: "Skylink",
                  onClick: async (e) => {
                    await copy(currentSongToEdit?.skylink);
                    addMessage({ message: "Skylink copied to clipboard!" });
                  },
                }}
                defaultValue={currentSongToEdit?.skylink}
              />
            </Form.Field>

            <Form.Field>
              <Input
                readOnly
                action={{
                  color: "purple",
                  labelPosition: "right",
                  icon: "copy",
                  content: "Browser Link",
                  onClick: async (e) => {
                    // src could be string array bc type is from kokoro player
                    copy(currentSongToEdit?.src as string);
                    addMessage({
                      message: "Browser link copied to clipboard!",
                    });
                  },
                }}
                defaultValue={currentSongToEdit?.src}
              />
            </Form.Field>

            <Button
              style={{ alignSelf: "end" }}
              color="purple"
              content="Save"
              labelPosition="right"
              icon="checkmark"
              type="submit"
            />
          </Form.Group>
        </Form>
      </Container>
    </Segment>
  );
}

export default EditSongForm;
