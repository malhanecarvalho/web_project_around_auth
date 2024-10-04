import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import iconEdit from "../images/icone_editar.svg";
import ProfileEdit from "./PopupWithForm/ProfileEdit";
import ProfileImgEdit from "./PopupWithForm/ProfileImgEdit";
import PopupWithForm from "./PopupWithForm/PopupWithForm";

function Main({
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
  onClose,
  classPopupProfile,
  classPopupEdit,
  onProfileInfo,
  onProfileInfoAvatar,
  onUpdateUser,
  onUpdateAvatar
}) {
  const { currentUser } = React.useContext(CurrentUserContext);

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__container">
            <img
              className="profile__image"
              alt="imagem do perfil"
              src={currentUser.avatar}
            />
            <img
              className="profile__icon-avatar"
              src={iconEdit}
              alt="icone editar foto do perfil"
              onClick={isEditAvatarPopupOpen}
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subheading">{currentUser.about}</p>

            <button
              type="button"
              className="profile__button profile__button_icon_edit"
              onClick={isEditProfilePopupOpen}
            ></button>
          </div>
          <button
            type="button"
            className="profile__button-add profile__button-add_icon_add"
            onClick={isAddPlacePopupOpen}
          ></button>
        </section>

        <ProfileEdit
          onClose={onClose}
          classPopupProfile={classPopupProfile}
          onProfileEditChange={onProfileInfo}
          onUpdateUser={onUpdateUser}
        />
        <ProfileImgEdit
          onClose={onClose}
          classPopupEdit={classPopupEdit}
          onProfileAvatarChange={onProfileInfoAvatar}
          onUpdateAvatar={onUpdateAvatar}
        />

        <PopupWithForm />
      </main>
    </>
  );
}

export default Main;
