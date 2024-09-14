import { ThunkAction } from "redux-thunk";
import { dialogAPI } from "../api/api.ts";
import {
  DialogData,
  MessagesListDataType,
  SendMessageDataType,
  SetFetchingActionType,
} from "./types/types";
import { AppStateType, InferActionsTypes } from "./storeRedux.ts";

export type InitialStateType = typeof initialState;

let initialState = {
  MessagesData: [] as Array<MessagesListDataType>,
  DialogData: {
    items: [] as Array<SendMessageDataType>,
  },
  isFetching: false,
};
const messagesReducer = (state = initialState, action: MessagesActionsTypes) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return {
        ...state,
        DialogData: {
          ...state.DialogData,
          items: [...state.DialogData.items, action.data],
        },
      };
    case "SET_MESSAGES_LIST":
      return {
        ...state,
        MessagesData: action.messages,
      };
    case "SET_DIALOG":
      return {
        ...state,
        DialogData: action.dialog,
      };
    case "SET_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "DELETE_MESSAGE":
      return {
        ...state,
        DialogData: {
          ...state.DialogData,
          items: [
            ...state.DialogData.items.filter(
              (d: any) => d.id !== action.messageId
            ),
          ],
        },
      };
    default:
      return state;
  }
};

export type MessagesActionsTypes = InferActionsTypes<typeof actions>;
export type ThunkType<ReturnType = void> = ThunkAction<
ReturnType,
AppStateType,
unknown,
MessagesActionsTypes
>;

export const actions = {
  sendMessageAC: (data: SendMessageDataType) => {
    return {
      type: "SEND_MESSAGE",
      data,
    } as any;
  },

  setFetching: (isFetching: boolean) =>
    ({
      type: "SET_FETCHING",
      isFetching,
    } as const),

  setMessagesList: (messages: MessagesListDataType) =>
    ({
      type: "SET_MESSAGES_LIST",
      messages,
    } as const),

  deleteMessageAC: (messageId: number) =>
    ({
      type: "DELETE_MESSAGE",
      messageId,
    } as const),

  setDialog: (dialog: DialogData) =>
    ({
      type: "SET_DIALOG",
      dialog,
    } as const),
};
export const createDialog =
  (
    userId: number
  ): ThunkType =>
  async (dispatch) => {
    await dialogAPI.createDialog(userId);
  };

export const sendMessage =
  (
    friendId: number,
    messageText: string
  ): ThunkType =>
  async (dispatch) => {
    const response = await dialogAPI.sendMessage(friendId, messageText);

    const data = response.data.data;
    dispatch(actions.sendMessageAC({ ...data.message }));
  };

export const deleteMessage =
  (
    messageId: number
  ): ThunkType =>
  async (dispatch) => {

    const response = await dialogAPI.deleteMessage(messageId);

    dispatch(actions.deleteMessageAC(messageId));
  };

export const getDialog =
  (
    userId: number
  ): ThunkType =>
  async (dispatch) => {
    dispatch(actions.setFetching(true));
    const data = await dialogAPI.getDialog(userId);

    dispatch(actions.setDialog(data));
    dispatch(actions.setFetching(false));
  };
export const getMessages =
  (): ThunkType =>
  async (dispatch) => {
    dispatch(actions.setFetching(true));
    const data = await dialogAPI.getMessageList();

    dispatch(actions.setFetching(false));

    dispatch(actions.setMessagesList(data));
  };

export default messagesReducer;
