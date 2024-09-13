import React from "react";
import Post from "./Post/Post.tsx";
import classes from "./MyPosts.module.css";
import CreatePost from "./CreatePost/CreatePost.tsx";
import { NewPostType } from "../../../redux/types/types";



type MyPostsPropsType = {
  isMyUser: boolean;
  PostData: Array<NewPostType>

  id: number | null 
  userName: string | undefined

  logo: string | null | undefined
  
  addPost: (name: string , text: string) => void
  deletePost: (id: number) => void
}


const MyPosts: React.FC<MyPostsPropsType> = (props) => {
  const Posts = props.PostData.map((post) => (
    <Post
    isMyUser={props.isMyUser}
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
      { props.isMyUser  ? <CreatePost
        name={props.userName}
        addPost={props.addPost}
      /> : null}
      {Posts}
    </div>
  );
};

export default MyPosts;
