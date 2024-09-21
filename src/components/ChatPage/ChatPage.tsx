import React, { useEffect, useMemo, useRef, useState } from "react";
import SendMessage from "../Messages/Dialog/SendMessage/SendMessage.tsx";
import UserMessage from "../UserMessage/UserMessage.tsx";
import Preloader from "../UI/Preloader/Preloader.jsx";
import withAuth from "../hoc/withAuth.tsx";
import classes from "./ChatPage.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  ChatActionsTypes,
  startListeningMessages,
  stopListeningMessages,
} from "../../redux/chatReducer.ts";
import { AppStateType } from "../../redux/storeRedux.ts";
import { ThunkDispatch } from "redux-thunk";

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
  timestamp: number;
};
type MessagesProps = {
  messagesData: ChatMessageType[];
  bottomOfChatRef: React.RefObject<HTMLDivElement>;
}

const ChatPage: React.FC = () => {
  
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const dispatch: ThunkDispatch<AppStateType, void, ChatActionsTypes> =
    useDispatch();
  const messagesData = useSelector((s: AppStateType) => s.chat.messages);
  const isFetching = useSelector((s: AppStateType) => s.chat.isFetching);
  const status = useSelector((s: AppStateType) => s.chat.status);
  const bottomOfChatRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(startListeningMessages());
    return () => {
      dispatch(stopListeningMessages());
    };
  }, [dispatch]);
  useEffect(() => {
    if (bottomOfChatRef.current && isAutoScroll) {
      bottomOfChatRef.current.scrollIntoView();
    }
  }, [messagesData]);

  const handleScroll = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const scrollTop = chatContainer.scrollTop;
      const scrollHeight = chatContainer.scrollHeight;
      const clientHeight = chatContainer.clientHeight;
      setIsAutoScroll(scrollHeight - scrollTop - clientHeight <= 500);
    }
  };

  

  return isFetching ? (
    <Preloader />
  ) : (
    <div>
      <div
        className={classes.chatContainer}
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        <Messages messagesData ={messagesData} bottomOfChatRef={bottomOfChatRef}/>
      </div>
      <SendMessage ws={true} friendId={0} login={null} status={status} />
    </div>
  );
};

const Messages: React.FC<MessagesProps> = 
  React.memo(({messagesData, bottomOfChatRef}) =>{
   const messages = messagesData.map((message, index) => (
      <React.Fragment key={`${message.userId}-${message.timestamp}-${index}`}>
        <UserMessage
          isDeletable={false}
          message={message.message}
          name={message.userName}
          logo={message.photo}
          id={message.userId}
        />
        <div ref={bottomOfChatRef}></div>
      </React.Fragment>
    ))
  return <>{messages.length > 0 ? messages : <p>No messages yet.</p>}</>
})


export default withAuth(ChatPage);
