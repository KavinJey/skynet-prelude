// TODO: make typesafe

import {
  action,
  thunk,
  thunkOn,
  computed,
  Action,
  Thunk,
  createTypedHooks,
} from "easy-peasy";
import _ from "underscore";

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

export const uiModel: UiModelType = {
  error: null,
  messages: [
    {
      message:
        "Welcome to Prelude Music Player! \n\n Use the upload tab to upload your music. \n My library allows you to view all your uploaded audio files and play them through the play bar.",
      negative: false,
      dismissed: false,
      id: "fake",
    },
  ],

  setError: action((state, { message }) => {
    state.error = message;
  }),

  resetError: action((state, payload) => {
    state.error = null;
  }),

  addMessage: action((state, { message, negative }) => {
    state.messages.push({
      message,
      negative,
      dismissed: false,
      id: _.uniqueId(),
    });
  }),

  dismissMessage: action((state, { id }) => {
    const notYetDismissed = _.reject(state.messages, (item) => {
      return item.dismissed;
    });
    state.messages = _.reject(notYetDismissed, (item) => {
      return item.id == id;
    });
  }),

  throwError: thunk((actions, { message }) => {
    actions.setError({ message });
    actions.addMessage({ message, negative: true });
  }),
};
