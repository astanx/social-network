import React from "react";
import classes from "./MyNav.module.css";
import NavMenu from "./NavMenu/NavMenu";
import FriendsConatiner from "./Friends/FriendsConatiner";

const MyNav = (props) => {
  return (
    <div className={classes.nav}>
      <NavMenu />
      {/* <FriendsConatiner /> */}
    </div>
  );
};

export default MyNav;
