import React, { useState } from "react";
import classes from "./MyHeader.module.css";
import company_logo from "./../UI/Images/company_logo.png";
import { NavLink } from "react-router-dom";
import { HeaderPropsType } from "./MyHeaderContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../redux/storeRedux";
import { LoginActionsTypes, logout } from "../../redux/loginReducer.ts";
import { ThunkDispatch } from "redux-thunk";

const MyHeader: React.FC<HeaderPropsType> = () => {
  const [showModal, setShowModal] = useState(false);
  const login = useSelector((s: AppStateType) => s.login.login)
  const isLogined = useSelector((s: AppStateType) => s.login.email)
  const dispatch: ThunkDispatch<AppStateType, void, LoginActionsTypes> = useDispatch()
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className={classes.header}>
      <img src={company_logo} alt="Company Logo" />
      <div>
        {isLogined ? (
          <span className={classes.login} onClick={toggleModal}>
            {login}
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
        {showModal && isLogined ? (
          <div
            className={classes.modal}
            onClick={() => {
              dispatch(logout());
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
