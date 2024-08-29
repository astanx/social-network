import { dialogAPI } from "../api/api";

let initialState = {
  MessagesData: [],
  DialogData: {
    items: [],
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
            ...state.DialogData.items.filter((d) => d.id !== action.messageId),
          ],
        },
      };
    default:
      return state;
  }
};

export const sendMessageAC = (data) => {
  return {
    type: "SEND_MESSAGE",
    data,
  };
};
export const setFetching = (isFetching) => ({
  type: "SET_FETCHING",
  isFetching,
});

export const setMessagesList = (messages) => ({
  type: "SET_MESSAGES_LIST",
  messages,
});
export const deleteMessageAC = (messageId) => ({
  type: "DELETE_MESSAGE",
  messageId,
});
export const setDialog = (dialog) => ({ type: "SET_DIALOG", dialog });

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
