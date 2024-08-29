import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import classes from "./Login.module.css";
import MyInput from "../UI/Input/MyInput";
import MyButton from "../UI/Button/MyButton";
import { loginAPI } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "../../redux/loginReducer";

const Login = (props) => {
  const navigate = useNavigate();

  const [error, setError] = useState(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  
  useEffect(() => {
    if (props.isLogined) {
      navigate("/profile");
    }
  }, [props.isLogined, navigate]);

  const submit = (data) => {
    loginAPI.login(data.email, data.password, false).then((response) => {

      if (response.data.resultCode === 1) {
        setError("true");
      }
      if (response.data.resultCode === 0) {
        navigate('/profile')
        props.auth();
      }
    });
  };

  useEffect(() => {
    if (errors.email || errors.password) {
      setError("true");
    } 
  }, [errors]);
  return (
    <div className={classes.content}>
      <h3>Login</h3>
      <form className={classes.form} onSubmit={handleSubmit(submit)}>
        <MyInput
          type="email"
          holder="Email"
          {...register("email", { required: true })}
          iserror={error}
        />
        <MyInput
          type="password"
          holder="Password"
          {...register("password", { required: true })}
          iserror={error}
        />

        <MyButton name="Submit" />
      </form>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    isLogined: state.login.isLogined,
  };
};

export default connect(mapStateToProps, {auth})(Login);
