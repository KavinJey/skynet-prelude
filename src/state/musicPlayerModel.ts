import { action, thunkOn, actionOn, Action, Thunk, ThunkOn } from "easy-peasy";
import { DirectoryFile } from "fs-dac-library";
import { _Pick } from "underscore";
import { MySkyModelType } from "./mySkyModel";
import { StoreModel } from "./store";

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

interface Playlists {
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
  audioFileItems: Object;
  currentQueue: Array<SongModel>;

  setLoading: Action<MusicPlayerModelType, { isLoading: boolean }>;
  updateAudioFile: Action<MusicPlayerModelType, { i: number; elem: any }>;
  clearAudioFiles: Action<MusicPlayerModelType>;
  loadAudioFiles: Action<
    MusicPlayerModelType,
    { audioFileItems: { [k: string]: DirectoryFile } }
  >;
  loadPlaylists: Action<MusicPlayerModelType, { playlists: Playlists }>;
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

export const musicPlayerModel: MusicPlayerModelType = {
  // AudioFile State
  loading: false,
  audioPlayerInstance: undefined,
  playing: false,
  personalLibrary: [],
  playlists: {},
  audioFileItems: [],
  currentQueue: [],

  // AudioFile Setters and CRUD operations
  setLoading: action((state, { isLoading }) => {
    state.loading = isLoading;
  }),

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
  updateAudioFile: action((state, payload) => {
    state.audioFileItems[payload.i].done = payload.elem.checked;
  }),
  clearAudioFiles: action((state, payload) => {
    state.audioFileItems = [];
  }),
  loadAudioFiles: action((state, { audioFileItems }) => {
    console.log("This is audio files coming after login");
    state.audioFileItems = audioFileItems;
    console.log(audioFileItems);
    // state.audioFileItems = audioFileItems;
  }),

  loadPlaylists: action((state, { playlists }) => {
    console.log("This is audio files coming after login");
    state.playlists = playlists;
  }),
  //   playSong: action((state, song) => {
  //     console.log("this is state when playing", state);

  //     console.log("this is state when playing", song);
  //     state.currentQueue[0] = song;

  //     console.log("this is the instance", state.audioPlayerInstance);

  //     // if (state.audioPlayerInstance) {
  //     //   state.audioPlayerInstance.togglePlay();
  //     //   state.playing = true;
  //     // }
  //   }),

  //   setPlaying: action((state, { playing }) => {
  //     state.playing = playing;
  //   }),

  //   clearQueue: action((state) => {
  //     state.currentQueue = [];
  //   }),
  //   addToQueue: action((state, song) => {
  //     const currentQueue = state.currentQueue;
  //     currentQueue.push(song);
  //     console.log("incoming song", song);
  //     console.log("this is new queue", state.currentQueue);
  //   }),

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
  onLoginChange: thunkOn(
    (actions, storeActions) => storeActions.mySky.setUserID,
    async (actions, target) => {
      // logging in, call loadAudioFiles
      if (target.payload.userID) {
        actions.setLoading({ isLoading: true });

        const fileSystem = target.payload.fileSystem;
        console.log("THIS IS TARGET");
        console.log(target);
        console.log("THIS IS MYSKY OBJ");
        console.log(fileSystem);

        if (fileSystem) {
          const index = await fileSystem.getDirectoryIndex("prelude.hns/Music");

          const otherIndex = await fileSystem.getDirectoryIndex(
            "skyfs://local/fs-dac.hns/home?recursive=true"
          );
          console.log("this is index", index);
          console.log("this is otherIndex", otherIndex);
          actions.loadAudioFiles({ audioFileItems: { ...index.files } });
        }

        // const response = await mySky.getJSON(
        //   "AQDRh7aTcPoRFWp6zbsMEA1an7iZx22DBhV_LVbyPPwzzA/prelude.json"
        // );
        // const data = response.data;
        // console.log("THIS IS THE DATA COMING BACK FROM MYSKY", data);
        // console.log("full obj from mysky", response);
        // if (data?.audioFileItems && data?.playlists) {
        //   actions.loadAudioFiles({
        //     audioFileItems: data.audioFileItems as Array<SongModel>,
        //   });
        //   actions.loadPlaylists({ playlists: data.playlists as Playlists });
        // } else {
        //   await mySky.setJSON(
        //     "AQDRh7aTcPoRFWp6zbsMEA1an7iZx22DBhV_LVbyPPwzzA/prelude.json",
        //     { audioFileItems: [], playlists: {} }
        //   );
        // }
        // actions.setLoading({ isLoading: false });
      }
    }
  ),

  // AudioFile Thunks
};
