import iconClose from "../../images/icone_fechar.svg";
import { useState } from "react";

function ProfileImgEdit({
  onClose,
  classPopupEdit,
  onProfileAvatarChange,
  disabledButtonSubmit,
  onDisableButtonSubmit,
  onHabilityButtonSubmit,
  classButtonEditSubmit
}) {
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateinputs = (value) => {
    const regexUrl = /^(?:https?:\/\/)?(w{3}\.)?[\w_-]+((\.\w{2,}){1,2})(\/([\w\._-]+\/?)*(\?[\w_-]+=[^\?\/&]*(\&[\w_-]+=[^\?\/&]*)*)?)?$/
    if (value === "" || value.length <= 2 || !regexUrl.test(value)) {
      onDisableButtonSubmit()
      return "Digite uma URL válida";
    } else {
      onHabilityButtonSubmit()
      return "";
    }
  };

  function handleUpdateAvatar(evt) {
    const value = evt.target.value;
    setImage(value);
    const error = validateinputs(value);
    setErrorMessage(error);
  }

  function handleSubmitAvatar(evt) {
    evt.preventDefault();
    if (image === "") {
      onDisableButtonSubmit();
    } else {
      onHabilityButtonSubmit();
    }
    setImage("");

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
            disabled={disabledButtonSubmit}
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
