import { act } from "react";
import { profileAPI } from "../api/api";

let initialState = {
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
        PostData: [...state.PostData.filter((p) => p.id !== action.postId)],
      };
    case "SET_PHOTO":
      console.log(action.photo);
      
      return {
        ...state,
        photo: action.photo,
      };
    default:
      return state;
  }
};
export const setPhotoAC = (photo) => ({
  type: "SET_PHOTO",
  photo,
});
export const setFetching = (isFetching) => ({
  type: "SET_FETCHING",
  isFetching,
});
export const setUserProfile = (user) => ({ type: "SET_USER_PROFILE", user });
export const addPost = (userName, postText) => ({
  type: "ADD_POST",
  userName,
  postText,
});
export const deletePost = (postId) => ({ type: "DELETE_POST", postId });
export const setStatus = (status) => ({ type: "SET_STATUS", status });

export const setPhoto =  (photo) => async(dispatch) => {
  const response = await profileAPI.setPhoto(photo);
  console.log(response.data.data.photos.small);
  
  dispatch(setPhotoAC(response.data.data.photos.small))
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
