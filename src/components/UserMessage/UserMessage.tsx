import React from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import viewed from "./../UI/Images/viewed.png";
import sended from "./../UI/Images/sended.png";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppStateType } from "../../redux/storeRedux";
import {
  deleteMessage,
  getDialog,
  MessagesActionsTypes,
} from "../../redux/messagesReducer.ts";

type UserMessagePropsType = {
  isDeletable: boolean;
  logo: string;
  name: string;
  time?: string;
  deleteMessage?: (id: number) => void;
  messageId?: number | undefined;
  message?: string;
  link?: string;
  id: number;
  viewed?: boolean;
};

const UserMessage: React.FC<UserMessagePropsType> = (props) => {
  const messageId = props.messageId || 2;
  const dispatch: ThunkDispatch<AppStateType, void, MessagesActionsTypes> = 
    useDispatch();

  const User = () => (
    <Card variant="outlined" style={{ display: "flex", marginBottom: "10px" }}>
      <Avatar src={props.logo} sx={{ width: 70, height: 70 }} />
      <CardContent style={{ flex: "1" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography variant="subtitle1">{props.name}</Typography>
            <Typography variant="body2" color="textSecondary">{props.time}</Typography>
          </div>
          {props.isDeletable && (
            <IconButton
              size="small"
              onClick={() => dispatch(deleteMessage(messageId))}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
          <Typography variant="body1" style={{ flex: "1" }}>{props.message}</Typography>
          {props.messageId && (
            <img 
              style={{ width: "20px", marginLeft: "10px" }} 
              src={props.viewed ? viewed : sended} 
              alt={props.viewed ? "viewed" : "sended"} 
            />
          )}
        </div>
      </CardContent>
    </Card>
  );

  return props.link ? (
    <NavLink to={`/messages/${props.id}`} onClick={() => dispatch(getDialog(props.id))}>
      <User />
    </NavLink>
  ) : (
    <div>
      <User />
    </div>
  );
};

export default UserMessage;