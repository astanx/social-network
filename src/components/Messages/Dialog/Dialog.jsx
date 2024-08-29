import React from "react";
import classes from "./Dialog.module.css";
import UserMessage from "../../UserMessage/UserMessage";
import SendMessage from "./SendMessage/SendMessage";
import moment from "moment";
import "moment/locale/ru";
import { useParams } from "react-router-dom";
import logo from "././../../UI/Images/logo.png";

const Dialog = (props) => {

  const moment = require('moment-timezone')
  const { userId } = useParams();
  const Dialog =
    props.DialogData &&
    props.DialogData.items &&
    props.DialogData.items.length > 0
      ? props.DialogData?.items.map((dialog) => (
          <UserMessage
            
            viewed={dialog.viewed}
            message={dialog.body}
            name={dialog.senderName}
            logo={logo}
            id={dialog.senderId}
            messageId={dialog.id}
            key={dialog.id}
            time={moment.utc(dialog.addedAt).tz('Europe/Moscow').format('YYYY-MM-DD HH:mm')}
            deleteMessage={props.deleteMessage}
          />
        ))
      : null;

  return userId ? (
    <div>
      <div className={classes.message}>{Dialog}</div>
      <SendMessage
        friendId={userId}
        login={props.login}
        messageText={props.messageText}
        sendMessage={props.sendMessage}
      />
    </div>
  ) : null;
};

export default Dialog;
