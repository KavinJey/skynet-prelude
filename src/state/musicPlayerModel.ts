import { action, thunkOn, actionOn, Action, Thunk, ThunkOn } from "easy-peasy";
import { FileData, FileSystemDAC } from "fs-dac-library";
import { ISong } from "kokoro";
import { _Pick } from "underscore";
import { MySkyModelType } from "./mySkyModel";
import {
  MUSIC_DATA_FOLDER,
  MUSIC_DATA_FOLDER_PATH,
  MUSIC_FOLDER,
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

type ISongModel = ISong & { skylink: string; done?: boolean };

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

  setLoading: Action<MusicPlayerModelType, { isLoading: boolean }>;
  addAudioFileInDirectory: Action<MusicPlayerModelType, ISongModel>;
  deleteAudioFile: Action<MusicPlayerModelType, { title: string }>;
  updateAudioFile: Action<MusicPlayerModelType, { i: number; elem: any }>;
  clearAudioFiles: Action<MusicPlayerModelType>;
  setRecentUploads: Action<MusicPlayerModelType, { files: Array<any> }>;
  loadData: Action<
    MusicPlayerModelType,
    Pick<MusicPlayerModelType, "playlists" | "audioLibrary">
  >;
  addNewPlaylist: Action<
    MusicPlayerModelType,
    { playlistTitle: string; songs: Array<string> }
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
  setLoading: action((state, { isLoading }) => {
    state.loading = isLoading;
  }),

  addAudioFileInDirectory: action(
    (state, { title, artist, cover, src, skylink, album }) => {
      console.log("this is the urls", src, skylink);
      console.log(title, artist, cover, album);

      state.audioLibrary[title] = {
        artist,
        cover,
        src,
        skylink,
        album,
      };
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
        actions.setLoading({ isLoading: true });

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
        actions.setLoading({ isLoading: false });
      }
    }
  ),

  // AudioFile Thunks
};
