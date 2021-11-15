//  @ts-nocheck
// TODO: make typesafe
import { action, thunk, thunkOn, computed } from "easy-peasy";

export const mySkyModel = {
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
  fetchUserID: thunk(async (actions, { mySky }) => {
    if (mySky) {
      actions.setMySky({ mySky });
      const userID = await mySky.userID();
      if (userID) {
        actions.setUserID({ userID, mySky });
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
        storeActions.deleteAudioFile
    ],
    async (actions, target, { getStoreState }) => {
        const audioFileItems  = getStoreState().music.audioFileItems
        console.log('persisting the following', audioFileItems)
        const mySky = getStoreState().mySky.mySky;
        
        if (mySky) {
            console.log('persisting audio files to MySky')
            const result =  await mySky.setJSON('localhost/prelude.json', { audioFileItems })
            console.log('result of clienc call', result)
        } 

    }
  ),

   onFileSystemSet: thunkOn(
    (actions, storeActions) => actions.setFileSystem,
    async (actions, { payload }, { getStoreActions, getStoreState }) => {
      // logging in, call loadAudioFiles

      const fs = payload.fileSystem.client 
      
      if (payload.userID) {
        const setLoading = getStoreActions().music.setLoading;
        setLoading({ isLoading: true });
        
        const res = await fs.getDirectoryIndex("localhost/prelude.json")
        console.log('response from fs-dac directory call ', res)


        if (data) {
          actions.loadAudioFiles({ audioFileItems: data.audioFileItems });
        } else {
          const res = await fs.createDirectory(
            "localhost",
            "prelude"
          );

          console.log("response for fs-dac on creating dir", res);
        }
        actions.setLoading({ isLoading: false });
      }
    }
   )
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
