import { connect } from "react-redux";
import FindUser from "./FindUser.jsx";
import React, { useEffect } from "react";
import classes from "./FindUser.module.css";
import {
  changeTerm,
  changePage,
  changePagination,
  setTerm,
  getUsers,
  unfollow,
  follow,
} from "../../redux/findUserReducer.ts";
import Preloader from "../UI/Preloader/Preloader.jsx";
import Paginator from "../UI/Paginator/Paginator.jsx";
import { AppStateType } from "../../redux/storeRedux.ts";


const FindUserCont = (props) => {
  const totalPages = props.pagesCount;

  useEffect(() => {
    props.getUsers(
      props.pageSize,
      props.currentPage,
      props.term ? props.term : ""
    );
  }, [
    props.users.length,
    props.getUsers,
    props.currentPage,
    props.term,
    props.followed,
  ]);

  const onTermChange = (event) => {
    const text = event.target.value;
    props.changeTerm(text);
  };


  return (
    <div className={classes.content}>
      {props.isFetching ? (
        <Preloader />
      ) : (
        <div>
        <FindUser
          termText={props.termText}
          setTerm={props.setTerm}
          onTermChange={onTermChange}
          users={props.users}

          followSuccess={props.followSuccess}
          unfollowSuccess={props.unfollowSuccess}

          followingInProgress={props.followingInProgress}
          followingProgress={props.followingProgress}
          unfollow={props.unfollow}
          follow={props.follow}
          isLogined={props.isLogined}
        />
        <Paginator currentPage={props.currentPage} totalPages={totalPages} changePagination={props.changePagination}  minPagination={props.minPagination}
          maxPagination={props.maxPagination}  changePage={props.changePage} pagesCount={props.pagesCount} />
        </div>
      )}
    </div>
  );
};

let mapStateToProps = (state: AppStateType) => {
  return {
    users: state.findUser.users,
    pageSize: state.findUser.pageSize,
    pagesCount: state.findUser.pagesCount,
    currentPage: state.findUser.currentPage,
    minPagination: state.findUser.minPagination,
    maxPagination: state.findUser.maxPagination,
    term: state.findUser.term,
    termText: state.findUser.termText,
    isFetching: state.findUser.isFetching,
    followingInProgress: state.findUser.followingInProgress,
    isLogined: state.login.isLogined
  };
};

const FindUsersContainer = connect(mapStateToProps, {
  changePage,
  changePagination,
  changeTerm,
  setTerm,
  getUsers,
  unfollow,
  follow,
})(FindUserCont);

export default FindUsersContainer;
