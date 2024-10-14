import React from "react";
import MyHeader from "./MyHeader.tsx";
import { logout } from "../../redux/loginReducer.ts";
import { connect } from "react-redux";

type StateProps = {

  login: string;
  email: string;
  isLogined: boolean;
};

type DispatchProps = {
  logout: () => void;
};

export type HeaderPropsType = StateProps & DispatchProps;

const MyHeaderCont: React.FC<HeaderPropsType> = (props) => {
  return <MyHeader {...props} />;
};

let mapStateToProps = (state): StateProps => {
  return {

    login: state.login.login,
    email: state.login.email,
    isLogined: state.login.isLogined,
  };
};

const MyHeaderContainer = connect(mapStateToProps, { logout })(MyHeaderCont);

export default MyHeaderContainer;
