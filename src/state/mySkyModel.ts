import {
  action,
  thunk,
  thunkOn,
  computed,
} from "easy-peasy";
import { getFileDataFromMusicData } from "./musicPlayerModel";
import {
  MUSIC_DATA_FOLDER_PATH,
  MUSIC_RECORD_FILENAME,
} from "./store";
import { MySkyModelType } from "./types";


export const mySkyModel: MySkyModelType = {
  // MySky State
  userID: null, //only set through setUserID!
  mySky: null,
  fileSystem: null,
  loggedIn: computed((state) => !!state.userID),

  // MySky Setters
  setMySky: action((state, { mySky }) => {
    state.mySky = mySky;
  }),

  setFileSystem: action((state, { fileSystem }) => {
    state.fileSystem = fileSystem;
  }),

  setValidUserID: action((state, { userID }) => {
    state.userID = userID;
  }),
  setNullUserID: action((state) => {
    state.userID = null;
  }),
  setUserID: thunk((actions, { userID }) => {
    if (userID) {
      actions.setValidUserID({ userID });
    } else {
      actions.setNullUserID();
    }
  }),

  // MySky Thunks
  fetchUserID: thunk(
    async (actions, { mySky, player, fileSystem }, { getStoreActions }) => {
      if (mySky) {
        const storeActions = getStoreActions();
        actions.setMySky({ mySky });
        // @ts-ignore
        storeActions.music.setMusicPlayer({ player });
        actions.setFileSystem({ fileSystem });
        const userID = await mySky.userID();
        if (userID) {
          actions.setUserID({ userID, fileSystem, mySky });
        } else {
          actions.setUserID({ userID: null });
        }
      }
    }
  ),
  fetchMusicDirectory: thunk(async (actions, { mySky, fileSystem }) => {
    if (mySky) {
    }
  }),
  logout: thunk(async (actions, { mySky }) => {
    await mySky.logout();
    actions.setUserID({ userID: null });
  }),
  persistPreludeState: thunkOn(
    (actions, storeActions) => [
      storeActions.music.addAudioFileInDirectory,
      storeActions.music.deleteAudioFile,
      storeActions.music.addNewPlaylist,
      storeActions.music.addNewSongToPlaylist,
    ],
    async (actions, target, { getStoreState }) => {
      const audioLibrary = getStoreState().music.audioLibrary;
      const playlists = getStoreState().music.playlists;

      const fileSystem = getStoreState().mySky.fileSystem;

      if (fileSystem) {
        console.log("persisting audio files to MySky");

        const musicRecordFileName = MUSIC_RECORD_FILENAME;
        const fileData = await getFileDataFromMusicData(
          {
            audioLibrary,
            playlists,
          },
          fileSystem
        );

        const fileUploadResult = await fileSystem.updateFile(
          MUSIC_DATA_FOLDER_PATH,
          musicRecordFileName,
          fileData
        );

        console.log("result of clienc call", fileUploadResult);
      }
    }
  ),
};
