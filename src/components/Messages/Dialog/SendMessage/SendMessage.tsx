import React, { useState } from "react";
import classes from "./SendMessage.module.css";
import MyInput from "../../../UI/Input/MyInput.tsx";
import MyButton from "../../../UI/Button/MyButton.tsx";
import { useForm } from "react-hook-form";

type FormValuesType = {
  messageText: string
}

type SendMessagePropsType = {
  sendMessage:(friendId: number, messageText: string) =>  void;
  friendId: number
  login: string
}

const SendMessage: React.FC<SendMessagePropsType> = (props) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesType>({});

  const submit = (data) => {
    if (data.messageText.trim() !== "") {
      props.sendMessage(props.friendId, data.messageText);      
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
