import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppStateType } from "../../redux/storeRedux";

const withAuth = (WrappedComponent) => {
  
  let WithAuthComponent = (props) => {
    const isLogined = useSelector((s: AppStateType) => s.login.isLogined)

    const navigate = useNavigate();
    useEffect(() => {
      if (!isLogined) {
        navigate("/login");
      }
    }, [isLogined, navigate]);
    return <WrappedComponent {...props} />;
  };
  return WithAuthComponent;
};

export default withAuth;
