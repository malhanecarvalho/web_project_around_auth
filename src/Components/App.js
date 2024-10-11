import React, {
  Switch,
  Route,
  withRouter,
  Redirect,
  useHistory,
} from "react-router-dom";

import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {
  const [loggedIn, setloggedIn] = useState(true);
  const history = useHistory();

  const [isPopupRegisterSucessOpen, setIsPopupRegisterSucessOpen] =
    useState(false);
  const [isPopupRegisterFailOpen, setIsPopupRegisterFailsOpen] =
    useState(false);

  function onRegisterSucessClick() {
    setIsPopupRegisterSucessOpen(true);
  }

  function onRegisterFailClick() {
    setIsPopupRegisterFailsOpen(true);
  }

  function handleClosePopupRegister() {
    setIsPopupRegisterSucessOpen(false);
    setIsPopupRegisterFailsOpen(false);
  }

  useEffect(() => {
    handleCheckToken();
  });

  async function handleCheckToken() {
    const isToken = localStorage.getItem("Triple10");

    if (isToken) {
      try {
        const response = await auth.checkToken(response.isToken);
        if (response.ok) {
          handleLogin();
          history.push("/main");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleLogin() {
    setloggedIn(true);
  }

  function handleLogout() {
    setloggedIn(false);
  }

  return (
    <div className="page">
      <Header />
      {loggedIn && <NavBar handleLogout={handleLogout} />}
      <Switch>
        <ProtectedRoute path="/main" loggedIn={loggedIn} component={Main} />
        <Route path="/register">
          <Register
            onRegisterSucessClick={onRegisterSucessClick}
            onRegisterFailClick={onRegisterFailClick}
            isPopupRegisterSucessOpen={isPopupRegisterSucessOpen}
            isPopupRegisterFailOpen={isPopupRegisterFailOpen}
            onClose={handleClosePopupRegister}
          />
        </Route>
        <Route path="/login">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/main" /> : <Redirect to="/login" />}
        </Route>
        <Main />
        <Footer />
      </Switch>
    </div>
  );
}

export default withRouter(App);
