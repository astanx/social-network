import React from "react";
import classes from "./Friend.module.css";
import { NavLink } from "react-router-dom";

const User = (props) => {
  return (
    <NavLink to={`/messages/${props.id}`} className={classes.Friend}>
      <img src={props.logo} className={classes.logo} />
      <div>{props.name}</div>
    </NavLink>
  );
};

export default User;
