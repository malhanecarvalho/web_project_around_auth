import React from "react";
import { NavLink, useHistory } from "react-router-dom";

function NavBar({ handleLogout }) {
  const history = useHistory();

  function signOut(evt) {
    evt.preventDefault();
    handleLogout();
    localStorage.removeItem("Triple10");
    history.push("/login");
  }

  return (
    <nav className="menu">
      <NavLink
        exact
        className="menu__item"
        activeClassName="menu__item_active"
        to="/login"
      >
        Faça o login
      </NavLink>
      <NavLink
        exact
        className="menu__item"
        activeClassName="menu__item_active"
        to="/main"
      >
        Entrar
      </NavLink>
      <button type="submit" className="menu__item menu__button" onClick={signOut}>
        Sair
      </button>
    </nav>
  );
}

export default NavBar;
