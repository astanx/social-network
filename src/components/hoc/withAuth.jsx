import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  let WithAuthComponent = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!props.isLogined) {
        navigate("/login");
      }
    }, [props.isLogined, navigate]);
    return <WrappedComponent {...props} />;
  };
  return WithAuthComponent;
};

export default withAuth;
