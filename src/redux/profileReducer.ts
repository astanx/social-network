import { profileAPI } from "../api/api";
import { SetFetchingActionType } from "./types/types";

type UserProfile = {
  aboutMe: string;
  contacts: {
    facebook: null | string;
    website: null | string;
    vk: null | string;
    twitter: null | string;
    instagram: null | string;
    youtube: null | string;
    github: null | string;
    mainLink: null | string;
  };
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  userId: number;
  photos: {
    small: string;
    large: string;
  };
};

type NewPostType = {
  message: string;
  name: string;
  id: number;
};

export type InitialStateType = {
  PostData: Array<NewPostType>;
  userId: null | number;
  isFetching: boolean;
  userProfile: null | Array<UserProfile>;
  status: null | string;
  photo: null | string;
};

let initialState: InitialStateType = {
  PostData: [],
  userId: null,
  isFetching: false,
  userProfile: null,
  status: null,
  photo: null,
};
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_POST":
      const newPost = {
        message: action.postText,
        name: action.userName,
        id: state.PostData.length + 1,
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
type SetPhotoACType = {
  type: "SET_PHOTO";
  photo: string;
};
export const setPhotoAC = (photo: string): SetPhotoACType => ({
  type: "SET_PHOTO",
  photo,
});


export const setFetching = (isFetching: boolean): SetFetchingActionType => ({
  type: "SET_FETCHING",
  isFetching,
});
type SetUserProfileActionType = {
  type: "SET_USER_PROFILE";
  user;
};
export const setUserProfile = (user): SetUserProfileActionType => ({
  type: "SET_USER_PROFILE",
  user,
});

type AddPostActionType = {
  type: "ADD_POST";
  userName: string;
  postText: string;
};
export const addPost = (
  userName: string,
  postText: string
): AddPostActionType => ({
  type: "ADD_POST",
  userName,
  postText,
});
type DeletePostActionType = {
  type: "DELETE_POST";
  postId: number;
};
export const deletePost = (postId: number): DeletePostActionType => ({
  type: "DELETE_POST",
  postId,
});
type SetStatusActionType = {
  type: "SET_STATUS";
  status: string;
};
export const setStatus = (status: string): SetStatusActionType => ({
  type: "SET_STATUS",
  status,
});

export const changeProfile = (profile, id) => async (dispatch) => {
  const response = await profileAPI.changeProfile(profile);

  await dispatch(getProfile(id));
};
export const setPhoto = (photo) => async (dispatch) => {
  const response = await profileAPI.setPhoto(photo);
  dispatch(setPhotoAC(response.data.data.photos.small));
};
export const getProfile = (userId) => async (dispatch) => {
  dispatch(setFetching(true));
  if (userId) {
    const response = await profileAPI.getProfile(userId);

    dispatch(setFetching(false));
    dispatch(setUserProfile(response.data));

    const status = await profileAPI.getStatus(userId);

    dispatch(setStatus(status.data));
  }
};

export const updateStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status);

  dispatch(setStatus(status));
};
export default profileReducer;
