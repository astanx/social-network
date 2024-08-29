import { userAPI } from "../api/api";

let initialState = {
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
const findUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.id) {
            return { ...u, followed: true, followers: u.followers + 1 };
          }
          return u;
        }),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.id) {
            return { ...u, followed: false, followers: u.followers - 1 };
          }
          return u;
        }),
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.users.map((u) => {
          if (!u.followers) {
            return { ...u, followers: 0 };
          }
          return u;
        }),
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

export const followSuccess = (id) => ({ type: "FOLLOW", id });
export const unfollowSuccess = (id) => ({ type: "UNFOLLOW", id });
export const setUsers = (users) => ({ type: "SET_USERS", users });
export const setPageCount = (count) => ({ type: "SET_PAGES_COUNT", count });
export const changePage = (page) => ({ type: "CHANGE_PAGE", page });
export const changePagination = (min, max) => ({
  type: "CHANGE_PAGINATION",
  min,
  max,
});
export const changeTerm = (termText) => ({ type: "CHANGE_TERM", termText });
export const setTerm = () => ({ type: "SET_TERM" });
export const setFetching = (isFetching) => ({
  type: "SET_FETCHING",
  isFetching,
});
export const followingProgress = (id) => ({
  type: "SET_FOLLOWING_STATUS",
  id,
});
export const getUsers = (pageSize, currentPage, term) => async (dispatch) => {
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
