import { connect } from "react-redux";
import { addPost, changeProfile, getProfile, setPhoto  } from "../../redux/profileReducer.ts";
import Profile from "./Profile";
import React, { useEffect } from "react";
import preloader from "./../UI/Images/bouncing-circles.svg";
import classes from "./MyProfile.module.css";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { createDialog } from "../../redux/messagesReducer.ts";
import Preloader from "../UI/Preloader/Preloader";

const ProfileCont = (props) => {
  const { userId } = useParams();

  useEffect(() => {
    async function fetchData() {
      props.getProfile(userId);
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
    userId: state.profile.userId,
    isFetching: state.profile.isFetching,
    userProfile: state.profile.userProfile,
    status: state.profile.status,
    photo: state.profile.photo,
  };
};
const ProfileContainer = compose(
  connect(mapStateToProps, {
    addPost,
    setPhoto,
    getProfile,
    createDialog,
    changeProfile,
  })
)(ProfileCont);

export default ProfileContainer;
