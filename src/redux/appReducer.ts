import { auth } from "./loginReducer.ts";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./storeRedux.ts";

export type InitialStateType = typeof initialState;
let initialState = {
  isInitialized: false,
};

const appReducer = (
  state = initialState,
  action: AppActionsTypes
): InitialStateType => {
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



export type AppActionsTypes = InferActionsTypes<typeof actions>;
export type ThunkType<ReturnType = void> = ThunkAction<
ReturnType,
AppStateType,
unknown,
AppActionsTypes
>;

export const actions = { initialize: () => ({ type: "INITIALIZE" }),
}
export const inicialization =
  (): ThunkType =>
  async (dispatch) => {
    await dispatch(auth());
    dispatch(actions.initialize());
  };

export default appReducer;
