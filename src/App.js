import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MyHeader from "./components/Header/MyHeader.tsx";
import MyNav from "./components/Nav/MyNav";
import { connect } from "react-redux";
import { inicialization } from "./redux/appReducer.ts";
import Preloader from "./components/UI/Preloader/Preloader";
import React, { lazy, Suspense, useEffect } from "react";
const ProfilePage = lazy(() =>
  import("./components/Profile/ProfilePage.tsx")
);
const Messages = lazy(() =>
  import("./components/Messages/Messages.tsx")
);
const FindUsersPage = lazy(() =>
  import("./components/FindUser/FindUserPage.tsx")
);
const Login = lazy(() => import("./components/Login/Login.tsx"));

function App(props) {
  useEffect(() => {
  const handle = () => props.inicialization()
  handle()}, []);
  return props.isInitialized ? (
    <div className="App">
      <MyHeader />
      <MyNav />
      <Suspense fallback={<Preloader />}>
      <Routes>
          <Route path="/" element={<Navigate to ='/profile' />}/>
          <Route path="*" element={<Navigate to ='/profile' />}/>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:userId" element={<Messages />} />
          <Route path="/findUser" element={<FindUsersPage />} />
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
