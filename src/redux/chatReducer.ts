import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./storeRedux.ts";
import { ChatMessageType } from "../components/ChatPage/ChatPage.tsx";
import { chatAPI } from "../api/chatPageApi.ts";
import { Dispatch } from "redux";
import { SetFetchingActionType } from "./types/types.ts";

const initialState = {
  messages: [] as Array<ChatMessageType>,
  isFetching: false,
  status: "pending" as StatusType,
};

export type InitialStateType = typeof initialState;

type SetMessagesAction = {
  type: "SET_MESSAGES";
  messages: Array<ChatMessageType>;
};
type StatusType = "pending" | "open";

type StatusActionType = {
  type: "SET_WS_STATUS";
  status: StatusType;
};
export type ChatActionsTypes = InferActionsTypes<typeof actions>;
export type ThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  ChatActionsTypes
>;

const chatReducer = (
  state: InitialStateType = initialState,
  action: ChatActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_MESSAGES": {

      return {
        ...state,
        messages: [...state.messages, ...action.messages],
      };
    }
    case "SET_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "SET_WS_STATUS":
      return {
        ...state,
        status: action.status,
      };
    default:
      return state;
  }
};

export const actions = {
  setMessages: (messages: Array<ChatMessageType>): SetMessagesAction => ({
    type: "SET_MESSAGES",
    messages,
  }),
  setFetching: (isFetching: boolean): SetFetchingActionType => ({
    type: "SET_FETCHING",
    isFetching,
  }),
  setStatus: (status: StatusType): StatusActionType => ({
    type: "SET_WS_STATUS",
    status,
  }),
};

let _messageHandler: ((messages: Array<ChatMessageType>) => void) | null = null;
let isSubscribed = false
const messagesHandlerCreator = (dispatch: Dispatch) => {
  if (_messageHandler === null) {
    _messageHandler = (messages: Array<ChatMessageType>) => {
      dispatch(actions.setMessages(messages));
    };
  }
  return _messageHandler;
};
export const sendMessageChat =
  (message: string): ThunkType =>
  async (dispatch) => {
    chatAPI.sendMessage(message);
  };
export const startListeningMessages = (): ThunkType => async (dispatch) => {
  if (!isSubscribed){
  dispatch(actions.setStatus("pending"));
  chatAPI.connect();
  dispatch(actions.setStatus("open"));

  chatAPI.subscribe(messagesHandlerCreator(dispatch));
  isSubscribed = true
  }
  
};
export const stopListeningMessages = (): ThunkType => async (dispatch) => {
  if (isSubscribed){
  chatAPI.unsubscribe(messagesHandlerCreator(dispatch));
  isSubscribed = false
  }
};

export default chatReducer;
