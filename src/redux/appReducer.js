import { auth } from "./loginReducer";

let initialState = {
  isInitialized: false,
};
const appReducer = (state = initialState, action) => {
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

const initialize = () => ({ type: "INITIALIZE" });

export const inicialization = () => (dispatch) => {
  dispatch(auth()).then(() => dispatch(initialize()));
};

export default appReducer;
