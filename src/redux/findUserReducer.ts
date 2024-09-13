import { Dispatch } from "react";
import { ResultCode, userAPI } from "../api/api.ts";
import {
  ApiResponseType,
  SetFetchingActionType,
  UserType,
} from "./types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./storeRedux.ts";

export type InitialStateType = {
  users: Array<UserType>;
  pageSize: number;
  pagesCount: number;
  currentPage: number;
  minPagination: number;
  maxPagination: number;
  termText: string;
  term: string | null;
  isFetching: boolean;
  followingInProgress: Array<number>;
  friend: boolean | null
};
let initialState: InitialStateType = {
  users: [],
  pageSize: 10,
  pagesCount: 0,
  currentPage: 1,
  minPagination: 1,
  maxPagination: 10,
  termText: "",
  term: null,
  isFetching: false,
  followingInProgress: [],
  friend: null
};

const findUserReducer = (
  state = initialState,
  action: FindUserActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: state.users.map((u: any) => {
          if (u.id === action.id) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: state.users.map((u: any) => {
          if (u.id === action.id) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.users,
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
    case "SET_FILTER":
      return {
        ...state,
        term: action.term,
        friend: action.friend,
        currentPage: action.currentPage,
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


export type FindUserActionsTypes = InferActionsTypes<typeof actions>;
export type ThunkType<ReturnType = void> = ThunkAction<
ReturnType,
AppStateType,
unknown,
FindUserActionsTypes
>;

export const actions = {
  followSuccess: (id: number) =>
    ({
      type: "FOLLOW",
      id,
    } as const),

  unfollowSuccess: (id: number) =>
    ({
      type: "UNFOLLOW",
      id,
    } as const),

  setUsers: (users: Array<UserType>) =>
    ({
      type: "SET_USERS",
      users,
    } as const),

  setPageCount: (count: number) =>
    ({
      type: "SET_PAGES_COUNT",
      count,
    } as const),

  changePage: (page: number) =>
    ({
      type: "CHANGE_PAGE",
      page,
    } as const),

  changePagination: (min: number, max: number) =>
    ({
      type: "CHANGE_PAGINATION",
      min,
      max,
    } as const),

  changeTerm: (termText: string) =>
    ({
      type: "CHANGE_TERM",
      termText,
    } as const),

  setFilter: (term, friend, currentPage) => ({ type: "SET_FILTER", term, friend, currentPage} as const),

  setFetching: (isFetching: boolean) =>
    ({
      type: "SET_FETCHING",
      isFetching,
    } as const),

  followingProgress: (id: number) =>
    ({
      type: "SET_FOLLOWING_STATUS",
      id,
    } as const),
};
export const getUsers =
  (
    pageSize: number,
    currentPage: number,
    term: string,
    friend: boolean | null
  ): ThunkType =>
  async (dispatch) => {
    if (term == 'undefined' || term == undefined){
      term = ''
    }
    dispatch(actions.setFetching(true));
    const users = await userAPI.getUsers(pageSize, currentPage, term, friend);
    dispatch(actions.setFetching(false));
    dispatch(actions.setFilter(term, friend, currentPage))
    dispatch(actions.setPageCount(Math.ceil(users.totalCount / pageSize)));
    dispatch(actions.setUsers(users.items));
  };

const followUnfollowFlow = async (
  apiMethod: (id: number) => Promise<ApiResponseType>,
  onSuccess: (id: number) => FindUserActionsTypes,
  id: number,
  dispatch: Dispatch<FindUserActionsTypes>
) => {
  dispatch(actions.followingProgress(id));
  const apiMethodData = await apiMethod(id);

  if (apiMethodData.resultCode === ResultCode.Success) {
    dispatch(onSuccess(id));
  }
  dispatch(actions.followingProgress(id));
};

export const unfollow =
  (id: number): ThunkType =>
  (dispatch) => {
    followUnfollowFlow(userAPI.unfollow, actions.unfollowSuccess, id, dispatch);
  };
export const follow =
  (id: number): ThunkType =>
  (dispatch) => {
    followUnfollowFlow(userAPI.follow, actions.followSuccess, id, dispatch);
  };
export default findUserReducer;
