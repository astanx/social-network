import React, { useState, useRef } from "react";
import classes from "./CreatePost.module.css";
import MyButton from "../../../UI/Button/MyButton.tsx";
import MyInput from "../../../UI/Input/MyInput.tsx";
import { useForm } from "react-hook-form";
import { ThunkDispatch } from 'redux-thunk';
import { AppStateType } from "../../../../redux/storeRedux.ts";
import { ProfileActionsTypes } from "../../../../redux/profileReducer.ts";
import { useDispatch } from "react-redux";


const CreatePost = (props) => {
  const dispatch: ThunkDispatch<AppStateType, void, ProfileActionsTypes> = useDispatch()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const submit = (data) => {
    if (data.postText.trim() !== "") {
      dispatch(props.addPost(props.name, data.postText));
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <MyInput iserror={undefined} holder="Post" {...register("postText", { required: true })} autoComplete="off" />
      <MyButton name="Create Post" />
    </form>
  );
};

export default CreatePost;
