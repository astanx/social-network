import React, { useState } from "react";
import classes from "./SendMessage.module.css";
import MyInput from "../../../UI/Input/MyInput.tsx";
import MyButton from "../../../UI/Button/MyButton.tsx";
import { useForm } from "react-hook-form";
import { MessagesActionsTypes, sendMessage } from "../../../../redux/messagesReducer.ts";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppStateType } from "../../../../redux/storeRedux.ts";

type FormValuesType = {
  messageText: string
}

type SendMessagePropsType = {
  friendId: number
  login: string | null
}

const SendMessage: React.FC<SendMessagePropsType> = (props) => {
  const dispatch: ThunkDispatch<AppStateType, void, MessagesActionsTypes> = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesType>({});

  const submit = (data) => {
    if (data.messageText.trim() !== "") {
      dispatch(sendMessage(props.friendId, data.messageText));      
      reset()
    }
  };
  return (
    <form onSubmit={handleSubmit(submit)} className={classes.SendMessage}>
      <MyInput
        iserror={undefined} holder="Message"
        {...register('messageText', { required: true })}
        autoComplete="off"      />
      <MyButton
        name="Send"
      />
    </form>
  );
};

export default SendMessage;
