import React from "react";
import { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import * as auth from "../utils/auth";
import PopupRegisterSucess from "./PopupWithForm/PopupRegisterSucess";
import PopupRegisterFail from "./PopupWithForm/PopupRegisterFail";

function Signup({
  onRegisterFailClick,
  onRegisterSucessClick,
  isPopupRegisterSucessOpen,
  isPopupRegisterFailOpen,
  onClose,
}) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");

  const classPopupRegisterSucess = isPopupRegisterSucessOpen
    ? "popup-sucess-opened"
    : "";
  const classPopupRegisterFail = isPopupRegisterFailOpen
    ? "popup-fail-opened"
    : "";

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
      return "Digite uma válida";
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
      if (password !== "" && email !== "") {
        const response = await auth.register({ email, password });
        if (response.ok) {
          history.push("/login");
          onRegisterSucessClick();
          setEmail("");
          setPassword("");
        }
      }
    } catch (error) {
      console.log("error register", error);
      onRegisterFailClick();
      setEmail("");
      setPassword("");
    }
  }

  return (
    <>
      <section className="signup">
        <h2 className="signup__title">Inscrever-se</h2>
        <form className="signup__form" onSubmit={handleSubmit}>
          <div className="signup__form-display">
            <input
              style={{
                borderRightWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderBottomWidth: 2,
                borderBottomColor: "darkgray",
                backgroundColor: "black",
                color: "white",
                width: 358,
              }}
              type="email"
              className={errorMessage ? "signup__email" : " "}
              placeholder="E-mail"
              value={email}
              onChange={handleUpdateEmail}
            />
            {errorMessage && (
              <span className="signup__span-message">{errorMessage}</span>
            )}
          </div>
          <div className="signup__form-display">
            <input
              style={{
                borderRightWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderBottomWidth: 2,
                borderBottomColor: "darkgray",
                backgroundColor: "black",
                color: "white",
                width: 358,
              }}
              type="password"
              className={errorMessagePassword ? "signup__password" : " "}
              placeholder="Senha"
              value={password}
              onChange={handleUpdatePassword}
            />
            {errorMessagePassword && (
              <span className="signup__span-message">
                {errorMessagePassword}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="signup__button"
            onSubmit={handleSubmit}
          >
            Inscrever-se
          </button>
          <div className="signup__link">
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Já é um membro? Faça o login aqui!
            </Link>
          </div>
        </form>
        <PopupRegisterFail
          classPopupRegisterFail={classPopupRegisterFail}
          onClose={onClose}
        />
      </section>
      <PopupRegisterSucess
        classPopupRegisterSucess={classPopupRegisterSucess}
      />
    </>
  );
}

export default withRouter(Signup);
