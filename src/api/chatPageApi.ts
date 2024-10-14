import { ChatMessageType } from "../components/ChatPage/ChatPage.tsx";
import { actions } from "../redux/chatReducer.ts";

let websocket: WebSocket | null = null;
let subscribers = [] as Array<SubscriberType>;

const connect = () => {
  websocket = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );

  actions.setFetching(true);

  websocket.onopen = () => {
    actions.setFetching(false);
  };

  const handleClose = () => {
    subscribers = [];
    setTimeout(connect, 1000);
  };

  const handleMessage = (e: MessageEvent) => {
    const newMessages: ChatMessageType[] = JSON.parse(e.data);
    subscribers.forEach((s) => s(newMessages));
  };
  websocket.onclose = handleClose;
  websocket.onmessage = handleMessage;

  return websocket;
};

export const chatAPI = {
  connect,
  subscribe: (callback: SubscriberType) => {
    subscribers.push(callback);
  },
  unsubscribe: (callback: SubscriberType) => {
    subscribers = subscribers.filter((s) => s !== callback);
  },
  sendMessage: (message: string) => {
    if (websocket) {
      websocket.send(message);
    }
  },
};

type SubscriberType = (messages: Array<ChatMessageType>) => void;
