import { loginAPI} from "../api/api";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isLogined: false,
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

const authAC = (userId, email, login, isLogined) => ({
  type: "LOGIN",
  data: { userId, email, login, isLogined: isLogined },
});

export const auth = () => (dispatch) => {
  
  return loginAPI.auth().then((response) => {
    if (response.data.resultCode === 0) {
      const { id, login, email } = response.data.data;
      dispatch(authAC(id, email, login, true));
    }
  });
};

export const Logout = () => async (dispatch) => {
  const response = await loginAPI.Logout();

  dispatch(authAC(null, null, null, false));
};
export default loginReducer;
