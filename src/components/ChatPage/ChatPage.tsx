import React, { useEffect, useState } from "react";
import SendMessage from "../Messages/Dialog/SendMessage/SendMessage.tsx";
import UserMessage from "../UserMessage/UserMessage.tsx";
import Preloader from "../UI/Preloader/Preloader.jsx";
import withAuth from "../hoc/withAuth.tsx";
import classes from './ChatPage.module.css'

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
  timestamp: number;
};

const ChatPage = () => {
  const [messagesData, setMessagesData] = useState<ChatMessageType[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  function connect() {
    const websocket = new WebSocket(
      "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
    );
    
    const handleClose = (e) => {
      setTimeout(function () {
        connect();
      }, 1000);
    };
    websocket.onclose = handleClose;
    websocket.onerror = (e) => {
      console.error("WebSocket error:", e);
   };
    return websocket;
  }
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {

      const newMessages: ChatMessageType[] = JSON.parse(e.data)
      setMessagesData((prevMessages) => [...prevMessages, ...newMessages]);
      setIsFetching(false);
    };
    ws?.addEventListener('message', handleMessage)
  }, [ws])
  useEffect(() => {
    if (!ws) {
      console.log('connected');
      
      const websocket = connect();
      setWs(websocket);
    }
  
    return () => {
      setIsFetching(true);
      ws?.close();
    };
  }, [ws]);

  const messages = messagesData.map((message, index) => (
    <UserMessage
      isDeletable={false}
      message={message.message}
      name={message.userName}
      logo={message.photo}
      id={message.userId}
      key={`${message.userId}-${message.timestamp}-${index}`}
    />
  ));

  return isFetching ? (
    <Preloader />
  ) : (
    <div>
      <div className={classes.chatContainer}>{messages.length > 0 ? messages : <p>No messages yet.</p>}</div>
      <SendMessage ws={ws} friendId={0} login={null} />
    </div>
  );
};

export default withAuth(ChatPage);
