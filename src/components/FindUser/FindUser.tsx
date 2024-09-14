import React from "react";
import classes from "./FindUser.module.css";
import User from "./User/User.tsx";
import MyInput from "../UI/Input/MyInput.tsx";
import MyButton from "../UI/Button/MyButton.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../redux/storeRedux.ts";
import { actions, FindUserActionsTypes } from "../../redux/findUserReducer.ts";
import { ThunkDispatch } from "redux-thunk";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FindUser: React.FC = () => {
  const isLogined = useSelector((s: AppStateType) => s.login.isLogined);
  const followingInProgress = useSelector((s: AppStateType) => s.findUser.followingInProgress);
  const term = useSelector((s: AppStateType) => s.findUser.term);
  const friend = useSelector((s: AppStateType) => s.findUser.friend);
  const dispatch: ThunkDispatch<AppStateType, void, FindUserActionsTypes> = useDispatch();
  const userData = useSelector((s: AppStateType) => s.findUser.users);
  const users = userData.map((user) => (
    <User
      logo={user.photos.small}
      id={user.id}
      key={user.id}
      name={user.name}
      followed={user.followed}
      followingInProgress={followingInProgress}
      isLogined={isLogined}
    />
  ));

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      term,
      friend,
    },
  });

  const navigate = useNavigate();

  const submit = (data) => {
    const currentPage = 1; 
    dispatch(actions.setFilter(data.term, data.friend, currentPage));
    navigate(`?term=${data.term}&friend=${data.friend}&page=${currentPage}`); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className={classes.form}>
        <MyInput
        iserror={undefined} {...register("term")}
        holder=""
        autoComplete="off"        />
        <div>
          <span>Only friends: </span>
          <input type="checkbox" {...register("friend")} />
        </div>
        <MyButton name="Search" />
      </form>

      <div className={classes.users}>{users}</div>
    </div>
  );
};

export default FindUser;