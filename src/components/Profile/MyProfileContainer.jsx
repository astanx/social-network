import { connect } from "react-redux";
import {
  addPost,
  deletePost,
  getProfile,
  updateStatus,
} from "../../redux/profileReducer";
import Profile from "./Profile";
import React, { useEffect } from "react";

import classes from "./MyProfile.module.css";
import withAuth from "../hoc/withAuth";
import { compose } from "redux";
import Preloader from "../UI/Preloader/Preloader";

const MyProfileCont = (props) => {
  useEffect(() => {
    async function fetchData() {
      props.getProfile(props.id);
    }
    fetchData()
  }, [props.id]);

  return (
    <div className={classes.content}>
      {props.isFetching ? (
        <Preloader />
      ) : props.userProfile ? (
        <Profile
          {...props}
          updateStatus={props.updateStatus}
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
    id: state.login.userId,
    isFetching: state.profile.isFetching,
    userProfile: state.profile.userProfile,
    isLogined: state.login.isLogined,
    status: state.profile.status,
  };
};

const MyProfileContainer = compose(
  connect(mapStateToProps, {
    addPost,
    deletePost,
    getProfile,
    updateStatus,
  }),
  withAuth
)(MyProfileCont);

export default MyProfileContainer;
