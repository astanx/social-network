import React from "react";
import classes from "./SendMessage.module.css";

import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import {
  MessagesActionsTypes,
  sendMessage,
} from "../../../../redux/messagesReducer.ts";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppStateType } from "../../../../redux/storeRedux.ts";
import { TextField } from "@mui/material";
import { sendMessageChat } from "../../../../redux/chatReducer.ts";

type FormValuesType = {
  messageText: string;
};

type SendMessagePropsType = {
  friendId: number;
  login: string | null;
  ws: any;
  status?: string;
};

const SendMessage: React.FC<SendMessagePropsType> = (props) => {
  const dispatch: ThunkDispatch<AppStateType, void, MessagesActionsTypes> =
    useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesType>({});

  const submit = (data) => {
    if (props.ws && props.status === "open") {

      dispatch(sendMessageChat(data.messageText));
      reset();
    } else if (data.messageText.trim() !== "") {
      dispatch(sendMessage(props.friendId, data.messageText));
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={classes.SendMessage}>
      <TextField
        error={!!errors.messageText}
        id="outlined-basic"
        label="Message"
        variant="filled"
        autoComplete="off"
        {...register("messageText", { required: true })}
      />
      <Button
        variant="contained"
        type="submit"
        disabled={props.ws ? (props.status === "open" ? false : true) : false}
      >
        Send
      </Button>
    </form>
  );
};

export default SendMessage;
