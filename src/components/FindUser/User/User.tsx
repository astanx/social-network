import React from "react";
import MyButton from "../../UI/Button/MyButton.tsx";
import { NavLink } from "react-router-dom";
import classes from "./User.module.css";
import logo from "./../../UI/Images/logo.png";
import { useDispatch } from "react-redux";
import { FindUserActionsTypes, follow, unfollow } from "../../../redux/findUserReducer.ts";
import { ThunkDispatch } from "redux-thunk";
import { AppStateType } from "../../../redux/storeRedux.ts";

const User = (props) => {
  const dispatch: ThunkDispatch<AppStateType, void, FindUserActionsTypes> = useDispatch()
  return (
    <div className={classes.User}>
      <div className={classes.UserInfo}>
        <img src={props.logo ? props.logo : logo} className={classes.logo} />
        {props.followed && props.isLogined ? (
          <MyButton
            disabled={props.followingInProgress.some((id) => id === props.id)}
            onClick={() => dispatch(unfollow(props.id))}
            name="UnFollow"
          />
        ) : props.isLogined ? (
          <MyButton
            disabled={props.followingInProgress.some((id) => id === props.id)}
            onClick={() => dispatch(follow(props.id))}
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
