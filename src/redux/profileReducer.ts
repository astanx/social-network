import { ThunkAction } from "redux-thunk";
import { profileAPI } from "../api/api.ts";
import {
  NewPostType,
  UserProfileType,
} from "./types/types";
import { AppStateType, InferActionsTypes } from "./storeRedux.ts";

export type InitialStateType = {
  PostData: Array<NewPostType>;
  id: null | number;
  isFetching: boolean;
  userProfile: UserProfileType | null;
  status: null | string;
  photo: null | string;
};

let initialState: InitialStateType = {
  PostData: [],
  id: null,
  isFetching: false,
  userProfile: null,
  status: null,
  photo: null,
};
const profileReducer = (
  state = initialState,
  action: ProfileActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "ADD_POST":
      const newPost = {
        message: action.postText,
        name: action.userName,
        id: state.PostData.length + 1,
        time: null,
      };
      return {
        ...state,
        PostData: [...state.PostData, newPost],
      };

    case "SET_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "SET_USER_PROFILE":

      return {
        ...state,
        userProfile: action.user,
      };
    case "SET_STATUS":
      return {
        ...state,
        status: action.status,
      };
    case "DELETE_POST":
      return {
        ...state,
        PostData: [
          ...state.PostData.filter((p: any) => p.id !== action.postId),
        ],
      };
    case "SET_PHOTO":
      return {
        ...state,
        photo: action.photo,
      };
    default:
      return state;
  }
};

export type ThunkType<ReturnType = void> = ThunkAction<
ReturnType,
AppStateType,
unknown,
ProfileActionsTypes
>;

export type ProfileActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  setPhotoAC: (photo: string) =>
    ({
      type: "SET_PHOTO",
      photo,
    } as any),

  setFetching: (isFetching: boolean) =>
    ({
      type: "SET_FETCHING",
      isFetching,
    } as const),

  setUserProfile: (user) =>
    ({
      type: "SET_USER_PROFILE",
      user,
    } as const),

  addPost: (userName: string, postText: string) =>
    ({
      type: "ADD_POST",
      userName,
      postText,
    } as const),

  deletePost: (postId: number) =>
    ({
      type: "DELETE_POST",
      postId,
    } as const),

  setStatus: (status: string) =>
    ({
      type: "SET_STATUS",
      status,
    } as const),
};
export const changeProfile =
  (
    profile: UserProfileType,
    id: number
  ): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.changeProfile(profile);

    await dispatch(getProfile(id));
  };
export const setPhoto =

  (
    photo: string
  ): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.setPhoto(photo);
    dispatch(actions.setPhotoAC(response.data.data.photos.small));
  };
export const getProfile =
  (
    userId: number
  ): ThunkType =>
  async (dispatch) => {
    dispatch(actions.setFetching(true));
    if (userId) {
      const response = await profileAPI.getProfile(userId);

      dispatch(actions.setFetching(false));
      dispatch(actions.setUserProfile(response.data));

      const status = await profileAPI.getStatus(userId);

      dispatch(actions.setStatus(status));
    }
  };

export const updateStatus =
  (
    status: string
  ): ThunkType =>
  async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    dispatch(actions.setStatus(status));
  };
export default profileReducer;
