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
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    handleCheckToken();
  }, []);

  async function handleCheckToken() {
    const isToken = localStorage.getItem("Triple10");

    if (isToken) {
      try {
        const response = await auth.checkToken(isToken);
        if (response.ok) {
          handleLogin();
          history.push("/main");
        }
      } catch (error) {
        console.log(error);
        setLoggedIn(false);
      }
    } else {
      setLoggedIn(false);
    }
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  return (
    <div className="page">
      <Header handleLogout={handleLogout} loggedIn={loggedIn} />
      <Switch>
        <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} />
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login handleLogin={handleLogin} />
        </Route>
        <Main />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
