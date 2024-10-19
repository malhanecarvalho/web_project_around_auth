import React from "react";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";

function NavBar({ handleLogout }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  function signOut(evt) {
    evt.preventDefault();
    handleLogout();
    localStorage.removeItem("Triple10");
    history.push("/login");
  }

  let component 
  if (url === "/login") {
    component =  <NavLink
    exact
    className="menu__item"
    activeClassName="menu__item_active"
    to="/login"
  >
    Faça o login
  </NavLink>
  }

  if (url === "/register") {
    component =   <NavLink
    exact
    className="menu__item"
    activeClassName="menu__item_active"
    to="/register"
  >
    Registrar
  </NavLink>
  }

  if (url === "/") {
    component =  <button
    type="submit"
    className="menu__item menu__button"
    onClick={signOut}
  >
    Sair
  </button>
  }

  return (
    <nav className="menu">
   { component}
    </nav>
  );
}

export default NavBar;
