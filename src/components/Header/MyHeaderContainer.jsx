import React from "react";
import MyHeader from "./MyHeader";
import { logout } from "../../redux/loginReducer.ts";
import { connect } from "react-redux";


const MyHeaderCont = (props) => {
  return <MyHeader {...props} />;
};

let mapStateToProps = (state) => {
  return {
    id: state.login.userId,
    login: state.login.login,
    email: state.login.email,
    isLogined: state.login.isLogined,
  };
};

const MyHeaderContainer = connect(mapStateToProps, { logout })(
  MyHeaderCont
);

export default MyHeaderContainer;
