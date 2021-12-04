import { Action, Computed, Thunk, ThunkOn } from "easy-peasy";
import { FileSystemDAC } from "fs-dac-library";
import { ISong } from "kokoro";
import { MySky } from "skynet-js";
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

export interface Playlists {
  [title: string]: {
    songs: Array<ISong>;
  };
}

export type ISongModel = ISong & {
  skylink: string;
  done?: boolean;
  ext?: string;
};

export interface MusicPlayerModelType {
  loading: boolean;
  player?: any;

  recentUploads: Array<any>;
  playlists: Playlists;
  audioLibrary: {
    [title: string]: ISongModel;
  };

  setLoading: Action<MusicPlayerModelType, boolean>;
  addAudioFileInDirectory: Action<MusicPlayerModelType, ISongModel>;
  deleteAudioFile: Action<MusicPlayerModelType, { title: string }>;
  setRecentUploads: Action<MusicPlayerModelType, { files: Array<any> }>;
  playSong: Action<MusicPlayerModelType, { song: ISongModel }>;
  loadData: Action<
    MusicPlayerModelType,
    Pick<MusicPlayerModelType, "playlists" | "audioLibrary">
  >;
  prepareDetailsToAudioFile: Thunk<
    MusicPlayerModelType,
    Pick<ISongModel, "album" | "artist" | "title"> & {
      currentTitle: string;
      coverFile: File;
    },
    {},
    StoreModel
  >;

  addDetailsToAudioFile: Action<
    MusicPlayerModelType,
    Pick<ISongModel, "album" | "artist" | "cover" | "title"> & {
      currentTitle: string;
    }
  >;
  addNewPlaylist: Action<
    MusicPlayerModelType,
    { playlistTitle: string; songs?: Array<string> }
  >;
  addNewSongToPlaylist: Action<
    MusicPlayerModelType,
    { song: ISongModel; playlistTitle: string }
  >;
  onLoginChange: ThunkOn<MusicPlayerModelType, {}, StoreModel>;
  setMusicPlayer?: Action<MusicPlayerModelType, MusicPlayerModelType>;
}

// SKY MODEL

export interface MySkyModelType {
  userID?: string;
  mySky?: MySky;
  fileSystem?: FileSystemDAC;
  loggedIn?: Computed<MySkyModelType, boolean>;
  setMySky?: Action<MySkyModelType, { mySky: MySky }>;

  setFileSystem?: Action<MySkyModelType, MySkyModelType>;

  setUserID?: Thunk<
    MySkyModelType,
    { userID: string; mySky?: MySky; fileSystem?: FileSystemDAC }
  >;

  setValidUserID?: Action<MySkyModelType, { userID: string }>;

  setNullUserID?: Action<MySkyModelType>;

  fetchUserID?: Thunk<MySkyModelType, MySkyModelType & { player: any }>;
  fetchMusicDirectory?: Thunk<MySkyModelType, MySkyModelType>;

  logout?: Thunk<MySkyModelType, MySkyModelType>;
  persistPreludeState?: ThunkOn<MySkyModelType, any, StoreModel>;
}

// UI MODEL

interface uiMessageModel {
  message: string;
  negative?: boolean;
  dismissed?: boolean;
  id?: string;
}

export interface UiModelType {
  error: string | null;
  messages: Array<uiMessageModel>;
  setError: Action<UiModelType, uiMessageModel>;
  resetError: Action<UiModelType, UiModelType>;
  addMessage: Action<UiModelType, uiMessageModel>;
  dismissMessage: Action<UiModelType, uiMessageModel>;
  throwError: Thunk<UiModelType, uiMessageModel>;
}
