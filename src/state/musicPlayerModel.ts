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
  audioPlayerInstance: "",
  personalLibrary: [],
  audioFileItems: [],
  currentQueue: [
    {
      name: "Intro",
      singer: "The Notorious B.I.G",
      cover:
        "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
      musicSrc:
        "http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3",
    },
    {
      name: "Things Done Changed",
      singer: "The Notorious B.I.G",
      cover:
        "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
      musicSrc:
        "https://siasky.net/AABNRZ5pJ-N_vxEn0yJ1Y9oR2A2khCMsn95xocrQlrY6PQ",
    },
    {
      name: "Gimme the Loot",
      singer: "The Notorious B.I.G",
      cover:
        "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
      musicSrc:
        "https://siasky.net/AACV2ejn7TWPrR4shQMgeEBDsGW-oY3RBBSk0qj37G5DyQ",
    },
    {
      name: "Machine Gun Funk",
      singer: "The Notorious B.I.G",
      cover:
        "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
      musicSrc:
        "https://siasky.net/AACq56g2ijEC4vDinnXaQauI_0EXuUJ8YRoST6DD2BASzw",
    },
    {
      name: "Warning",
      singer: "The Notorious B.I.G",
      cover:
        "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
      musicSrc:
        "https://siasky.net/AABDFCUkcHLyMR3ByZGNLcjaZj5fxuP9e6zxFo5oES3dTw",
    },
    {
      name: "Ready to Die",
      singer: "The Notorious B.I.G",
      cover:
        "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
      musicSrc:
        "https://siasky.net/AACkCRJvL1Y7sbK_yFOhgQK-Av3PvLkZdVaI99asI3iPAA",
    },
    {
      name: "One More Chance",
      singer: "The Notorious B.I.G",
      cover:
        "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
      musicSrc:
        "https://siasky.net/AADj9VBgRdjXk3iGxjUnPlnW0BjGSqs-OPIoybGDm2gc-w",
    },
    {
      name: "#!-@ Me (Interlude)",
      singer: "The Notorious B.I.G",
      cover:
        "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
      musicSrc:
        "https://siasky.net/_BmUz3tOYTP2gCdQe1yFxsA1nZe7zkF5Dm0oVrWSBCH4aA",
    },
    {
      name: "The What",
      singer: "The Notorious B.I.G",
      cover:
        "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
      musicSrc:
        "https://siasky.net/AAAD8Mx2G7wFr6HbQtS-QE15Cs4Hlea6urvl4UBv7NoxVQ",
    },
    {
      name: "Juicy",
      singer: "The Notorious B.I.G",
      cover:
        "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
      musicSrc:
        "https://siasky.net/AADXiRJBmU0QNrNZ7c7Sl8UuvjbXJahg_yiDVbje1A1-BQ",
    },
    {
      name: "Everyday Struggle",
      singer: "The Notorious B.I.G",
      cover:
        "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
      musicSrc:
        "https://siasky.net/AACTyk2-ukcAzl4qWmOHRCcUnUUNaRmTS2YqFCOah7C0Hw",
    },
    {
      name: "Me & My Bitch",
      singer: "The Notorious B.I.G",
      cover:
        "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
      musicSrc:
        "https://siasky.net/AAB9oaYuUpa0ssVth03L66S3_Do6LpVmTiUnCpnX6TjbeQ",
    },
    {
      name: "Big Poppa",
      singer: "The Notorious B.I.G",
      cover:
        "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
      musicSrc:
        "https://siasky.net/AACGtyJWOVM1ebQZ1zXwrwGCmKxDcRpiUXGSdobh--H_Kg",
    },
    {
      name: "Respect",
      singer: "The Notorious B.I.G",
      cover:
        "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
      musicSrc:
        "https://siasky.net/AAC0bRYXQvrE3IeVF6laXn0hgGsc12mzRTptBM58-aaG8A",
    },
    {
      name: "Friend of Mine",
      singer: "The Notorious B.I.G",
      cover:
        "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
      musicSrc:
        "https://siasky.net/AAAzyYFYCXASAkQw0weSxDfibHC9WsJgKLnpPLzaHKpoLQ",
    },
    {
      name: "Unbelieveable",
      singer: "The Notorious B.I.G",
      cover:
        "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
      musicSrc:
        "https://siasky.net/AAAmSAhxv6PIDchEKIRQI_mEo28flGtHChDqlcdpmhD2nw",
    },
    {
      name: "Suicidal Thoughts",
      singer: "The Notorious B.I.G",
      cover:
        "https://siasky.net/OADDYlbpBCusBIF8TdxUV99r48ZM6qRy_MTwfQ1DJA85mQ",
      musicSrc:
        "https://siasky.net/AACHrHCjb4qbHAuFZ7WDU7Dz104TeJQ3vblJobQz17_v6w",
    },
  ],

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
  deleteAudioFile: action((state, payload) => {
    state.audioFileItems.splice(payload.i, 1);
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

  playSong: action((state, song: { name; singer; cover; musicSrc }) => {
    state.currentQueue.push(song);
  }),
  onPlaySong: actionOn(
    (actions, storeActions) => [actions.playSong],
    (state, target) => {
      state.currentQueue = [state.currentQueue.slice(-1).pop];
    }
  ),
  clearQueue: action((state) => {
    state.currentQueue = [];
  }),

  addAudioPlayerInstance: action((state, { audioPlayerInstance }) => {
    console.log("this is the instance");
    console.log(audioPlayerInstance);
    state.audioPlayerInstance = audioPlayerInstance;
  }),

  // Todo Thunks
  onLoginChange: thunkOn(
    (actions, storeActions) => storeActions.mySky.setUserID,
    async (actions, target) => {
      // logging in, call loadAudioFiles
      if (target.payload.userID) {
        actions.setLoading({ isLoading: true });

        
        const mySky = target.payload.mySky;
        console.log("THIS IS MYSKY OBJ");
        console.log(mySky);

        const response = await mySky.getJSON("localhost/prelude.json");
        const data = response.data
        console.log("THIS IS THE DATA COMING BACK FROM MYSKY", data);
        console.log("full obj from mysky", response)
        if (data) {
          actions.loadAudioFiles({ audioFileItems: data.audioFileItems });
        } else {
          await mySky.setJSON("localhost/prelude.json", { audioFileItems: [] });
        }
        actions.setLoading({ isLoading: false });
      }
    }
  ),

  // AudioFile Thunks
};
