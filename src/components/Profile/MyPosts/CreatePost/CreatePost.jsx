import React, { useState, useRef } from "react";
import classes from "./CreatePost.module.css";
import MyButton from "../../../UI/Button/MyButton";
import MyInput from "../../../UI/Input/MyInput";
import { useForm } from "react-hook-form";

const CreatePost = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const submit = (data) => {
    if (data.postText.trim() !== "") {
      props.addPost(props.name, data.postText);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <MyInput holder="Post" {...register("postText", { required: true })} autoComplete="off" />
      <MyButton name="Create Post" />
    </form>
  );
};

export default CreatePost;
