import { action, thunkOn, Action, ThunkOn, Thunk, thunk } from "easy-peasy";
import { FileData, FileSystemDAC } from "fs-dac-library";
import { ISong } from "kokoro";
import {
  MUSIC_DATA_FOLDER,
  MUSIC_DATA_FOLDER_PATH,
  MUSIC_FOLDER,
  MUSIC_FOLDER_PATH,
  MUSIC_RECORD_FILENAME,
  MYSKY_RESOLVER_LINK,
  StoreModel,
} from "./store";

export type SongModel = {
  name?: string;
  musicSrc?: string;
  singer?: string;
  cover?: string;
  browserUrl?: string;
  srcLink?: string;
  songName?: string;
  songArtist?: string;
  done?: boolean;
};

export interface Playlists {
  [title: string]: {
    songs: Array<ISong>;
  };
}

export type ISongModel = ISong & {
  skylink: string;
  done?: boolean;
  ext?: string;
};

export interface MusicPlayerModelType {
  loading: boolean;
  audioPlayerInstance: any;
  playing: boolean;

  recentUploads: Array<any>;
  playlists: Playlists;
  audioLibrary: {
    [title: string]: ISongModel;
  };
  currentQueue: Array<ISong>;

  setLoading: Action<MusicPlayerModelType, boolean>;
  addAudioFileInDirectory: Action<MusicPlayerModelType, ISongModel>;
  deleteAudioFile: Action<MusicPlayerModelType, { title: string }>;
  updateAudioFile: Action<MusicPlayerModelType, { i: number; elem: any }>;
  clearAudioFiles: Action<MusicPlayerModelType>;
  setRecentUploads: Action<MusicPlayerModelType, { files: Array<any> }>;
  loadData: Action<
    MusicPlayerModelType,
    Pick<MusicPlayerModelType, "playlists" | "audioLibrary">
  >;
  prepareDetailsToAudioFile: Thunk<
    MusicPlayerModelType,
    Pick<ISongModel, "album" | "artist" | "title"> & {
      currentTitle: string;
      coverFile: File;
    },
    {},
    StoreModel
  >;

  addDetailsToAudioFile: Action<
    MusicPlayerModelType,
    Pick<ISongModel, "album" | "artist" | "cover" | "title"> & {
      currentTitle: string;
    }
  >;
  addNewPlaylist: Action<
    MusicPlayerModelType,
    { playlistTitle: string; songs?: Array<string> }
  >;
  addNewSongToPlaylist: Action<
    MusicPlayerModelType,
    { song: ISongModel; playlistTitle: string }
  >;
  onLoginChange: ThunkOn<MusicPlayerModelType, {}, StoreModel>;
}

export const getFileDataFromMusicData = async (
  {
    audioLibrary,
    playlists,
  }: Partial<Pick<MusicPlayerModelType, "audioLibrary" | "playlists">>,
  fileSystem: FileSystemDAC
): Promise<FileData> => {
  const musicRecordJSON = JSON.stringify({
    audioLibrary: audioLibrary || {},
    playlists: playlists || {},
  });
  const musicRecordBlob = new Blob([musicRecordJSON], {
    type: "application/json",
  });
  const fileData = await fileSystem.uploadFileData(
    musicRecordBlob,
    MUSIC_RECORD_FILENAME
  );
  return fileData;
};

export const musicPlayerModel: MusicPlayerModelType = {
  // AudioFile State
  loading: false,
  audioPlayerInstance: undefined,
  playing: false,
  recentUploads: [],
  playlists: {},
  audioLibrary: {},
  currentQueue: [],

  // AudioFile Setters and CRUD operations
  setLoading: action((state, isLoading) => {
    state.loading = isLoading;
  }),

  addAudioFileInDirectory: action(
    (state, { title, artist, cover, src, skylink, album }) => {
      const strippedTitle = title.split(".")[0];
      const fileExtension = title.split(".")[1];

      state.audioLibrary[title] = {
        title: strippedTitle,
        ext: fileExtension,
        artist,
        cover,
        src,
        skylink,
        album,
      };
    }
  ),

  addDetailsToAudioFile: action(
    (state, { album, artist, title, currentTitle, cover }) => {
      if (title !== currentTitle) {
        console.log("this is the songdetails");
        console.log(currentTitle);
        console.log(title);
        const newSong = state.audioLibrary[currentTitle];
        newSong.title = title;
        newSong.artist = artist;
        newSong.cover = cover;
        newSong.album = album;

        delete state.audioLibrary[currentTitle];
        state.audioLibrary[title] = newSong;
      } else {
        state.audioLibrary[title] = {
          ...state.audioLibrary[title],
          title,
          artist,
          cover,
          album,
        };
      }
    }
  ),

  prepareDetailsToAudioFile: thunk(
    async (
      actions,
      { album, artist, title, currentTitle, coverFile },
      { getStoreState, getStoreActions }
    ) => {
      const addMessage = getStoreActions().ui.addMessage;

      if (coverFile) {
        actions.setLoading(true);

        const fileSystem = getStoreState().mySky.fileSystem;

        // File name is {songTitle}-cover.{picture ext}
        const fileName = `${title}-cover${coverFile.name.split(".")[1]}`;
        const coverFileData = await fileSystem.uploadFileData(
          coverFile,
          fileName
        );
        const cover = await fileSystem.createFile(
          MUSIC_FOLDER_PATH,
          fileName,
          coverFileData
        );
        if (cover.success) {
          const browserUrl = await fileSystem.client.getSkylinkUrl(
            coverFileData.url
          );
          actions.setLoading(false);
          actions.addDetailsToAudioFile({
            cover: browserUrl,
            currentTitle,
            album,
            artist,
            title,
          });
          addMessage({ message: `Saving details to file - ${currentTitle}` });
        }
      } else {
        actions.addDetailsToAudioFile({
          currentTitle,
          album,
          artist,
          title,
          cover: "",
        });

        addMessage({ message: `Saving details to file - ${currentTitle}` });
      }

      // Set all elements to values passed, values will be default if not provided by user on save
    }
  ),

  deleteAudioFile: action((state, { title }) => {
    delete state.audioLibrary[title];
  }),
  updateAudioFile: action((state, payload) => {
    state.audioLibrary[payload.i].done = payload.elem.checked;
  }),
  clearAudioFiles: action((state, payload) => {
    state.audioLibrary = {};
  }),
  loadData: action((state, { audioLibrary, playlists }) => {
    state.audioLibrary = audioLibrary;
    state.playlists = playlists;
  }),

  addNewPlaylist: action((state, { playlistTitle, songs }) => {
    const songsList = songs.map((key) => state.audioLibrary[key]);

    state.playlists[playlistTitle] = {
      songs: songs ? songsList : [],
    };
  }),

  setRecentUploads: action((state, { files }) => {
    state.recentUploads = files;
  }),

  addNewSongToPlaylist: action((state, { song, playlistTitle }) => {
    state.playlists[playlistTitle].songs.push(song);
  }),

  // Todo Thunks

  //   togglePlay: thunkOn(
  //     (actions, storeActions) => actions.playSong,
  //     (actions, target, { getStoreState }) => {
  //       const isPlaying = getStoreState().music.playing;
  //       const musicPlayer = getStoreState().music.audioPlayerInstance;
  //       if (musicPlayer) {
  //         actions.setPlaying(!isPlaying);
  //       }
  //     }
  //   ),
  onLoginChange: thunkOn(
    (actions, storeActions) => storeActions.mySky.setUserID,
    async (actions, target) => {
      // logging in, call loadAudioFiles
      if (target.payload.userID) {
        actions.setLoading(true);

        const fileSystem = target.payload.fileSystem;
        console.log("THIS IS fs-dac OBJ");
        console.log(fileSystem);

        const response = await fileSystem.getDirectoryIndex(
          MUSIC_DATA_FOLDER_PATH
        );
        console.log("THIS IS THE DATA COMING BACK FROM fs-dac", response);
        if (Object.keys(response.files).length !== 0) {
          const musicDataRef = response.files[MUSIC_RECORD_FILENAME].file;
          const musicDataBlob = await fileSystem.downloadFileData(
            musicDataRef,
            "application/json"
          );
          const musicData = JSON.parse(await musicDataBlob.text());
          if (
            musicData?.playlists &&
            musicData?.audioLibrary &&
            !Array.isArray(musicData?.audioLibrary)
          ) {
            actions.loadData({
              audioLibrary: musicData.audioLibrary,
              playlists: musicData.playlists,
            });
          }
        } else {
          fileSystem
            .createDirectory(MYSKY_RESOLVER_LINK, MUSIC_FOLDER)
            .then(async (result) => {
              if (result.success) {
                const musicRecordFileName = MUSIC_RECORD_FILENAME;
                // Create empty json file with no info for initialization
                const fileData = await getFileDataFromMusicData({}, fileSystem);

                await fileSystem.createFile(
                  `${MYSKY_RESOLVER_LINK}/${MUSIC_DATA_FOLDER}`,
                  musicRecordFileName,
                  fileData
                );
              }
            })
            .catch((error) => {
              console.error("failed to create directory", error);
            });
        }
        actions.setLoading(false);
      }
    }
  ),

  // AudioFile Thunks
};
