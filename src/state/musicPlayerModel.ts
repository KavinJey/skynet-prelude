import { action, thunkOn, actionOn, Action, Thunk, ThunkOn } from "easy-peasy";
import { FileData, FileSystemDAC } from "fs-dac-library";
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
    songs: Array<SongModel>;
  };
}

export interface MusicPlayerModelType {
  loading: boolean;
  audioPlayerInstance: any;
  playing: boolean;

  personalLibrary: Array<any>;
  playlists: Playlists;
  audioLibrary: Array<SongModel>;
  currentQueue: Array<SongModel>;

  setLoading: Action<MusicPlayerModelType, { isLoading: boolean }>;
  addAudioFile: Action<MusicPlayerModelType, SongModel>;
  deleteAudioFile: Action<MusicPlayerModelType, { index: number }>;
  updateAudioFile: Action<MusicPlayerModelType, { i: number; elem: any }>;
  clearAudioFiles: Action<MusicPlayerModelType>;
  loadData: Action<
    MusicPlayerModelType,
    { playlists: Playlists; audioLibrary: Array<SongModel> }
  >;
  addNewPlaylist: Action<
    MusicPlayerModelType,
    { playlistTitle: string; songs: Array<SongModel> }
  >;
  addNewSongToPlaylist: Action<
    MusicPlayerModelType,
    { song: SongModel; playlistTitle: string }
  >;
  addAudioPlayerInstance: Action<MusicPlayerModelType, any>;
  onLoginChange: ThunkOn<MusicPlayerModelType, {}, StoreModel>;
}

export const getFileDataFromMusicData = async (
  {
    audioLibrary,
    playlists,
  }: {
    audioLibrary?: Array<any>;
    playlists?: Playlists;
  },
  fileSystem: FileSystemDAC
): Promise<FileData> => {
  const musicRecordJSON = JSON.stringify({
    audioLibrary: audioLibrary || [],
    playlists: playlists || [],
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
  personalLibrary: [],
  playlists: {},
  audioLibrary: [],
  currentQueue: [],

  // AudioFile Setters and CRUD operations
  setLoading: action((state, { isLoading }) => {
    state.loading = isLoading;
  }),

  addAudioFile: action(
    (state, { songName, songArtist, cover, srcLink, browserUrl, done }) => {
      state.audioLibrary.push({
        songName,
        songArtist,
        cover,
        srcLink,
        browserUrl,
        done,
      });
    }
  ),

  //   addAudioFileDetails: action((state, payload) => {
  //     console.log("this is the state", state);
  //     console.log("this is the payload", payload);
  //     const songIndex = state.audioFileItems.findIndex(
  //       (audioFile) => audioFile?.srcLink === payload.srcLink
  //     );

  //     console.log("this is the song index", songIndex);
  //     const currentSongToEdit = state.audioFileItems[songIndex];
  //     currentSongToEdit.songName = payload.songName;
  //     currentSongToEdit.songArtist = payload.songArtist;
  //     currentSongToEdit.cover = payload.cover;
  //   }),
  deleteAudioFile: action((state, payload) => {
    state.audioLibrary.splice(payload.index, 1);
  }),
  updateAudioFile: action((state, payload) => {
    state.audioLibrary[payload.i].done = payload.elem.checked;
  }),
  clearAudioFiles: action((state, payload) => {
    state.audioLibrary = [];
  }),
  loadData: action((state, { audioLibrary, playlists }) => {
    state.audioLibrary = audioLibrary;
    state.playlists = playlists;
  }),

  addNewPlaylist: action((state, { playlistTitle, songs }) => {
    state.playlists[playlistTitle] = {
      songs: songs ? songs : [],
    };
  }),

  addNewSongToPlaylist: action((state, { song, playlistTitle }) => {
    state.playlists[playlistTitle].songs.push(song);
  }),

  addAudioPlayerInstance: action((state, { audioPlayerInstance }) => {
    console.log("this is the instance");
    console.log(audioPlayerInstance);
    state.audioPlayerInstance = audioPlayerInstance;
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
  //   reloadMusicPlayer: thunkOn(
  //     (actions, storeActions) => [
  //       actions.addToQueue,
  //       actions.clearQueue,
  //       actions.playSong,
  //     ],
  //     (action, target, { getStoreState }) => {
  //       const musicPlayer = getStoreState().music.audioPlayerInstance;
  //       if (musicPlayer) {
  //         musicPlayer.load();
  //       }
  //     }
  //   ),
  //   refreshLibrary: thunkOn(
  //     (actions, storeActions) => actions.addAudioFile,
  //     async (actions, target, { getStoreState, getStoreActions }) => {
  //       const mySky = getStoreState().mySky.mySky;
  //       if (mySky) {
  //         actions.setLoading({ isLoading: true });

  //         const response = await mySky.getJSON(
  //           "AQDRh7aTcPoRFWp6zbsMEA1an7iZx22DBhV_LVbyPPwzzA/prelude.json"
  //         );
  //         const data = response.data;
  //         console.log("THIS IS THE DATA COMING BACK FROM MYSKY", data);
  //         console.log("full obj from mysky after refresh", response);
  //         if (data) {
  //           actions.loadAudioFiles({
  //             audioFileItems: data.audioFileItems as Array<SongModel>,
  //           });
  //         } else {
  //           await mySky.setJSON(
  //             "AQDRh7aTcPoRFWp6zbsMEA1an7iZx22DBhV_LVbyPPwzzA/prelude.json",
  //             { audioFileItems: [] }
  //           );
  //         }
  //         actions.setLoading({ isLoading: false });
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
          if (musicData?.playlists && musicData?.audioLibrary) {
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
