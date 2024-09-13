import React, { useEffect } from "react";
import classes from "./Messages.module.css";
import MessageList from "./MessageList/MessageList.tsx";
import Dialog from "./Dialog/Dialog.tsx";
import Preloader from "../UI/Preloader/Preloader";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../redux/storeRedux.ts";
import {
  getDialog,
  getMessages,
  MessagesActionsTypes,
} from "../../redux/messagesReducer.ts";
import { ThunkDispatch } from "redux-thunk";
import withAuth from "../hoc/withAuth.tsx";

const Messages: React.FC = () => {
  const { userId } = useParams();
  const isLogined = useSelector((s: AppStateType) => s.login.isLogined);
  const isFetching = useSelector((s: AppStateType) => s.messages.isFetching);
  const messagesData = useSelector(
    (s: AppStateType) => s.messages.MessagesData
  );
  const dialogData = useSelector((s: AppStateType) => s.messages.DialogData);
  const login = useSelector((s: AppStateType) => s.login.login);
  const dispatch: ThunkDispatch<AppStateType, void, MessagesActionsTypes> =
    useDispatch();
  useEffect(() => {
    if (isLogined) {
      dispatch(getMessages());
      if (userId) {
        dispatch(getDialog(Number(userId)));
      }
    }
  }, [userId]);

  return isFetching ? (
    <Preloader />
  ) : (
    <div className={classes.content}>
      <MessageList MessagesData={messagesData} />
      <Dialog login={login} DialogData={dialogData} />
    </div>
  );
};

export default withAuth(Messages);
