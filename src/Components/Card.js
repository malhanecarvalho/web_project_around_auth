import React from "react";
import {  CurrentUserContext } from "../contexts/CurrentUserContext";
import { useState } from "react";


function Card({
  card,
  addLikes,
  removeLikes,
  isPopupImgOpen,
  isPopupDeleteOpen,
  myId,
}) {
  
  const { currentUser } = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === myId;

  const cardDeleteButtonClassName = `cards__icon-trash ${
    isOwn ? " cards__icon-trash-visible" : "cards__icon-trash-hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `cards__icon-like ${
    isLiked ? "cards__icon-like-active" : "cards__icon-like-remove"
  }`;

  const [liked, setLiked] = useState(isLiked);

  const toggleLike = () => {
   if (liked) {
     setLiked(false)
    removeLikes(card._id);
    } else {
     setLiked(true)
     addLikes(card._id);
    } 
  };

  return (
    <li className="cards__container" id={card._id}>
      <button
        className={cardDeleteButtonClassName}
        onClick={() => {
          isPopupDeleteOpen(card);
        }}
      ></button>
      <img
        src={card.link}
        alt={card.name}
        className="cards__image"
        onClick={() => {
          isPopupImgOpen(card);
        }}
      />
      <h2 className="cards__title">{card.name}</h2>
      <button className={cardLikeButtonClassName} onClick={toggleLike}></button>

      <span className="cards__icon-like_count">
        {" "}
        {card.likes.length}
      </span>
    </li>
  );
}
export default Card;
