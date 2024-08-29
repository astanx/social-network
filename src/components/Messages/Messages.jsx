import React, { useEffect } from "react";
import classes from "./Messages.module.css";
import MessageList from "./MessageList/MessageList";
import Dialog from "./Dialog/Dialog";
import Preloader from "../UI/Preloader/Preloader";
import { useParams } from "react-router-dom";

const Messages = (props) => {
  const {userId} = useParams()
  useEffect(() => {
    props.getMessages();
    props.getDialog(userId)
  }, [userId]);

  return props.isFetching ? (
    <Preloader />
  ) : (
    <div className={classes.content}>
      <MessageList
        getDialog={props.getDialog}
        MessagesData={props.messagesData}
      />
      <Dialog
       deleteMessage={props.deleteMessage}
        login={props.login}
        DialogData={props.dialogData}
        sendMessage={props.sendMessage}
        messageText={props.messageText}
      />
    </div>
  );
};

export default Messages;
