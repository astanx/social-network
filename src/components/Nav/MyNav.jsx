import React from "react";
import classes from "./MyNav.module.css";
import NavMenu from "./NavMenu/NavMenu";


const MyNav = () => {
  return (
    <div className={classes.nav}>
      <NavMenu />

    </div>
  );
};

export default MyNav;
