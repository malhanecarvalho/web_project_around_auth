import { useState, useContext } from "react";
import api from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Card from "./Card";
import NewPlace from "./PopupWithForm/NewPlace";
import ImagePopup from "./PopupWithForm/PopupImg";
import PopupDeleteConfirmation from "./PopupWithForm/PopupDeleteConfirmation";
import {
  CurrentUserContext
} from "../contexts/CurrentUserContext";

import {
  CurrentCardContext
} from "../contexts/CurrentCardContext";

const myId = "12f64a6abf3eacd38eda1396";

const owner = api
  .getUserMe()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  })
  .then((data) => {
    return data;
  })
  .catch((err) => {
    console.log("Quebrou no GET /userMe");
    console.log(`Error: ${err}`);
  });

function App() {
  const [cardLink, setCardLink] = useState({ name: "", link: "" });
  const [cardDelete, setCardDelete] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);
  const classPopupImg = isOpen ? "popup-img-opened" : "";
  const classPopupProfile = isEditProfilePopupOpen ? "popup-opened" : "";
  const classPopupAddPlace = isAddPlacePopupOpen ? "popup-add-opened" : "";
  const classPopupEdit = isEditAvatarPopupOpen ? "popup-edit-opened" : "";
  const classPopupDeleteCard = isPopupDeleteOpen ? "popup-delete-opened" : "";

  const { cards, setCards } = useContext(CurrentCardContext);
  const { currentUser, setCurrentUser} = useContext(CurrentUserContext);

  function onEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function onEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function onAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function onPopupDeleteClick(card) {
    setIsPopupDeleteOpen(true);
    setCardDelete(card);
  }

  function onCardClick(card) {
    setCardLink(card);
    setOpen(true);
  }

  function handleClosePopup() {
    setOpen(false);
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPopupDeleteOpen(false);
  }

  function handleSubmit(card) {
    const dataCard = {
      createdAt: new Date(),
      likes: [],
      link: card.url,
      name: card.title,
      owner: owner,
    };

    api
      .createCard(dataCard)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        setCards([data, ...cards]);
      })
      .catch((err) => {
        console.log("Quebrou no POST /cards");
        console.log(`Error: ${err}`);
        setCards([]);
      });
  }

  function onProfileInfo(evt) {
    api
      .userEdit(evt.title, evt.about)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        setCurrentUser({ ...data });
      })
      .catch((err) => {
        console.log("Quebrou no GET /user");
        console.log(`Error: ${err}`);
        setCurrentUser([]);
      });
  }

  function onUpdateUser(evt){
    api.userEdit(evt.title, evt.about).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((data) => {
      setCurrentUser({...data});
    })
    .catch((err) => {
      console.log("Quebrou no GET /cards");
      console.log(`Error: ${err}`);
      setCurrentUser([]);
    });

    
  }

  function onProfileInfoAvatar(evt) {
    api
      .editAvatar({ avatar: evt.image })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        setCurrentUser({ ...data });
      })
      .catch((err) => {
        console.log("Quebrou no GET /users");
        console.log(`Error: ${err}`);
        setCurrentUser([]);
      });
  }

  function onUpdateAvatar(evt) {

    api
      .editAvatar({ avatar: evt.image })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        setCurrentUser({ ...currentUser, data });
      })
      .catch((err) => {
        console.log("Quebrou no GET /users");
        console.log(`Error: ${err}`);
        setCurrentUser([]);
      });
  }

  function addLike(cardId) {
    api
      .addLikes(cardId).then((res) => {
        if(res.ok){
          return res.json()
        }
        return Promise.reject(res.status)
      })
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === cardId ? {...c, likes: newCard.likes} : c));
      })
      .catch((err) => {
        console.log(`Quebrou no LIKED /cards/${cardId}`);
        console.log(`Error: ${err}`);
      });
  }

  function removeLike(cardId) {
    api
      .removeLikes(cardId)
      .then((res) => {
        if(res.ok){
          return res.json()
        }
        return Promise.reject(res.status)
      })
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === cardId ? {...c, likes: newCard.likes} : c));
      })
      .catch((err) => {
        console.log(`Quebrou no LIKED /cards/${cardId}`);
        console.log(`Error: ${err}`);
      });
  }

  function handleDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardId));
      })
      .catch((err) => {
        console.log(`Quebrou no DELETE /cards/${cardId}`);
        console.log(`Error: ${err}`);
      });
  }

  return (
    <div className="page">
          <ImagePopup
            cardLink={cardLink}
            onClose={handleClosePopup}
            popupImgOpened={classPopupImg}
          />
          <Header />

          <Main
            isEditProfilePopupOpen={onEditProfileClick}
            isAddPlacePopupOpen={onAddPlaceClick}
            isEditAvatarPopupOpen={onEditAvatarClick}
            onClose={handleClosePopup}
            card={cards}
            classPopupProfile={classPopupProfile}
            classPopupEdit={classPopupEdit}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            onProfileInfo={onProfileInfo}
            onProfileInfoAvatar={onProfileInfoAvatar}
            onUpdateUser={onUpdateUser}
            onUpdateAvatar={onUpdateAvatar} 
          />

          <PopupDeleteConfirmation
            classPopupDeleteCard={classPopupDeleteCard}
            onClose={handleClosePopup}
            onDelete={handleDelete}
            myId={myId}
            cardDelete={cardDelete}
          />

          <ul className="cards">
            <NewPlace
              submit={handleSubmit}
              onClose={handleClosePopup}
              classPopupAddPlace={classPopupAddPlace}
            />
            {cards.map((card, index) => (
              <Card
                key={index}
                card={card}
                onDelete={handleDelete}
                myId={myId}
                addLikes={addLike}
                removeLikes={removeLike}
                isPopupImgOpen={onCardClick}
                isPopupDeleteOpen={onPopupDeleteClick}
              />
            ))}
          </ul>
          <Footer />
    </div>
  );
}

export default App;
