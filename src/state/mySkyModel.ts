import {
  action,
  thunk,
  thunkOn,
  computed,
  Computed,
  Action,
  Thunk,
  ThunkOn,
} from "easy-peasy";
import { MySky } from "skynet-js";
import { FileSystemDAC } from "fs-dac-library";
import { MusicPlayerModelType } from "./musicPlayerModel";
import { StoreModel } from "./store";
export interface MySkyModelType {
  userID?: string;
  mySky?: MySky;
  fileSystem?: FileSystemDAC;
  loggedIn: Computed<MySkyModelType, boolean>;
  setMySky: Action<MySkyModelType, { mySky: MySky }>;

  setFileSystem: Action<MySkyModelType, { fileSystem: FileSystemDAC }>;

  setUserID: Thunk<
    MySkyModelType,
    { userID: string; mySky?: MySky; fileSystem?: FileSystemDAC }
  >;

  setValidUserID: Action<MySkyModelType, { userID: string }>;

  setNullUserID: Action<MySkyModelType>;

  fetchUserID: Thunk<MySkyModelType, MySkyModelType>;

  logout: Thunk<MySkyModelType, MySkyModelType>;
  persistPreludeState: ThunkOn<MySkyModelType, any, StoreModel>;
}

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
  fetchUserID: thunk(async (actions, { mySky, fileSystem }) => {
    if (mySky) {
      actions.setMySky({ mySky });
      actions.setFileSystem({ fileSystem });
      const userID = await mySky.userID();
      if (userID) {
        actions.setUserID({ userID, mySky, fileSystem });
      } else {
        actions.setUserID({ userID: null });
      }
    }
  }),
  logout: thunk(async (actions, { mySky }) => {
    await mySky.logout();
    actions.setUserID({ userID: null });
  }),
  persistPreludeState: thunkOn(
    (actions, storeActions) => [
      storeActions.music.addAudioFile,
      storeActions.music.updateAudioFile,
      storeActions.music.deleteAudioFile,
      storeActions.music.addNewPlaylist,
      storeActions.music.addNewSongToPlaylist,
    ],
    async (actions, target, { getStoreState }) => {
      // const audioFileItems = getStoreState().music.audioFileItems;
      // const playlists = getStoreState().music.playlists;
      // console.log("persisting the following", audioFileItems);
      // console.log("persisting the following", playlists);
      // const mySky = getStoreState().mySky.mySky;
      // if (mySky) {
      //   console.log("persisting audio files to MySky");
      //   const result = await mySky.setJSON(
      //     "AQDRh7aTcPoRFWp6zbsMEA1an7iZx22DBhV_LVbyPPwzzA/prelude.json",
      //     { audioFileItems, playlists }
      //   );
      //   console.log("result of clienc call", result);
      // }
      // TODO: PERSIST PRELUDE TO MYSKY OR FS_DAC
    }
  ),

  //    onFileSystemSet: thunkOn(
  //     (actions, storeActions) => actions.setFileSystem,
  //     async (actions, { payload }, { getStoreActions, getStoreState }) => {
  //       // logging in, call loadAudioFiles

  //       const fs = payload.fileSystem.client

  //       if (payload.userID) {
  //         const setLoading = getStoreActions().music.setLoading;
  //         setLoading({ isLoading: true });

  //         const res = await fs.getDirectoryIndex("AQDRh7aTcPoRFWp6zbsMEA1an7iZx22DBhV_LVbyPPwzzA/prelude.json")
  //         console.log('response from fs-dac directory call ', res)

  //         if (data) {
  //           actions.loadAudioFiles({ audioFileItems: data.audioFileItems });
  //         } else {
  //           const res = await fs.createDirectory(
  //             "localhost",
  //             "prelude"
  //           );

  //           console.log("response for fs-dac on creating dir", res);
  //         }
  //         actions.setLoading({ isLoading: false });
  //       }
  //     }
  //    )
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
