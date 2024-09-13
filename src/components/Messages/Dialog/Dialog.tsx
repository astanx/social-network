import React from "react";
import classes from "./Dialog.module.css";
import UserMessage from "../../UserMessage/UserMessage.tsx";
import SendMessage from "./SendMessage/SendMessage.tsx";
import "moment/locale/ru";
import { useParams } from "react-router-dom";
import logo from "././../../UI/Images/logo.png";
import { SendMessageDataType } from "../../../redux/types/types.ts";

type DialogPropsType = {
  deleteMessage: (id: number) => void;
  login: string;
  sendMessage: (id: number, text: string) => void;
  DialogData: {
    items: Array<SendMessageDataType>;
  };
}

const Dialog: React.FC<DialogPropsType> = (props) => {
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
          key={dialog.id}
          time={moment.utc(dialog.addedAt).tz('Europe/Moscow').format('YYYY-MM-DD HH:mm')}
          deleteMessage={props.deleteMessage} getDialog={function (id: number): void {
            throw new Error("Function not implemented.");
          } } messageId={0}          />
        ))
      : null;

  return userId ? (
    <div>
      <div className={classes.message}>{Dialog}</div>
      <SendMessage
        friendId={Number(userId)}
        login={props.login}
  
        sendMessage={props.sendMessage}
      />
    </div>
  ) : null;
};

export default Dialog;
