import React from "react";
import classes from "./MyProfile.module.css";
import MyUser from "./MyUser/MyUser.tsx";
import MyPosts from "./MyPosts/MyPosts.tsx";
import { ProfilePropsType } from "../../redux/types/types";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/storeRedux.ts";
import {
  actions,
  setPhoto,
  updateStatus,
  changeProfile,
  
} from "../../redux/profileReducer.ts";
import {
  createDialog
} from "../../redux/messagesReducer.ts";

const Profile: React.FC<ProfilePropsType> = (props) => {
  const addPost = actions.addPost
  const deletePost = actions.deletePost
  const status = useSelector((s: AppStateType) => s.profile.status)
  const postData = useSelector((s: AppStateType) => s.profile.PostData)
  const photo = useSelector((s: AppStateType) => s.profile.photo)
  
  return (
    <div className={classes.content}>
      <MyUser
        isMyUser={props.isMyUser}
        setPhoto={setPhoto}
        createDialog={createDialog}
        updateStatus={updateStatus}
        status={status}
        photo={photo}
        id={props.userId}
        userProfile={props.userProfile}
        changeProfile={changeProfile}
      />
      <MyPosts
      isMyUser={props.isMyUser}
        deletePost={deletePost}
        id={props.userId}
        logo={props.userProfile?.photos?.small}
        userName={props.userProfile?.fullName}
        PostData={postData}
        addPost={addPost}
      />
    </div>
  );
};

export default Profile;
