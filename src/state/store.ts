import { createStore, Store } from "easy-peasy";
import { mySkyModel } from "./mySkyModel";
import { uiModel, UiModelType } from "./uiModel";
import { musicPlayerModel } from "./musicPlayerModel";


export interface StoreModel {
    ui: UiModelType;
    [any: string]: any;
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
