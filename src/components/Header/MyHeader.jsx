import React, { useState } from "react";
import classes from "./MyHeader.module.css";
import company_logo from "./../UI/Images/company_logo.png";
import { NavLink } from "react-router-dom";

const MyHeader = (props) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className={classes.header}>
      <img src={company_logo} alt="Company Logo" />
      <div>
        {props.isLogined ? (
          <span className={classes.login} onClick={toggleModal}>
            {props.login}
          </span>
        ) : (
          <NavLink
            to={"/login"}
            className={classes.login}
            onClick={toggleModal}
          >
            Login
          </NavLink>
        )}
        {showModal && props.isLogined ? (
          <div
            className={classes.modal}
            onClick={() => {
              props.logout();
              toggleModal()
            }}
          >
            Log out
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyHeader;
