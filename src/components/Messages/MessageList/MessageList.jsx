import React from "react";
import classes from "./MessageList.module.css";
import UserMessage from "../../UserMessage/UserMessage";

import logo from './../../UI/Images/logo.png'

const MessageList = (props) => {
  const Messsages = props.MessagesData.map((message) => (
    <UserMessage
      getDialog={props.getDialog}
      link={"true"}
      name={message.userName}
      logo={message.photos.small ? message.photos.small : logo}
      id={message.id}
      key={message.id}
    
    />
  ));
  return <div className={classes.MessageList}>{Messsages}</div>;
};

export default MessageList;
