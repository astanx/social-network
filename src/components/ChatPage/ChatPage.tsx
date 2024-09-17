import React, { useEffect, useState } from "react";
import SendMessage from "../Messages/Dialog/SendMessage/SendMessage.tsx";
import UserMessage from "../UserMessage/UserMessage.tsx";
import Preloader from "../UI/Preloader/Preloader.jsx";
import withAuth from "../hoc/withAuth.tsx";
import classes from './ChatPage.module.css'
import { chatAPI } from "../../api/chatPageApi.ts";
import { useDispatch, useSelector } from "react-redux";
import { actions, ChatActionsTypes, startListeningMessages, stopListeningMessages } from "../../redux/chatReducer.ts";
import { AppStateType } from "../../redux/storeRedux.ts";
import { ThunkDispatch } from "redux-thunk";

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
  timestamp: number;
};

const ChatPage = () => {
  const dispatch: ThunkDispatch<AppStateType, void, ChatActionsTypes > = useDispatch()
  const messagesData = useSelector((s: AppStateType) => s.chat.messages)
  const isFetching = useSelector((s: AppStateType) => s.chat.isFetching)
  useEffect(() => {
    dispatch(startListeningMessages())
    return () => {
      dispatch(stopListeningMessages())
    }
  }, [])
  

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
      <SendMessage ws={true} friendId={0} login={null} />
    </div>
  );
};

export default withAuth(ChatPage);
