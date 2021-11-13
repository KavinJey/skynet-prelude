//  @ts-nocheck
// TODO: make typesafe
import { action, thunk, thunkOn } from "easy-peasy";
import { parseSkylink } from "skynet-js";

export const musicPlayerModel = {
  // Todo State
  loading: false,
  personalLibrary: [],

  // Todo Setters and CRUD operations
  loadUserMusicLibrary: action((state, { newSongFile }) => {
    state.personalLibrary.push(newSongFile);
  }),

  // Todo Thunks
};
