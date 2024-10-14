import { connect } from "react-redux";
import {
  actions,
  changeProfile,
  getProfile,
  setPhoto,
  updateStatus,
} from "../../redux/profileReducer.ts";
import Profile from "./Profile.tsx";
import React, { useEffect } from "react";

import classes from "./MyProfile.module.css";
import withAuth from "../hoc/withAuth.jsx";
import { compose } from "redux";
import Preloader from "../UI/Preloader/Preloader.jsx";
import {  ProfilePropsType } from "../../redux/types/types.ts";


const MyProfileCont: React.FC<ProfilePropsType> = (props) => {

  useEffect(() => {
    async function fetchData() {
      props.getProfile(Number(props.userId));
    }
    fetchData();
  }, [props.userId]);
  return (
    <div className={classes.content}>
      {props.isFetching ? (
        <Preloader />
      ) : props.userProfile ? (
        <Profile
          {...props}
          status={props.status}
          userProfile={props.userProfile}
        />
      ) : (
        "User is not available"
      )}
    </div>
  );
};
let mapStateToProps = (state) => {
  return {
    PostData: state.profile.PostData,
    postText: state.profile.postText,
    userId: state.login.userId,
    isFetching: state.profile.isFetching,
    userProfile: state.profile.userProfile,
    isLogined: state.login.isLogined,
    status: state.profile.status,
    photo: state.profile.photo,
  };
};

const MyProfileContainer = compose(
  connect(mapStateToProps, {
    addPost: actions.addPost,
    deletePost: actions.deletePost,
    getProfile,
    updateStatus,
    setPhoto,
    changeProfile,
  }),
  withAuth
)(MyProfileCont);

export default MyProfileContainer;
