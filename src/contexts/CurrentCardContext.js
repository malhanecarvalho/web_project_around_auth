import React from "react";
import api from "../utils/api";
import { useState, useEffect } from "react";

export const CurrentCardContext = React.createContext();

export const CurrentCardProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
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

  useEffect(() => {
    cardList.then((data) => {
      setCards(data);
    });
  }, []);

  const cardList = api
    .getInitialCards()
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
      console.log("Quebrou no GET /cards");
      console.log(`Error: ${err}`);
    });

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

    function addLike(cardId) {
      api
        .addLikes(cardId)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })
        .then((newCard) => {
          setCards((state) =>
            state.map((c) =>
              c._id === cardId ? { ...c, likes: newCard.likes } : c
            )
          );
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
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })
        .then((newCard) => {
          setCards((state) =>
            state.map((c) =>
              c._id === cardId ? { ...c, likes: newCard.likes } : c
            )
          );
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
    <CurrentCardContext.Provider value={{ cards, myId, setCards, addLike, removeLike, handleSubmit, handleDelete}}>
      {children}
    </CurrentCardContext.Provider>
  );
};
