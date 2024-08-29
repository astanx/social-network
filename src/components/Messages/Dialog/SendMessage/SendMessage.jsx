import React, { useState } from "react";
import classes from "./SendMessage.module.css";
import MyInput from "../../../UI/Input/MyInput";
import MyButton from "../../../UI/Button/MyButton";
import { useForm } from "react-hook-form";


const SendMessage = (props) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const submit = (data) => {
    if (data.messageText.trim() !== "") {
      props.sendMessage(props.friendId, data.messageText);      
      reset()
    }
  };
  return (
    <form onSubmit={handleSubmit(submit)} className={classes.SendMessage}>
      <MyInput
        holder="Message"
        {...register('messageText', { required: true })}
        autoComplete="off"
      />
      <MyButton
        name="Send"
      />
    </form>
  );
};

export default SendMessage;
