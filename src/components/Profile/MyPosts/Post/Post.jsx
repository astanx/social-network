import React from "react";
import classes from "./Post.module.css";
import UserMessage from "../../../UserMessage/UserMessage";
import logo from "./../../../UI/Images/logo.png";
import getTime from "../getTime";

const Post = (props) => {

  return (
    <div className={classes.Post}>
      <UserMessage
        message={props.message}
        name={props.name}
        logo={props.logo ? props.logo : logo}
        time={getTime()}
        id={props.id}
      />
      {props.userId ? <span className={classes.deletePost} onClick={() => {props.deletePost(props.id)}}>X</span>: null } 
    </div>
  );
};

export default Post;
