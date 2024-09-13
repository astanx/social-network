import { useDispatch, useSelector } from "react-redux";
import FindUser from "./FindUser.tsx";
import React, { useEffect } from "react";
import classes from "./FindUser.module.css";
import { getUsers, FindUserActionsTypes } from "../../redux/findUserReducer.ts";
import Preloader from "../UI/Preloader/Preloader.jsx";
import Paginator from "../UI/Paginator/Paginator.tsx";
import { AppStateType } from "../../redux/storeRedux.ts";
import { ThunkDispatch } from "redux-thunk";
import { useLocation, useNavigate } from "react-router-dom";

const FindUsersPage: React.FC = () => {
  const pagesCount = useSelector((s: AppStateType) => s.findUser.pagesCount);
  const isFetching = useSelector((s: AppStateType) => s.findUser.isFetching);
  const term = useSelector((s: AppStateType) => s.findUser.term);
  const pageSize = useSelector((s: AppStateType) => s.findUser.pageSize);
  const currentPage = useSelector((s: AppStateType) => s.findUser.currentPage);
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
  let paramsTerm
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramsObject = Object.fromEntries(params.entries());
    console.log(paramsObject.currentPage);
    
    paramsTerm = paramsObject.term ? paramsObject.term == 'undefined' ? '' : paramsObject.term : ''
    params.set("term", term || (term === null ? paramsTerm : ""));
    params.set("friend", friend ? friend.toString() : "");
    params.set("page", String(currentPage));
    navigate(`${location.pathname}?${params.toString()}`);
    dispatch(
      getUsers(
        pageSize,
        currentPage ,
        term || (term === null ? paramsObject.term : ""),
        friend
      )
    );
  }, [term, currentPage, pageSize, friend]);

  return (
    <div className={classes.content}>
      {isFetching ? (
        <Preloader />
      ) : (
        <div>
          <FindUser />
          <Paginator
            currentPage={currentPage}
            totalPages={pagesCount}
            minPagination={minPagination}
            maxPagination={maxPagination}
            pagesCount={pagesCount}
          />
        </div>
      )}
    </div>
  );
};

export default FindUsersPage;
