import React from "react";
import classes from "./MessageList.module.css";
import UserMessage from "../../UserMessage/UserMessage.tsx";

import logo from './../../UI/Images/logo.png'
import { MessagesListDataType } from "../../../redux/types/types.ts";

type MessageListPropsType = {
  MessagesData: Array<MessagesListDataType> | MessagesListDataType
}

const MessageList: React.FC<MessageListPropsType> = (props) => {
  const messagesArray = Array.isArray(props.MessagesData) ? 
      props.MessagesData : 
      [props.MessagesData];
  const Messages = messagesArray.map((message) => (
    <UserMessage
      link={"true"}
      name={message.userName}
      logo={message.photos.small ? message.photos.small : logo}
      id={message.id}
      key={message.id} isDeletable={false} />
  ));
  return <div className={classes.MessageList}>{Messages}</div>;
};

export default MessageList;
