import { createStore,  } from "easy-peasy";
import { mySkyModel } from "./mySkyModel";
import { uiModel } from "./uiModel";
import { musicPlayerModel } from "./musicPlayerModel";
import { MusicPlayerModelType, MySkyModelType, UiModelType } from "./types";

export const MYSKY_RESOLVER_LINK =
  window.location.hostname === "localhost"
    ? "localhost"
    : process.env.MYSKY_RESOLVER_LINK;
export const SIA_PORTAL =
  window.location.hostname === "localhost" ? "https://siasky.net" : undefined;
export const SIA_DATA_DOMAIN =
  window.location.hostname === "localhost"
    ? "localhost"
    : process.env.MYSKY_RESOLVER_LINK;
export const MUSIC_FOLDER = `MUSIC_FILES`;
export const MUSIC_DATA_FOLDER = "MUSIC_DATA";

export const MUSIC_RECORD_FILENAME = `${MYSKY_RESOLVER_LINK}-prelude.json`;
export const MUSIC_DATA_FOLDER_PATH = `${MYSKY_RESOLVER_LINK}/${MUSIC_DATA_FOLDER}`;
export const MUSIC_FOLDER_PATH = `${MYSKY_RESOLVER_LINK}/${MUSIC_FOLDER}`;

export interface StoreModel {
  ui: UiModelType;
  mySky: MySkyModelType;
  music: MusicPlayerModelType;
}

export const store = createStore<StoreModel>(
  {
    mySky: mySkyModel,
    // todos: todoModel,
    // hns: hnsModel,
    ui: uiModel,
    music: musicPlayerModel,
  },
  { version: 1 }
);
