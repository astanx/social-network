import React, { forwardRef } from "react";
import classes from "./MyInput.module.css";

const MyInput = forwardRef(({...props}, ref) => {

  return (
    <input
    ref={ref}
      className={`${classes.input} ${props.iserror ? classes.error : ''}`}
      {...props}
    placeholder={props.holder}
    />
  );
});

export default MyInput;
