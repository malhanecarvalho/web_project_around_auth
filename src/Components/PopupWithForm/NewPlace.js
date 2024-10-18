import iconClose from "../../images/icone_fechar.svg";
import React from "react";
import { useState } from "react";
import { CurrentCardContext } from "../../contexts/CurrentCardContext";

function NewPlace({
  onClose,
  classPopupAddPlace,
  disabledButtonSubmit,
  onDisableButtonSubmit,
  onHabilityButtonSubmit,
  classButtonAddSubmit
}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageURL, setErrorMessageURL] = useState("");
  const { handleSubmit } = React.useContext(CurrentCardContext);

  const validateInput = (value) => {  
    if (value === "" || value.length <= 2 ) {
      onDisableButtonSubmit();
      return "Campo obrigatório";
    } else {
      onHabilityButtonSubmit();
      return "";
    }
  };

  const validateInputUrl = (value) => {
    const regexUrl = /^(?:https?:\/\/)?(w{3}\.)?[\w_-]+((\.\w{2,}){1,2})(\/([\w\._-]+\/?)*(\?[\w_-]+=[^\?\/&]*(\&[\w_-]+=[^\?\/&]*)*)?)?$/;
    if (value === "" || value.length <= 2 || !regexUrl.test(value)) {
      onDisableButtonSubmit();
      return "Digite uma URL válida";
    } else {
      onHabilityButtonSubmit();
      return "";
    }
  };

  function handleUpdateTitle(evt) {
    const value = evt.target.value;
    setTitle(value);
    const error = validateInput(value);
    setErrorMessage(error);
  }

  function handleUpdateUrl(evt) {
    const value = evt.target.value;
    setUrl(value);
    const error = validateInputUrl(value);
    setErrorMessageURL(error);
  }

  function handleSubmitAdd(evt) {
    evt.preventDefault();

    if (title === "" || url === "") {
      onDisableButtonSubmit();
    } else {
      onHabilityButtonSubmit();
    }

    handleSubmit({ title, url });
    setTitle("");
    setUrl("");

    onClose();
  }

  return (
    <section className={`${classPopupAddPlace} popup popup-add`} id="popup-add">
      <div className="popup-add__container">
        <img
          className="popup__icon popup-add__icon"
          alt="icone fechar popup"
          src={iconClose}
          onClick={onClose}
        />
        <h2 className="popup-add__title">Novo lugar</h2>
        <form
          onSubmit={handleSubmitAdd}
          className="popup__form popup-add__form"
          id="form-add"
          name="forname"
          noValidate
        >
          <div className="popup-add__form-display">
            <input
              type="text"
              className={
                errorMessage
                  ? "popup-add__description-title popup__input popup__input_type_error"
                  : ""
              }
              placeholder="Titulo"
              value={title}
              onChange={handleUpdateTitle}
              required
            />
            {errorMessage && (
              <span id="input-place" className="popup__span-message">
                {errorMessage}
              </span>
            )}
          </div>
          <div className="popup-add__form-display">
            <input
              type="url"
              className={
                errorMessageURL
                  ? "popup-add__description-link popup__input popup__input_type_error"
                  : ""
              }
              placeholder="Link da imagem"
              value={url}
              onChange={handleUpdateUrl}
              required
            />
            {errorMessageURL && (
              <span id="input-url" className="popup__span-message">
                {errorMessageURL}
              </span>
            )}
          </div>
          <button
            type="submit"
            className={`${classButtonAddSubmit} popup__button popup-add__button`}
            id="button-form-add"
            name="buttons-forms"
            disabled={disabledButtonSubmit}
            onSubmit={handleSubmitAdd}
          >
            Criar
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewPlace;
