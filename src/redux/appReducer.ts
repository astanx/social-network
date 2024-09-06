import { auth } from "./loginReducer.ts";

export type InitialStateType = typeof initialState;
let initialState = {
  isInitialized: false,
};

const appReducer = (state = initialState, action): InitialStateType => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        isInitialized: true,
      };
    default:
      return state;
  }
};

type InitializeActionType = {
  type: "INITIALIZE";
};

const initialize = (): InitializeActionType => ({ type: "INITIALIZE" });

export const inicialization = () => (dispatch: any) => {
  dispatch(auth()).then(() => dispatch(initialize()));
};

export default appReducer;
