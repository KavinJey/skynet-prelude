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

  //  fetchMusicDirectory: thunk(
  //   (actions, storeActions) => actions.setFileSystem,
  //   async (actions, { player, fileSystem }, { getStoreActions}) => {
  //     // logging in, call loadAudioFiles

  //     const fs = payload.fileSystem.client

  //     if (payload.userID) {
  //       const setLoading = getStoreActions().music.setLoading();
  //       setLoading({ isLoading: true });
  //       const userDirectory = `${MYSKY_RESOLVER_LINK}/prelude.json`

  //       const res = await fs.getDirectoryIndex(userDirectory)
  //       console.log('response from fs-dac directory call ', res)

  //       if (data) {
  //         actions.loadAudioFiles({ audioFileItems: data.audioFileItems });
  //       } else {
  //         const res = await fs.createDirectory(
  //           "localhost",
  //           "prelude"
  //         );

  //         console.log("response for fs-dac on creating dir", res);
  //       }
  //       actions.setLoading({ isLoading: false });
  //     }
  //   }
  //  ),
  //   persistHNSEntriesState: thunkOn(
  //     (actions, storeActions) => [
  //       storeActions.hns.addEntry,
  //       storeActions.hns.updateEntry,
  //       storeActions.hns.deleteEntry,
  //     ],
  //     async (actions, target, { getStoreState }) => {
  //       const hnsEntries = getStoreState().hns.hnsEntries;
  //       const mySky = getStoreState().mySky.mySky;

  //       if (mySky) {
  //         console.log("persisting HNS entries to MySky");
  //         await mySky.setJSON("localhost/hnsEntries.json", { hnsEntries });
  //       }
  //     }
  //   ),
};
