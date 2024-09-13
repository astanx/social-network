import { auth } from "./loginReducer.ts";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./storeRedux.ts";

export type InitialStateType = typeof initialState;
let initialState = {
  isInitialized: false,
};

const appReducer = (
  state = initialState,
  action: ActionsTypes
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

type ActionsTypes =  InferActionsTypes<typeof actions>



export const actions = { initialize: () => ({ type: "INITIALIZE" }),
}
export const inicialization =
  (): ThunkAction<Promise<void>, AppStateType, void, ActionsTypes> =>
  async (dispatch) => {
    await dispatch(auth());
    dispatch(actions.initialize());
  };

export default appReducer;
