import React from "react";
import classes from "./Paginator.module.css";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppStateType } from "../../../redux/storeRedux";
import { actions, FindUserActionsTypes } from "../../../redux/findUserReducer.ts";

type PaginatorPropsType = {
  totalPages: number;
  pagesCount: number;
  currentPage: number;
  minPagination: number;
  maxPagination: number;
};

const Paginator: React.FC<PaginatorPropsType> = (props) => {
  const dispatch: ThunkDispatch<AppStateType, void, FindUserActionsTypes> = useDispatch()
  let pages: Array<number> = [];
  for (let i = props.minPagination; i <= props.maxPagination; i++) {
    pages.push(i);
  }

  let currentPagination: Array<JSX.Element> = pages
    .slice(0, props.totalPages - 1)
    .map((p) => (
      <span
        key={p}
        onClick={() => dispatch(actions.changePage(p))}
        className={p === props.currentPage ? classes.selected : ""}
      >
        {p}
      </span>
    ));

  return (
    <div className={classes.pagination}>
      {currentPagination}

      {props.totalPages > 10 ? (
        <span
          onClick={() => {

            dispatch(actions.changePagination(
              props.minPagination + 10,
              props.maxPagination + 10
            ));
          }}
        >
          ...
        </span>
      ) : (
        ""
      )}
      <span
        onClick={() => {
          dispatch(actions.changePage(props.totalPages));
        }}
        className={
          props.totalPages === props.currentPage ? classes.selected : ""
        }
      >
        {props.totalPages}
      </span>
    </div>
  );
};

export default Paginator;
