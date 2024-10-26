import iconClose from "../../images/close-icon.png";
import { useState, useEffect } from "react";

function ProfileImgEdit({ onClose, classPopupEdit, onProfileAvatarChange }) {

  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabledButtonEditSubmit, setDisabledButtonEditSubmit] = useState(true);
  const classButtonEditSubmit = disabledButtonEditSubmit ? "popup-edit__button_disabled" : "";
  const regexUrl = /^(?:https?:\/\/)?(w{3}\.)?[\w_-]+((\.\w{2,}){1,2})(\/([\w\._-]+\/?)*(\?[\w_-]+=[^\?\/&]*(\&[\w_-]+=[^\?\/&]*)*)?)?$/;

  useEffect(() => {
    disabledBtn(image)
  }, [])

  function disabledBtn(image) {
    if (image === "" || image.length <= 2 || !regexUrl.test(image)) {
      setDisabledButtonEditSubmit(true)
    } else {
      setDisabledButtonEditSubmit(false)
    }
  }

  const validateinputs = (value) => {
    if (value === "" || value.length <= 2 || !regexUrl.test(value)) {
      return "Digite uma URL válida";
    } else {
      return "";
    }
  };

  function handleUpdateAvatar(evt) {
    const value = evt.target.value;
    setImage(value);
    const error = validateinputs(value);
    setErrorMessage(error);
    disabledBtn(image)
  }

  function handleSubmitAvatar(evt) {

    evt.preventDefault();
    setImage("");
    setDisabledButtonEditSubmit(true)

    onClose();
  }

  return (
    <section className={`${classPopupEdit} popup popup-edit`}>
      <div className="popup-edit__container">
        <img
          className="popup__icon popup-edit__icon"
          alt="icone fechar popup"
          src={iconClose}
          onClick={onClose}
        />
        <h2 className="popup-edit__title">Alterar a foto do perfil</h2>
        <form
          onSubmit={handleSubmitAvatar}
          className="popup__form popup-edit__form"
          id="form-edit"
          noValidate
        >
          <input
            type="url"
            className={
              errorMessage
                ? "popup-edit__description-link popup__input popup__input_type_error"
                : ""
            }
            name="image"
            placeholder="Link da imagem"
            value={image}
            onChange={handleUpdateAvatar}
            required
          />
          {errorMessage && (
            <span id="input-edit-url" className="popup__span-message">
              {errorMessage}
            </span>
          )}
          <button
            type="submit"
            className={`${classButtonEditSubmit} popup__button popup-edit__button`}
            id="button-form-edit"
            onClick={() => onProfileAvatarChange({ image })}
            disabled={disabledButtonEditSubmit}
            onSubmit={handleSubmitAvatar}
          >
            Salvar
          </button>
        </form>
      </div>
    </section>
  );
}

export default ProfileImgEdit;
