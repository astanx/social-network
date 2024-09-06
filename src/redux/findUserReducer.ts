import { userAPI } from "../api/api";
import { SetFetchingActionType } from "./types/types";


type UserType = {
  name: string;
  id: number;
  uniqueUrlName: null | string;
  photos: {
    small: null | string;
    large: null | string;
  };
  status: null | string;
  followed: boolean;
};
export type InitialStateType = {
  users: Array<UserType>,
  curentPage: number,
  pageSize: number,
  pagesCount: number,
  currentPage: number,
  minPagination: number,
  maxPagination: number,
  termText: string,
  term: null | string,
  isFetching: boolean,
  followingInProgress: Array<number>,
}
let initialState: InitialStateType = {
  users: [],
  curentPage: 1,
  pageSize: 10,
  pagesCount: 0,
  currentPage: 1,
  minPagination: 1,
  maxPagination: 10,
  termText: "",
  term: null,
  isFetching: false,
  followingInProgress: [],
};


const findUserReducer = (state = initialState, action): InitialStateType => {
  switch (action.type) {
    case "FOLLOW":
      return {
        
        ...state,
        users: state.users.map((u: any) => {
          if (u.id === action.id) {
            return { ...u, followed: true};
          }
          return u;
        }),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: state.users.map((u: any) => {
          if (u.id === action.id) {
            return { ...u, followed: false};
          }
          return u;
        }),
      };
    case "SET_USERS":

      return {
        ...state,
        users: action.users
      };
    case "SET_PAGES_COUNT":
      return {
        ...state,
        pagesCount: action.count,
      };
    case "CHANGE_PAGE":
      return {
        ...state,
        currentPage: action.page,
      };
    case "CHANGE_PAGINATION":
      return {
        ...state,
        minPagination: action.min,
        maxPagination: action.max,
      };
    case "CHANGE_TERM":
      return {
        ...state,
        termText: action.termText,
      };
    case "SET_TERM":
      return {
        ...state,
        term: state.termText,
      };
    case "SET_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "SET_FOLLOWING_STATUS":
      return {
        ...state,
        followingInProgress: state.followingInProgress.includes(action.id)
          ? state.followingInProgress.filter((id) => id !== action.id)
          : [...state.followingInProgress, action.id],
      };
    default:
      return state;
  }
};
type FollowSuccessActionType = {
  type: "FOLLOW", id : number
}
export const followSuccess = (id: number): FollowSuccessActionType => ({ type: "FOLLOW", id });
type UnfollowSuccessActionType = {
  type: "UNFOLLOW", id: number
}
export const unfollowSuccess = (id: number): UnfollowSuccessActionType => ({ type: "UNFOLLOW", id });
type SetUsersActionType ={
  type: "SET_USERS", users:Array<UserType>  
}
export const setUsers = (users): SetUsersActionType => ({ type: "SET_USERS", users });

type SetPageCountActionType = {
  type: "SET_PAGES_COUNT", count: number
}
export const setPageCount = (count: number): SetPageCountActionType => ({ type: "SET_PAGES_COUNT", count });
type ChangePageActionType = {
  type: "CHANGE_PAGE", page:number
}
export const changePage = (page: number): ChangePageActionType => ({ type: "CHANGE_PAGE", page });

type ChangePaginationActionType = {
  type: "CHANGE_PAGINATION",
  min: number,
  max: number,
}
export const changePagination = (min: number, max: number): ChangePaginationActionType => ({
  type: "CHANGE_PAGINATION",
  min,
  max,
});
type ChangeTermActionType = {
  type: "CHANGE_TERM", termText: string
}
export const changeTerm = (termText: string): ChangeTermActionType => ({ type: "CHANGE_TERM", termText });
export const setTerm = () => ({ type: "SET_TERM" });


export const setFetching = (isFetching: boolean): SetFetchingActionType => ({
  type: "SET_FETCHING",
  isFetching,
});

type FollowingProgressActionType = {
  type: "SET_FOLLOWING_STATUS",
  id: number,
}
export const followingProgress = (id: number): FollowingProgressActionType => ({
  type: "SET_FOLLOWING_STATUS",
  id,
});
export const getUsers = (pageSize: number, currentPage: number, term: string | null) => async (dispatch) => {
  dispatch(setFetching(true));
  const response = await userAPI.getUsers(pageSize, currentPage, term);

  dispatch(setFetching(false));
  dispatch(setPageCount(Math.ceil(response.data.totalCount / pageSize)));
  dispatch(setUsers(response.data.items));
};

const followUnfollowFlow = async (apiMethod, onSuccess, id, dispatch) => {
  dispatch(followingProgress(id));
  const response = await apiMethod(id);

  if (!response.data.resultCode) {
    dispatch(onSuccess(id));
  }
  dispatch(followingProgress(id));
};

export const unfollow = (id) => (dispatch) => {
  followUnfollowFlow(userAPI.unfollow, unfollowSuccess, id, dispatch);
};
export const follow = (id) => (dispatch) => {
  followUnfollowFlow(userAPI.follow, followSuccess, id, dispatch);
};
export default findUserReducer;
