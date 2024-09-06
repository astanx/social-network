import { loginAPI } from "../api/api";

export type InitialStateType = typeof initialState


let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isLogined: false,
  captcha: null as string | null,
};

const loginReducer = (state = initialState, action): InitialStateType => {
  switch (action.type) {
    case "LOGIN":

      return {
        ...state,
        ...action.data,
      };
    case "SET_CAPTCHA":
      return {
        ...state,
        captcha: action.captchaUrl,
      };
    default:
      return state;
  }
};

type SetCaptchaActionType = {
  type: "SET_CAPTCHA";
  captchaUrl: string;
};

const setCaptcha = (captchaUrl): SetCaptchaActionType => ({
  type: "SET_CAPTCHA",
  captchaUrl,
});

type authACType = {
  type: "LOGIN";
  data: {
    userId: number | null;
    email: string | null;
    login: string | null;
    isLogined: boolean;
  };
};

const authAC = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isLogined: boolean
): authACType => ({
  type: "LOGIN",
  data: { userId, email, login, isLogined },
});

export const getCaptcha = () => async (dispatch) => {
  const response = await loginAPI.getCaptcha();
  const captcha = response.data.url;
  dispatch(setCaptcha(captcha));
};

export const auth = () => (dispatch) => {
  return loginAPI.auth().then((response) => {
    if (response.data.resultCode === 0) {
      const { id, login, email } = response.data.data;
      dispatch(authAC(id, email, login, true));
    }
  });
};

export const logout = () => async (dispatch) => {
  const response = await loginAPI.logout();

  dispatch(authAC(null, null, null, false));
};

export const login = (data) => async (dispatch: any) => {
  return loginAPI.login(
    data.email,
    data.password,
    data.rememberMe,
    data.captcha
  );
};
export default loginReducer;
