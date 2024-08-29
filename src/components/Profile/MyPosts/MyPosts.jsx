import React from "react";
import Post from "./Post/Post";
import classes from "./MyPosts.module.css";
import CreatePost from "./CreatePost/CreatePost";

const MyPosts = (props) => {
  const Posts = props.PostData.map((post) => (
    <Post
      userId = {props.id}
      deletePost={props.deletePost}
      message={post.message}
      name={post.name}
      logo={props.logo}
      time={post.time}
      id={post.id}
      key={post.id}
    />
  ));
  return (
    <div className={classes.MyPosts}>
      <h4>My posts</h4>
      {!props.status && props.id ? <CreatePost
        name={props.userName}
        addPost={props.addPost}
        
        postText={props.postText}
      /> : null}
      {Posts}
    </div>
  );
};

export default MyPosts;
