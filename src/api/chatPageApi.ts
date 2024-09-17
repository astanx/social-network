import { ChatMessageType } from "../components/ChatPage/ChatPage.tsx";
import { actions } from "../redux/chatReducer.ts";
import { sendMessage } from "../redux/messagesReducer";

let websocket: WebSocket | null = null
let subscribers = [] as Array<SubscriberType>;

const connect = () => {
    websocket = new WebSocket(
        "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
      );
    actions.setFetching(true)
    const handleClose = (e) => {
        subscribers = []
      setTimeout(function () {
        chatAPI.connect();
      }, 1000);
    };
    const handleMessage = (e: MessageEvent) => {
      const newMessages: ChatMessageType[] = JSON.parse(e.data);
      subscribers.forEach((s) => s(newMessages));
      actions.setFetching(false)
    };
    websocket.onclose = handleClose;
    websocket.onmessage = handleMessage;

    return websocket;
  }


export const chatAPI = {
  connect,
  subscribe: (callback: SubscriberType) => {
    subscribers.push(callback);
  },
  unsubscribe: (callback: SubscriberType) => {
    subscribers = subscribers.filter(s => s !== callback);
  },
  sendMessage: (message: string) => {
    websocket?.send(message)
  }
};

type SubscriberType = (messages: Array<ChatMessageType>) => void;
