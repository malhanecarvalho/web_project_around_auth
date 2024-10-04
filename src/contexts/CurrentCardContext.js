import React from "react";
import api from "../utils/api";
import { useState, useEffect } from "react";

export const CurrentCardContext = React.createContext();

export const CurrentCardProvider = ({ children }) => {
  const [cards, setCards] = useState([]);

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

  return (
    <CurrentCardContext.Provider value={{ cards, setCards }}>
      {children}
    </CurrentCardContext.Provider>
  );
};
