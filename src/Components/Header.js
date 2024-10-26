import React from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import logo from '../images/logo-vector.png';
import line from '../images/linha.jpg';

function Header(loggedIn, handleLogout) {

  const history = useHistory();
  const location = useLocation();


  const isSignInPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/register";

  function signOut(evt) {
    evt.preventDefault();
    handleLogout();
    localStorage.removeItem("Triple10");
    history.push("/login");
  }

  const RenderMenuItems = () => {
    if (isSignInPage) {
      return (
        <NavLink className="menu__item" activeClassName="menu__item_active" to="/signin">
          Entrar
        </NavLink>
      );
    } else if (isSignUpPage) {
      return (
        <NavLink className="menu__item" activeClassName="menu__item_active" to="/signup">
          Faça o login
        </NavLink>
      );
    } else if (loggedIn) {
      return (
        <>
          <button onClick={signOut} className="menu__item menu__button">
            Sair
          </button>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <header className="header">
        <img src={logo} className="logo" alt="imagem Around the U.S." />
        <img src={line} className="linha" alt="imagem linha horizontal" />
        <nav className="menu">
          <RenderMenuItems />
        </nav>
      </header>
    </>
  )
}

export default Header;