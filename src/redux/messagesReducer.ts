import { dialogAPI } from "../api/api";
import { SetFetchingActionType } from "./types/types";

export type InitialStateType = typeof initialState;

let initialState = {
  MessagesData: [],
  DialogData: {
    items: [] as Array<SendMessageData>,
  },
  isFetching: false,
};
const messagesReducer = (state = initialState, action) => {
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

type SendMessageData = {
  id: string,
  body: string,
  translatedBody: null,
  addedAt: string,
  senderId: number,
  senderName: string,
  recipientId: number,
  recipientName: string,
  viewed: boolean,
  deletedBySender: boolean,
  deletedByRecipient: boolean,
  isSpam: boolean,
  distributionId: null
}

type SendMessageACType = {
  type: "SEND_MESSAGE";
  data: SendMessageData;
};

export const sendMessageAC = (data: SendMessageData): SendMessageACType => {
  return {
    type: "SEND_MESSAGE",
    data,
  };
};


export const setFetching = (isFetching: boolean): SetFetchingActionType => ({
  type: "SET_FETCHING",
  isFetching,
});

type SetMessagesListActionType = {
  type: "SET_MESSAGES_LIST";
  messages: SetMessagesListData;
};

type SetMessagesListData = {
  id: number,
  userName: string,
  hasNewMessages: boolean,
  lastDialogActivityDate: string,
  lastUserActivityDate: string,
  newMessagesCount: number,
  photos: {
      small: null | string,
      large: null | string
  }
}
export const setMessagesList = (messages: SetMessagesListData): SetMessagesListActionType => ({
  type: "SET_MESSAGES_LIST",
  messages,
});

type DeleteMessageACType = {
  type: "DELETE_MESSAGE";
  messageId: number;
};
export const deleteMessageAC = (messageId: number): DeleteMessageACType => ({
  type: "DELETE_MESSAGE",
  messageId,
});

type SetDialogActionType = {
  type: "SET_DIALOG";
  dialog: SetDialogData;
};

type SetDialogData = {
  
    items: [{
      id: number,
      body: string,
      translatedBody: null,
      addedAt: string,
      senderId: number,
      senderName: string,
      recipientId: number,
      viewed: boolean
  }],
    totalCount: number,
    error: null

}

export const setDialog = (dialog: SetDialogData): SetDialogActionType => ({
  type: "SET_DIALOG",
  dialog,
});

export const createDialog = (userId) => (dispatch) => {
  dialogAPI.createDialog(userId).then((response) => {});
};

export const sendMessage = (friendId, messageText) => async (dispatch) => {
  const response = await dialogAPI.sendMessage(friendId, messageText);

  const data = response.data.data;
  dispatch(sendMessageAC({ ...data.message }));
};

export const deleteMessage = (userId) => async (dispatch) => {
  const response = await dialogAPI.deleteMessage(userId);

  dispatch(deleteMessageAC(userId));
};

export const getDialog = (userId) => async (dispatch) => {
  dispatch(setFetching(true));
  const response = await dialogAPI.getDialog(userId);

  dispatch(setDialog(response.data));
  dispatch(setFetching(false));
};
export const getMessages = () => async (dispatch) => {
  dispatch(setFetching(true));
  const response = await dialogAPI.getMessageList();

  dispatch(setFetching(false));

  dispatch(setMessagesList(response.data));
};

export default messagesReducer;
