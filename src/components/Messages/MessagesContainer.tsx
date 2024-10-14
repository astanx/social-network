import { connect } from "react-redux";
import Messages from "./Messages.tsx";
import {
  deleteMessage,
  getDialog,
  getMessages,
  sendMessage,
} from "../../redux/messagesReducer.ts";
import withAuth from "../hoc/withAuth.tsx";
import { compose } from "redux";
import React from "react";
import {
  MessagesListDataType,
  SendMessageDataType,
} from "../../redux/types/types.ts";

type StateProps = {
  messagesData: Array<MessagesListDataType>;
  dialogData: {
    items: Array<SendMessageDataType>;
  };
  isLogined: boolean;
  login: string;
  isFetching: boolean;
};

type DispatchProps = {
  sendMessage: (id: number, text: string) => void;
  getMessages: () => void;
  getDialog: (id: number) => void;
  deleteMessage: (id: number) => void;
};

export type MessagesPropsType = StateProps & DispatchProps;

const MessagesCont: React.FC<MessagesPropsType> = (props) => {

  return <Messages {...props} />;
};

let mapStateToProps = (state) => {
  return {
    messagesData: state.messages.MessagesData,
    dialogData: state.messages.DialogData,
    isLogined: state.login.isLogined,
    login: state.login.login,
    isFetching: state.messages.isFetching,
  };
};

const MessagesContainer = compose(
  connect(mapStateToProps, {
    sendMessage,
    getMessages,
    getDialog,
    deleteMessage,
  })
)(MessagesCont);

export default withAuth (MessagesContainer);
