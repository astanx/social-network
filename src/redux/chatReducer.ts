import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./storeRedux.ts";
import { ChatMessageType } from "../components/ChatPage/ChatPage.tsx";
import { chatAPI } from "../api/chatPageApi.ts";
import { Dispatch } from "redux";
import { SetFetchingActionType } from "./types/types.ts";

const initialState = {
  messages: [] as Array<ChatMessageType>,
  isFetching: false,
};

export type InitialStateType = typeof initialState;

type SetMessagesAction = {
  type: "SET_MESSAGES";
  messages: Array<ChatMessageType>;
};

type SendMessageAction = {
  type: "SEND_MESSAGE";
  message: ChatMessageType;
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
    case "SET_MESSAGES":
      // Создаем новый массив, который будет включать только уникальные сообщения
      const newMessages = action.messages.filter(newMessage => 
        !state.messages.some(existingMessage =>
          existingMessage.message === newMessage.message &&
          existingMessage.userId === newMessage.userId &&
          existingMessage.timestamp === newMessage.timestamp
        )
      );

      return {
        ...state,
        messages: [...state.messages, ...newMessages],
      };
    case "SET_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
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
};

let _messageHandler: ((messages: Array<ChatMessageType>) => void) | null = null;
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
  chatAPI.connect();
  chatAPI.subscribe(messagesHandlerCreator(dispatch));
};
export const stopListeningMessages = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe(messagesHandlerCreator(dispatch));
};

export default chatReducer;
