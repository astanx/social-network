import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import classes from "./Login.module.css";
import MyInput from "../UI/Input/MyInput.tsx";
import MyButton from "../UI/Button/MyButton.tsx";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { auth, getCaptcha, login } from "../../redux/loginReducer.ts";
import { ResultCode } from "../../api/api.ts";

type FormValuesType = {
  email: string;
  password: string;
  captcha: string;
  rememberMe: boolean;
};

type LoginPropsType = {
  isLogined: boolean;
  captcha: string | undefined;
  login: (data: {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string | null;
  }) => any;
  getCaptcha: () => void;
  auth: () => void;
};

const Login: React.FC<LoginPropsType> = (props) => {
  const navigate = useNavigate();

  const [error, setError] = useState<undefined | string>(undefined);
  const [captcha, setCaptcha] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({});

  useEffect(() => {
    if (props.isLogined) {
      navigate("/profile");
    }
  }, [props.isLogined, navigate]);

  const submit = (data) => {
    props.login(data).then((response) => {
      if (response.data.resultCode === ResultCode.RequiredCaptcha) {
        setCaptcha(true);
        props.getCaptcha();
        setError("true");
      }
      if (response.data.resultCode === ResultCode.Error) {
        setError("true");
      }
      if (response.data.resultCode === ResultCode.Success) {
        navigate("/profile");
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
        <div className={classes.rememberMe}>
          <input type="checkbox" id="rememberMe" />
          <label>Remember me</label>
        </div>
        {captcha ? (
          <div className={classes.captcha}>
            <img src={props.captcha} />
            <MyInput
              iserror={undefined}
              holder="Captcha"
              {...register("captcha", { required: true })}
            />
          </div>
        ) : null}

        <MyButton name="Submit" />
      </form>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    isLogined: state.login.isLogined,
    captcha: state.login.captcha,
  };
};

export default connect(mapStateToProps, { auth, getCaptcha, login })(Login);
