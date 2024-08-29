import { configureStore } from "@reduxjs/toolkit";

import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import friendsReducer from "./friendsReducer";
import findUserReducer from "./findUserReducer";
import loginReducer from "./loginReducer";
import appReducer from "./appReducer";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    messages: messagesReducer,
    friends: friendsReducer,
    findUser: findUserReducer,
    login: loginReducer,
    app: appReducer,
  },
});


export default store;
