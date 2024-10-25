import React from "react";
import { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";

import * as auth from "../utils/auth";

function Signin({ handleLogin }) {
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (value === "" || value.length <= 2 || !emailRegex.test(value)) {
      return "Digite um e-mail válido";
    } else {
      return "";
    }
  };

  const validatePassword = (value) => {
    if (value === "" || value.length <= 2) {
      return "Digite uma senha válida";
    } else {
      return "";
    }
  };

  function handleUpdateEmail(evt) {
    const value = evt.target.value;
    setEmail(value);
    const error = validateEmail(value);
    setErrorMessage(error);
  }

  function handleUpdatePassword(evt) {
    const value = evt.target.value;
    setPassword(value);
    const error = validatePassword(value);
    setErrorMessagePassword(error);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      if (password && email) {
        let response = await auth.login({ email, password });
        if (response.status === 401) {
          return "Email ou senha inválidos"
        };
        const data = await response.json();
        if (data.token) {
          handleLogin();
          localStorage.setItem("Triple10", data.token);
          history.push("/main")
        }
      }
    } catch (error) {
      console.log("error login", error);
    }
  }


  return (
    <>
      <section className="signin">
        <h2 className="signin__title">Entrar</h2>
        <form className="signin__form" onSubmit={handleSubmit} noValidate>
          <div className="signin__form-display">
            <input
              type="email"
              className={
                errorMessage
                  ? "signin__email signin__input"
                  : " "
              }
              placeholder="E-mail"
              value={email}
              onChange={handleUpdateEmail}
              style={{
                width: 358,
                backgroundColor: "black",
                color:"white"
              }}
              required
            />
            {errorMessage && (
              <span className="signin__span-message">{errorMessage}</span>
            )}
          </div>

          <div className="signin__form-display">
            <input
              type="password"
              className={
                errorMessagePassword
                  ? "signin__password signin__input signin__input_error"
                  : " "
              }
              placeholder="Senha"
              value={password}
              onChange={handleUpdatePassword}
              style={{
                width: 358,
                backgroundColor: "black",
                color:"white"
              }}
              required
            />
            {errorMessagePassword && (
              <span className="signin__span-message">
                {errorMessagePassword}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="signin__button"
            onSubmit={handleSubmit}
          >
            Entrar
          </button>
          <div className="signin__link">
            <Link to="/register" style={{
              color: "white",
              textDecoration: "none"
            }}>
              Ainda não é membro? Inscreva-se aqui!
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default withRouter(Signin);
