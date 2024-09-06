import logo from "./../components/UI/Images/logo.png";
import getTime from "../components/UI/Profile/MyPosts/getTime";
import messagesReducer from "./messagesReducer.ts";
import profileReducer from "./profileReducer.ts";
const store = {
  _callSubscriber() {},
  _state: {
    profile: {
      PostData: [
        { message: "hello", name: "dimas", logo: logo, time: getTime(), id: 1 },
        { message: "hello", name: "dimas", logo: logo, time: getTime(), id: 2 },
        { message: "hello", name: "dimas", logo: logo, time: getTime(), id: 3 },
      ],
    },
    messages: {
      MessagesData: [
        { message: "hello", name: "dimas", logo: logo, id: 1 },
        { message: "hello", name: "sanya", logo: logo, id: 2 },
        { message: "hello", name: "danya", logo: logo, id: 3 },
      ],
      DialogData: [
        { message: "hello", name: "dimas", logo: logo, id: 1 },
        { message: "hello", name: "sanya", logo: logo, id: 2 },
        { message: "hello", name: "danya", logo: logo, id: 3 },
      ],
    },
    friends: {
      active: [
        { name: "dimas", logo: logo, id: 1 },
        { name: "sanya", logo: logo, id: 2 },
        { name: "danya", logo: logo, id: 3 },
      ],
    },
  },
  getState() {
    return this._state;
  },
  subscriber(observer) {
    this._callSubscriber = observer;
  },

  addPost(post, userName) {
    this._state.profile.PostData.push({
      message: post,
      name: userName,
      logo: logo,
      time: getTime(),
      id: this._state.profile.PostData.length + 1,
    });
    this._callSubscriber(this._state);
  },
  sendMessage(message, userName) {
    this._state.messages.DialogData.push({
      message: message,
      name: userName,
      logo: logo,
      time: getTime(),
      id: this._state.messages.DialogData.length + 1,
    });
    this._callSubscriber(this._state);
  },
  dispatch(action) {
    this._state.profile = profileReducer(this._state.profile, action)
    this._state.messages = messagesReducer(this._state.messages, action)
    
    this._callSubscriber(this._state);
  },
};

export const addpost = store.addPost
export const sendMessage = store.sendMessage
export default store;
