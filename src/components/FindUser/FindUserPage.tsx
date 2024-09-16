import { useDispatch, useSelector } from "react-redux";
import FindUser from "./FindUser.tsx";
import React, { useEffect } from "react";
import classes from "./FindUser.module.css";
import {
  getUsers,
  FindUserActionsTypes,
  actions,
} from "../../redux/findUserReducer.ts";
import Preloader from "../UI/Preloader/Preloader.jsx";
import Paginator from "../UI/Paginator/Paginator.tsx";
import { AppStateType } from "../../redux/storeRedux.ts";
import { ThunkDispatch } from "redux-thunk";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";

const FindUsersPage: React.FC = () => {
  const pagesCount = useSelector((s: AppStateType) => s.findUser.pagesCount);
  const isFetching = useSelector((s: AppStateType) => s.findUser.isFetching);
  const term = useSelector((s: AppStateType) => s.findUser.term);
  const pageSize = useSelector((s: AppStateType) => s.findUser.pageSize);
  let currentPage = useSelector((s: AppStateType) => s.findUser.currentPage);
  const minPagination = useSelector(
    (s: AppStateType) => s.findUser.minPagination
  );
  const friend = useSelector((s: AppStateType) => s.findUser.friend);
  const maxPagination = useSelector(
    (s: AppStateType) => s.findUser.maxPagination
  );

  const dispatch: ThunkDispatch<AppStateType, void, FindUserActionsTypes> =
    useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", String(currentPage));
    params.set("term", term || "");
    params.set("friend", friend ? "true" : "false");

    navigate(`${location.pathname}?${params.toString()}`);
  }, [currentPage, friend, term]);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramsObject = Object.fromEntries(params.entries());

    const newTerm = paramsObject.term ?? "";
    let newPage = currentPage;
    const newFriend = paramsObject.friend === "true";

    if (!!paramsObject.page) newPage = Number(paramsObject.page);

    navigate(`${location.pathname}?${params.toString()}`);

    dispatch(getUsers(pageSize, newPage, newTerm, newFriend));
  }, [location.search]);

  return (
    <div className={classes.content}>
      {isFetching ? (
        <Preloader />
      ) : (
        <div>
          <FindUser />

          <Stack alignItems="center">
            <Pagination
              count={pagesCount}
              defaultPage={currentPage}
              color="primary"
              onChange={(e, value) => dispatch(actions.changePage(value))}
            />
          </Stack>
        </div>
      )}
    </div>
  );
};

export default FindUsersPage;
