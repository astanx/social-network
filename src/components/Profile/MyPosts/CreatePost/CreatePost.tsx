import React from "react";
import classes from "./CreatePost.module.css";

import Button from "@mui/material/Button";

import { useForm } from "react-hook-form";
import { ThunkDispatch } from "redux-thunk";
import { AppStateType } from "../../../../redux/storeRedux.ts";
import { ProfileActionsTypes } from "../../../../redux/profileReducer.ts";
import { useDispatch } from "react-redux";
import { Stack, TextField } from "@mui/material";

const CreatePost = (props) => {
  const dispatch: ThunkDispatch<AppStateType, void, ProfileActionsTypes> =
    useDispatch();

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
      <Stack justifyContent="center">
        <TextField
          error={!!errors.postText}
          id="outlined-basic"
          label="Post"
          variant="filled"
          autoComplete="off"
          {...register("postText", { required: true })}
        />
      </Stack>
      <Button variant="contained" type="submit">
        Create Post
      </Button>
    </form>
  );
};

export default CreatePost;
