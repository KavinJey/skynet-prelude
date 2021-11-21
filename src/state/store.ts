import { createStore, Store } from "easy-peasy";
import { mySkyModel, MySkyModelType } from "./mySkyModel";
import { uiModel, UiModelType } from "./uiModel";
import { musicPlayerModel, MusicPlayerModelType } from "./musicPlayerModel";

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
