import React from "react";
import classes from "./FindUser.module.css";
import User from "./User/User.tsx";

import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../redux/storeRedux.ts";
import { actions, FindUserActionsTypes } from "../../redux/findUserReducer.ts";
import { ThunkDispatch } from "redux-thunk";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";

const FindUser: React.FC = () => {
  const isLogined = useSelector((s: AppStateType) => s.login.isLogined);
  const followingInProgress = useSelector(
    (s: AppStateType) => s.findUser.followingInProgress
  );
  const term = useSelector((s: AppStateType) => s.findUser.term);
  const friend = useSelector((s: AppStateType) => s.findUser.friend);
  const dispatch: ThunkDispatch<AppStateType, void, FindUserActionsTypes> =
    useDispatch();
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
  const { register, handleSubmit } = useForm({
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setFilter(term, e.target.checked, 1));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className={classes.form}>
        <TextField
          id="outlined-basic"
          label="User Name"
          variant="outlined"
          {...register("term")}
          autoComplete="off"
        />

        <FormGroup>
          <FormControlLabel
            label="Only Followed"
            control={
              <Checkbox
                {...register("friend")}
                checked={friend || false}
                onChange={handleCheckboxChange}
              />
            }
          />
        </FormGroup>
        <Button variant="contained" type="submit">
          Search
        </Button>
      </form>

      <div className={classes.users}>{users}</div>
    </div>
  );
};

export default FindUser;