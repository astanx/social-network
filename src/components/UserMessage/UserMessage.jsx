import React from "react";
import classes from "./UserMessage.module.css";
import { NavLink } from "react-router-dom";
import viewed from "./../UI/Images/viewed.png";
import sended from "./../UI/Images/sended.png";

const UserMessage = (props) => {
  const User = () => (
    <div className={classes.message}>
      <img src={props.logo} className={classes.logoMessage} />
      <div className={classes.user}>
        <div>
          <span>{props.name}</span>
          <span>{props.time}</span>
          {props.deleteMessage ? (
        <span className={classes.delete} onClick={() => props.deleteMessage(props.messageId)}>X</span>
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
