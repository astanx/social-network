import { connect } from "react-redux";
import Messages from "./Messages";
import {
  deleteMessage,
  getDialog,
  getMessages,
  sendMessage,
  
} from "../../redux/messagesReducer.ts";
import withAuth from "../hoc/withAuth";
import { compose } from "redux";

let mapStateToProps = (state) => {
  return {
    messagesData: state.messages.MessagesData,
    dialogData: state.messages.DialogData,
    messageText: state.messages.messageText,
    isLogined: state.login.isLogined,
    login: state.login.login,
    isFetching: state.messages.isFetching,
  };
};

const MessagesContainer = compose(
  connect(mapStateToProps, { sendMessage, getMessages, getDialog, deleteMessage }),
  withAuth
)(Messages);

export default MessagesContainer;
