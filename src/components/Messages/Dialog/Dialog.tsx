import React, { useEffect, useRef } from "react";
import classes from "./Dialog.module.css";
import UserMessage from "../../UserMessage/UserMessage.tsx";
import SendMessage from "./SendMessage/SendMessage.tsx";
import "moment/locale/ru";
import { useParams } from "react-router-dom";
import logo from "././../../UI/Images/logo.png";
import { DialogData, SendMessageDataType } from "../../../redux/types/types.ts";
import { deleteMessage } from "../../../redux/messagesReducer.ts";

type DialogPropsType = {
  login: string | null;
  DialogData: {
    items: Array<SendMessageDataType>;
  } | DialogData;
}

const Dialog: React.FC<DialogPropsType> = (props) => {
  const moment = require('moment-timezone')
  const { userId } = useParams();
  const bottomOfDialogRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (bottomOfDialogRef.current) {
      bottomOfDialogRef.current.scrollIntoView();
    }
  }, [props.DialogData]);

  const Dialog =
    props.DialogData &&
    props.DialogData.items &&
    props.DialogData.items.length > 0
      ? props.DialogData?.items.map((dialog) => (
          <><UserMessage
          isDeletable={true}
          viewed={dialog.viewed}
          message={dialog.body}
          name={dialog.senderName}
          logo={logo}
          messageId={dialog.id}
          id={dialog.senderId}
          key={dialog.id}
          deleteMessage={deleteMessage}
          time={moment.utc(dialog.addedAt).tz('Europe/Moscow').format('YYYY-MM-DD HH:mm')}
         />
          <div ref={bottomOfDialogRef}></div>
         </>
        ))
      : null;

  return userId ? (
    <div>
      <div className={classes.message} style={{overflowY: 'auto', height:'80vh'}}>{Dialog}</div>  
      <SendMessage
        friendId={Number(userId)}
        login={props.login} ws={undefined}      />
    </div>
  ) : null;
};

export default Dialog;
