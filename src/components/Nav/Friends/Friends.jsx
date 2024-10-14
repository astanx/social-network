import React from "react";
import classes from "./Friends.module.css";
import Friend from "./Friend/Friend";
import { NavLink } from "react-router-dom";

const Friends = (props) => {
  const FriendsActive = props.friendsActive.map((friend) => (
    <Friend name={friend.name} logo={friend.logo} key={friend.id} id={friend.id} />
  ));
  return (
    <div>
      <div className={classes.title}>
        <NavLink to="/friends">Friends</NavLink>
      </div>
      <div className={classes.friends}>{FriendsActive}</div>
    </div>
  );
};

export default Friends;
