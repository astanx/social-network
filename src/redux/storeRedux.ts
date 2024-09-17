import { combineReducers, configureStore } from "@reduxjs/toolkit";

import profileReducer from "./profileReducer.ts";
import messagesReducer from "./messagesReducer.ts";

import findUserReducer from "./findUserReducer.ts";
import loginReducer from "./loginReducer.ts";
import appReducer from "./appReducer.ts";
import chatReducer from "./chatReducer.ts";

const RootReducer = combineReducers({profile: profileReducer,
  messages: messagesReducer,
  chat: chatReducer,
  findUser: findUserReducer,
  login: loginReducer,
  app: appReducer,})



type RootReducerType = typeof RootReducer
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends { [key: string]: infer U }
    ? U extends (...args: any[]) => infer A
        ? A
        : never
    : never;
const store = configureStore({
  reducer: RootReducer
});


export default store;
