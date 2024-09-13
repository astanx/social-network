import React from "react";
import classes from "./Post.module.css";
import UserMessage from "../../../UserMessage/UserMessage.tsx";
import logo from "./../../../UI/Images/logo.png";
import getTime from "../getTime.js";
import { ThunkDispatch } from "redux-thunk";
import { AppStateType } from "../../../../redux/storeRedux.ts";
import { ProfileActionsTypes } from "../../../../redux/profileReducer.ts";
import { useDispatch } from "react-redux";

const Post = (props) => {
  const dispatch: ThunkDispatch<AppStateType, void, ProfileActionsTypes> = useDispatch()

  return (
    <div className={classes.Post}>
      <UserMessage
        message={props.message}
        name={props.name}
        logo={props.logo ? props.logo : logo}
        time={getTime()}
        id={props.id} getDialog={function (id: number): void {
          throw new Error("Function not implemented.");
        } }    />
      {props.isMyUser ? <span className={classes.deletePost} onClick={() => {dispatch(props.deletePost(props.id))}}>X</span>: null } 
    </div>
  );
};

export default Post;
