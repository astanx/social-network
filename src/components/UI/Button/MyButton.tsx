import React from "react";
import classes from "./MyButton.module.css";

type MyButtonProps =   {
  name: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const MyButton: React.FC<MyButtonProps> = (props) => {
  return (
    <button className={classes.MyButton} {...props}>
      {props.name}
    </button>
  );
};

export default MyButton;