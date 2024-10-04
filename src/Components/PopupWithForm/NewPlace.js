import iconClose from "../../images/icone_fechar.svg";
import { useState } from "react";

function NewPlace({ submit, onClose, classPopupAddPlace }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageURL, setErrorMessageURL] = useState("");

  const validateInput = (value) => {
    if (value === "" || value.length <= 2) {
      return "Campo obrigatório";
    } else {
      return "";
    }
  };

  const validateInputUrl = (value) => {
    if (value === "" || value.length <= 2) {
      return "Digite uma URL válida";
    } else {
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

    submit({ title, url });
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
              style={{
                borderRightWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderBottomWidth: 1,
              }}
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
              style={{
                borderRightWidth: 0,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderBottomWidth: 1,
              }}
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
            className="popup__button popup-add__button"
            id="button-form-add"
            name="buttons-forms"
          >
            Criar
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewPlace;
