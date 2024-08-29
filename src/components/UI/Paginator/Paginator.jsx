import React from "react";
import classes from "./Paginator.module.css";

const Paginator = (props) => {
  let currentPagination = [];
  let pages = [];
  for (let i = props.minPagination; i <= props.maxPagination; i++) {
    pages.push(i);
  }
  
  
  currentPagination = pages.slice(0, props.totalPages - 1);

  currentPagination = currentPagination.map((p) => (
    <span
      key={p}
      onClick={() => {
        props.changePage(p);
      }}
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
            props.changePagination(
              props.minPagination + 10,
              props.maxPagination + 10
            );
          }}
        >
          ...
        </span>
      ) : (
        ""
      )}
      <span
        onClick={() => {
          props.changePage(props.totalPages);
        }}
        className={props.totalPages === props.currentPage ? classes.selected : ""}
      >
        {props.totalPages}
      </span>
    </div>
  );
};

export default Paginator;
