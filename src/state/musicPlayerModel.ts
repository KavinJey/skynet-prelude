// @ts-nocheck
// AudioFile: make typesafe`
import { action, thunkOn, actionOn } from "easy-peasy";
import { _Pick } from "underscore";

const songModel = {
  name: "Intro",
  singer: "The Notorious B.I.G",
  cover: "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
  musicSrc:
    "http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3",
};
export type SongModel = typeof songModel;
export interface IMusicPlayerModel {
  loading: boolean;
  personalLibrary: Array<any>;
  audioFileItems: Array<any>;
  currentQueue: Array<any>;
}

export const musicPlayerModel = {
  // AudioFile State
  loading: false,
  audioPlayerInstance: undefined,
  playing: false,
  personalLibrary: [],
  audioFileItems: [],
  currentQueue: [],

  // AudioFile Setters and CRUD operations
  setLoading: action((state, { isLoading }) => {
    state.loading = isLoading;
  }),

  addAudioFile: action(
    (state, { songName, songArtist, cover, srcLink, browserUrl, done }) => {
      state.audioFileItems.push({
        songName,
        songArtist,
        cover,
        srcLink,
        browserUrl,
        done,
      });
    }
  ),

  addAudioFileDetails: action(
    (state, payload) => {
        console.log('this is the state', state)
        console.log('this is the payload', payload)
      const songIndex = state.audioFileItems.findIndex(
        (audioFile) => audioFile?.srcLink === payload.srcLink
      );

      console.log("this is the song index", songIndex);
      const currentSongToEdit = state.audioFileItems[songIndex];
      currentSongToEdit.songName = payload.songName;
      currentSongToEdit.songArtist = payload.songArtist;
      currentSongToEdit.cover = payload.cover;
    }
  ),
  deleteAudioFile: action((state, payload) => {
    state.audioFileItems.splice(payload.index, 1);
  }),
  updateAudioFile: action((state, payload) => {
    state.audioFileItems[payload.i].done = payload.elem.checked;
  }),
  clearAudioFiles: action((state, payload) => {
    state.audioFileItems = [];
  }),
  loadAudioFiles: action((state, { audioFileItems }) => {
    console.log("This is audio files coming after login");
    state.audioFileItems = audioFileItems;
  }),

  playSong: action((state, song) => {
    console.log("this is state when playing", state);

    console.log("this is state when playing", song);
    state.currentQueue[0] = song;

    console.log('this is the instance', state.audioPlayerInstance)

    // if (state.audioPlayerInstance) {
    //   state.audioPlayerInstance.togglePlay();
    //   state.playing = true;
    // }
  }),

  setPlaying: action((state, { playing }) => {
    state.playing = playing
  }),

   

  clearQueue: action((state) => {
    state.currentQueue = [];
  }),
  addToQueue: action((state, song) => {
    const currentQueue = state.currentQueue
    currentQueue.push(song);
    console.log("incoming song", song);
    console.log("this is new queue", state.currentQueue);
  }),

  addAudioPlayerInstance: action((state, { audioPlayerInstance }) => {
    console.log("this is the instance");
    console.log(audioPlayerInstance);
    state.audioPlayerInstance = audioPlayerInstance;
  }),

  // Todo Thunks


  togglePlay: thunkOn(
    (actions, storeActions) => actions.playSong,
    (actions, target, { getStoreState }) => {
        const isPlaying = getStoreState().music.playing
        const musicPlayer = getStoreState().music.audioPlayerInstance
        if (musicPlayer) {
            actions.setPlaying(!isPlaying)
            
        }
    }
  ),
  reloadMusicPlayer: thunkOn(
    (actions, storeActions) => [
        actions.addToQueue,
        actions.clearQueue,
        actions.playSong
    ],
    (action, target, { getStoreState }) => {
        const musicPlayer = getStoreState().music.audioPlayerInstance
        if (musicPlayer) {
            musicPlayer.load()
        }
    }
  ),
  refreshLibrary: thunkOn(
      (actions, storeActions) => actions.addAudioFileDetails,
      async (actions, target,  {getStoreState, getStoreActions}) => {
            const mySky  = getStoreState().mySky.mySky
            if (mySky) {

                const response = await mySky.getJSON("AQDRh7aTcPoRFWp6zbsMEA1an7iZx22DBhV_LVbyPPwzzA/prelude.json");
                const data = response.data;
                console.log("THIS IS THE DATA COMING BACK FROM MYSKY", data);
                console.log("full obj from mysky after refresh", response);
                if (data) {
                actions.loadAudioFiles({ audioFileItems: data.audioFileItems });
                } else {
                await mySky.setJSON("AQDRh7aTcPoRFWp6zbsMEA1an7iZx22DBhV_LVbyPPwzzA/prelude.json", { audioFileItems: [] });
                }
                actions.setLoading({ isLoading: false });
                }

      }
  ),
  onLoginChange: thunkOn(
    (actions, storeActions) => storeActions.mySky.setUserID,
    async (actions, target) => {
      // logging in, call loadAudioFiles
      if (target.payload.userID) {
        actions.setLoading({ isLoading: true });

        const mySky = target.payload.mySky;
        console.log("THIS IS MYSKY OBJ");
        console.log(mySky);

        const response = await mySky.getJSON("AQDRh7aTcPoRFWp6zbsMEA1an7iZx22DBhV_LVbyPPwzzA/prelude.json");
        const data = response.data;
        console.log("THIS IS THE DATA COMING BACK FROM MYSKY", data);
        console.log("full obj from mysky", response);
        if (data) {
          actions.loadAudioFiles({ audioFileItems: data.audioFileItems });
        } else {
          await mySky.setJSON("AQDRh7aTcPoRFWp6zbsMEA1an7iZx22DBhV_LVbyPPwzzA/prelude.json", { audioFileItems: [] });
        }
        actions.setLoading({ isLoading: false });
      }
    }
  ),

  // AudioFile Thunks
};
