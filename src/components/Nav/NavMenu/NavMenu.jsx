import React from "react";
import classes from "./NavMenu.module.css";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  return (
    <nav className={classes.navMenu}>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? `${classes.item} ${classes.activeLink}` : classes.item
        }
      >
        Profile
      </NavLink>

      <NavLink
        to="/messages"
        className={({ isActive }) =>
          isActive ? `${classes.item} ${classes.activeLink}` : classes.item
        }
      >
        Messages
      </NavLink>

      {/* <NavLink
        to="/news"
        className={({ isActive }) =>
          isActive ? `${classes.item} ${classes.activeLink}` : classes.item
        }
      >
        News
      </NavLink>

      <NavLink
        to="/music"
        className={({ isActive }) =>
          isActive ? `${classes.item} ${classes.activeLink}` : classes.item
        }
      >
        Music
      </NavLink> */}

      <NavLink
        to="/findUser"
        className={({ isActive }) =>
          isActive ? `${classes.item} ${classes.activeLink}` : classes.item
        }
      >
        Find User
      </NavLink>

      {/* <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive ? `${classes.item} ${classes.activeLink}` : classes.item
        }
      >
        Settings
      </NavLink> */}
    </nav>
  );
};

export default NavMenu;
