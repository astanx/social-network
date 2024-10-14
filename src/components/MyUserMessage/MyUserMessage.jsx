import React from "react";
import classes from "./MyUserMessage.module.css";
import { NavLink } from "react-router-dom";

const UserMessage = (props) => {
  return (
    <div className={classes.message}>
       <div className={classes.messageContent}>
        <div className={classes.textMessage}>{props.message}</div>
        <div className={classes.time}>{props.time}</div>
      </div>
    </div>
  );
};

export default UserMessage;
