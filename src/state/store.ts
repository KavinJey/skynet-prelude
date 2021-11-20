import { createStore, Store } from "easy-peasy";
import { todoModel } from "./todoModel";
import { hnsModel } from "./hnsModel";
import { mySkyModel } from "./mySkyModel";
import { uiModel, uiModelType } from "./uiModel";
import { musicPlayerModel } from "./musicPlayerModel";

export interface StoreModel {
  ui: uiModelType;
  [any: string]: any;
}

export const store = createStore<StoreModel>(
  {
    mySky: mySkyModel,
    todos: todoModel,
    hns: hnsModel,
    ui: uiModel,
    music: musicPlayerModel,
  },
  { version: 1 }
);
