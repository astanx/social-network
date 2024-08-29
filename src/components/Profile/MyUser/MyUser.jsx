import React, { useState } from "react";
import MyInput from "../../UI/Input/MyInput";
import logo from "./../../UI/Images/logo.png";
import classes from "./MyUser.module.css";
import AddImage from "./AddImage";
import MyButton from "../../UI/Button/MyButton";
import { NavLink, useParams } from "react-router-dom";

const MyUser = (props) => {
  const { userId } = useParams();
  const [status, changeStatus] = useState(props.status ? props.status : "");
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className={classes.Info}>
      <img
        src={
          props.userProfile.photos.small ? props.userProfile.photos.small : logo
        }
        className={classes.logo}
      />
      <AddImage />
      {!props.id ? <NavLink to={`/messages/${userId}`}> <MyButton name="start dialog" onClick={() => {props.createDialog(userId)}} /> </NavLink>  : null}
      <div className={classes.Description}>
        <div>
          <span>Name: </span>
          <span>{props.userProfile.fullName}</span>
        </div>
        <div>
          <span>Age: </span>
          <span>20</span>
        </div>
        {props.userProfile.aboutMe ? (
          <div>
            <span>About: </span>
            <span>{props.userProfile.aboutMe}</span>
          </div>
        ) : (
          ""
        )}
        <div>
          <span>Job: </span>
          <span>{props.userProfile.lookingForAJob ? "looking" : "have"}</span>
        </div>
        {props.userProfile.lookingForAJobDescription ? (
          <div>
            <span>Job Description: </span>
            <span>{props.userProfile.lookingForAJobDescription}</span>
          </div>
        ) : (
          ""
        )}
        <div>
          {(isEditing || !props.status) && props.id ? (
            <MyInput
              value={status}
              onChange={(e) => changeStatus(e.target.value)}
              holder="Status"
              onBlur={() => {
                setIsEditing(false);
                changeStatus(status);
                props.updateStatus(status);
              }}
            />
          ) : (
            <span
              onDoubleClick={() => {
                setIsEditing(true);
              }}
            >
              {status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyUser;
