import { useDispatch, useSelector } from "react-redux";
import {
  ProfileActionsTypes,
  getProfile,
} from "../../redux/profileReducer.ts";
import Profile from "./Profile.tsx";
import React, { useEffect } from "react";
import classes from "./MyProfile.module.css";
import { useParams } from "react-router-dom";

import Preloader from "../UI/Preloader/Preloader.jsx";
import { ProfilePropsType } from "../../redux/types/types.ts";
import { AppStateType } from "../../redux/storeRedux.ts";
import { ThunkDispatch } from "redux-thunk";
import withAuth from "../hoc/withAuth.tsx";


const ProfilePage: React.FC<ProfilePropsType> = () => {
  const { userId } = useParams<{ userId: string }>();
  const myUserId = useSelector((s: AppStateType)=> s.login.userId)
  const dispatch: ThunkDispatch<AppStateType, void, ProfileActionsTypes> = useDispatch()
  const isFetching = useSelector((s: AppStateType) => s.profile.isFetching)
  const status = useSelector((s: AppStateType) => s.profile.status)
  const userProfile = useSelector((s: AppStateType)=> s.profile.userProfile)
  const idToFetch = Number(userId ? userId : myUserId)
  useEffect(() => {
    if (idToFetch){
      dispatch(getProfile(idToFetch));
    }
    
  }, [idToFetch]);
  const isMyUser = userId ? false : true
  return (
    <div className={classes.content}>
      {isFetching ? (
        <Preloader />
      ) : userProfile ? (
        <Profile
          isMyUser = {isMyUser}
          status={status}
          userProfile={userProfile}

        />
      ) : (
        "User is not available"
      )}
    </div>
  );
};



export default withAuth (ProfilePage);


