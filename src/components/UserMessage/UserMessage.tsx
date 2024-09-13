import React from "react";
import classes from "./UserMessage.module.css";
import { NavLink } from "react-router-dom";
import viewed from "./../UI/Images/viewed.png";
import sended from "./../UI/Images/sended.png";

type UserMessagePropsType = {
  logo: string;
  name: string;
  time?: string;
  deleteMessage?: (id: number) => void;
  messageId?: number | undefined;
  message?: string;
  link?: string;
  id: number;
  getDialog: (id: number) => void;
  viewed?: boolean;
}

const UserMessage: React.FC<UserMessagePropsType>= (props) => {
  const deleteMessage = props.deleteMessage || function(){}
  const messageId = props.messageId || 2
  const User = () => (
    <div className={classes.message}>
      <img src={props.logo} className={classes.logoMessage} />
      <div className={classes.user}>
        <div>
          <span>{props.name}</span>
          <span>{props.time}</span>
          {props.deleteMessage ? (
        <span className={classes.delete} onClick={() => deleteMessage(messageId)}>X</span>
      ) : null}
        </div>
        <p>{props.message}</p>
      </div>
      
    </div>
  );
  return props.link ? (
    <NavLink
      to={`/messages/${props.id}`}
      onClick={() => {
        props.getDialog(props.id);
      }}
    >
      <User />
    </NavLink>
  ) : (
    <div className={classes.messageCont}>
      <User />
      {props.messageId ? 
      <p className={classes.viewed}>
        {props.viewed ? (
          <img className={classes.viewedStatus} src={viewed} alt="viewed" />
        ) :(
          <img className={classes.viewedStatus} src={sended} alt="sended" />
        )}
      </p>: null}
    </div>
  );
};

export default UserMessage;
