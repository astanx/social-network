import React from "react";
import classes from "./FindUser.module.css";
import User from "./User/User";
import MyInput from "../UI/Input/MyInput";
import MyButton from "../UI/Button/MyButton";
import Paginator from "../UI/Paginator/Paginator";

const FindUser = (props) => {
  const totalPages = props.pagesCount;

  const users = props.users.map((user) => (
    <User
      follow={props.follow}
      unfollow={props.unfollow}
      logo={user.photos.small}
      id={user.id}
      key={user.id}
      name={user.name}
      followers={user.followers}
      followed={user.followed}
      followSuccess={props.followSuccess}
      unfollowSuccess={props.unfollowSuccess}
      followingInProgress={props.followingInProgress}
      followingProgress={props.followingProgress}
      isLogined={props.isLogined}
    />
  ));

  return (
    <div>
      <MyInput value={props.termText} onChange={props.onTermChange} />
      <MyButton
        name="Search"
        onClick={() => {
          props.setTerm();
        }}
      />
      <div className={classes.users}>{users}</div>
    </div>
  );
};

export default FindUser;
