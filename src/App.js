import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MyHeaderContainer from "./components/Header/MyHeaderContainer";
import MyNav from "./components/Nav/MyNav";
import { connect } from "react-redux";
import { inicialization } from "./redux/appReducer.ts";
import Preloader from "./components/UI/Preloader/Preloader";
import React, { lazy, Suspense, useEffect } from "react";
const ProfileContainer = lazy(() =>
  import("./components/Profile/ProfileContainer")
);
const MessagesContainer = lazy(() =>
  import("./components/Messages/MessagesContainer")
);
const FindUsersContainer = lazy(() =>
  import("./components/FindUser/FindUserContainer.tsx")
);
const MyProfileContainer = lazy(() =>
  import("./components/Profile/MyProfileContainer")
);
const Login = lazy(() => import("./components/Login/Login"));

function App(props) {
  useEffect(() => props.inicialization(), []);
  return props.isInitialized ? (
    <div className="App">
      <MyHeaderContainer />
      <MyNav />
      <Suspense fallback={<Preloader />}>
      <Routes>
          <Route path="/" element={<Navigate to ='/profile' />}/>
          <Route path="*" element={<Navigate to ='/profile' />}/>
          <Route path="/profile" element={<MyProfileContainer />} />
          <Route path="/profile/:userId" element={<ProfileContainer />} />
          <Route path="/messages" element={<MessagesContainer />} />
          <Route path="/messages/:userId" element={<MessagesContainer />} />
          <Route path="/findUser" element={<FindUsersContainer />} />
          <Route path="/login" element={<Login />} />
        
      </Routes>
      </Suspense>
    </div>
  ) : (
    <Preloader />
  );
}

let mapStateToProps = (state) => {
  return {
    isInitialized: state.app.isInitialized,
  };
};

export default connect(mapStateToProps, { inicialization })(App);
