import React from "react";
import { NavLink } from "react-router-dom";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch } from "react-redux";
import { FindUserActionsTypes, follow, unfollow } from "../../../redux/findUserReducer.ts";
import { ThunkDispatch } from "redux-thunk";
import { AppStateType } from "../../../redux/storeRedux.ts";
import logo from "./../../UI/Images/logo.png";

const User = (props) => {
  const dispatch: ThunkDispatch<AppStateType, void, FindUserActionsTypes> = useDispatch();

  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={props.logo ? props.logo : logo}
          alt={props.name}
          sx={{ width: 56, height: 56, marginRight: 2 }}
        />
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          {props.name}
        </Typography>
        {props.followed && props.isLogined ? (
          <Button
            variant='contained'
            disabled={props.followingInProgress.some((id) => id === props.id)}
            onClick={() => dispatch(unfollow(props.id))}
          >
            Unfollow
          </Button>
        ) : props.isLogined ? (
          <Button
            variant='contained'
            disabled={props.followingInProgress.some((id) => id === props.id)}
            onClick={() => dispatch(follow(props.id))}
          >
            Follow
          </Button>
        ) : null}
      </CardContent>
      <NavLink to={`/profile/${props.id}`} style={{ textDecoration: 'none' }}>
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            View Profile
          </Typography>
        </CardContent>
      </NavLink>
    </Card>
  );
};

export default User;