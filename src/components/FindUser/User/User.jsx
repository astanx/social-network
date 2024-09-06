import React from "react";
import MyButton from "../../UI/Button/MyButton";
import { NavLink } from "react-router-dom";
import classes from "./User.module.css";
import logo from "./../../UI/Images/logo.png";

const User = (props) => {

  return (
    <div className={classes.User}>
      <div className={classes.UserInfo}>
        <img src={props.logo ? props.logo : logo} className={classes.logo} />
        {props.followed && props.isLogined ? (
          <MyButton
            disabled={props.followingInProgress.some((id) => id === props.id)}
            onClick={() => props.unfollow(props.id)}
            name="UnFollow"
          />
        ) : props.isLogined ? (
          <MyButton
            disabled={props.followingInProgress.some((id) => id === props.id)}
            onClick={() => props.follow(props.id)}
            name="Follow"
          />
        ) : null}
      </div>
      <NavLink to={`/profile/${props.id}`} className={classes.link}>
        <div className={classes.UserInfo}>
          <div>{props.name}</div>
        </div>
      </NavLink>
    </div>
  );
};

export default User;
