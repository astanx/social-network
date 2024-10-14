import React, { forwardRef } from "react";
import classes from "./MyInput.module.css";

type InputProps = {
  holder: string
  iserror: string | undefined
} & React.InputHTMLAttributes<HTMLInputElement>

const MyInput = forwardRef<HTMLInputElement, InputProps>(({holder, ...props}, ref) => {

  return (
    <input
    ref={ref}
    className={`${classes.input} ${props.iserror ? classes.error : ''}`}
    {...props}
    placeholder={holder}
    />
  );
});

export default MyInput;
