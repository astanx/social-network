import React, { useState } from "react";
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

type FormValuesType = {
  messageText: string;
};

type SendMessagePropsType = {
  friendId: number;
  login: string | null;
  ws: any
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
    if (props.ws) {
      props.ws.send(data.messageText)
      reset()
    }
    else if (data.messageText.trim() !== "") {
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
      <Button variant="contained" type="submit" disabled={props.ws ? props.ws.readyState !== 1 : false}>Send</Button>
    </form>
  );
};

export default SendMessage;
