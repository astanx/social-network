import React from "react";
import classes from "./MyProfile.module.css";
import MyUser from "./MyUser/MyUser";
import MyPosts from "./MyPosts/MyPosts";

const Profile = (props) => {

  return (
    <div className={classes.content}>
      <MyUser
        setPhoto={props.setPhoto}
        createDialog={props.createDialog}
        updateStatus={props.updateStatus}
        status={props.status}
        photo={props.photo}
        id={props.id}
        userProfile={props.userProfile}
        changeProfile={props.changeProfile}
      />
      <MyPosts
        deletePost={props.deletePost}
        id={props.id}
        logo={props.userProfile.photos.small}
        userName={props.userProfile.fullName}
        PostData={props.PostData}
        postText={props.postText}
        addPost={props.addPost}
      />
    </div>
  );
};

export default Profile;
