import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import classes from "./Login.module.css";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { auth, getCaptcha, login } from "../../redux/loginReducer.ts";
import { ResultCode } from "../../api/api.ts";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";

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

const Login: React.FC<LoginPropsType> = ({ isLogined, captcha, login, getCaptcha, auth }) => {
  const navigate = useNavigate();
  const [captchaVisible, setCaptchaVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>();

  useEffect(() => {
    if (isLogined) {
      navigate("/profile");
    }
  }, [isLogined, navigate]);

  const submit = async (data: FormValuesType) => {
    setServerError(null);

    try {
      const response = await login(data);
      if (response?.data?.resultCode === ResultCode.RequiredCaptcha) {

        setCaptchaVisible(true);
        getCaptcha();
      } else if (response?.data?.resultCode === ResultCode.Success) {

        auth();
        navigate("/profile");
      } else {

        setServerError("Wrong data. Try again.");
      }
    } catch (error) {
      setServerError("An error occurred");
    }
  };

  return (
    <div className={classes.content}>
      <h3>Login</h3>
      <form className={classes.form} onSubmit={handleSubmit(submit)}>
        <TextField
          error={!!errors.email}
          label="Email"
          variant="outlined"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && <p className={classes.error}>This field is required</p>}

        <TextField
          error={!!errors.password}
          label="Password"
          variant="outlined"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <p className={classes.error}>This field is required</p>}

        <FormGroup>
          <FormControlLabel
            label="Remember me"
            control={<Checkbox {...register("rememberMe")} />}
          />
        </FormGroup>

        {captchaVisible && (
          <div className={classes.captcha}>
            <img src={captcha} alt="Captcha" />
            <TextField
              error={!!errors.captcha}
              label="Captcha"
              variant="outlined"
              {...register("captcha", { required: true })}
            />
            {errors.captcha && <p className={classes.error}>This field is required</p>}
          </div>
        )}

        {serverError && <p className={classes.error}>{serverError}</p>}

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLogined: state.login.isLogined,
  captcha: state.login.captcha,
});

export default connect(mapStateToProps, { auth, getCaptcha, login })(Login);