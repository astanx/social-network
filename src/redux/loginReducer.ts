import { loginAPI, ResultCode } from "../api/api.ts";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./storeRedux.ts";

export type InitialStateType = typeof initialState;

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isLogined: false,
  captcha: null as string | null,
};

const loginReducer = (
  state = initialState,
  action: LoginActionsTypes
): InitialStateType => {
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

export type LoginActionsTypes = InferActionsTypes<typeof actions>;
export type ThunkType<ReturnType = void> = ThunkAction<
ReturnType,
AppStateType,
unknown,
LoginActionsTypes
>;
export const actions = {
  setCaptcha: (captchaUrl) =>
    ({
      type: "SET_CAPTCHA",
      captchaUrl,
    } as const),

  authAC: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isLogined: boolean
  ) =>
    ({
      type: "LOGIN",
      data: { userId, email, login, isLogined },
    } as const),
};
export const getCaptcha =
  ():ThunkType =>
  async (dispatch) => {
    const response = await loginAPI.getCaptcha();
    const captcha = response.data.url;
    dispatch(actions.setCaptcha(captcha));
  };

export const auth =
  (): ThunkType =>
  (dispatch) => {
    return loginAPI.auth().then((response) => {
      if (response.data.resultCode === ResultCode.Success) {
        const { id, login, email } = response.data.data;
        dispatch(actions.authAC(id, email, login, true));
      }
    });
  };

export const logout =
  (): ThunkType =>
  async (dispatch) => {
    const response = await loginAPI.logout();

    dispatch(actions.authAC(null, null, null, false));
  };

export const login =
  (data: {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string | null;
  }): ThunkType =>
  (dispatch) => {
    return loginAPI.login(
      data.email,
      data.password,
      data.rememberMe,
      data.captcha
    );
  };
export default loginReducer;
