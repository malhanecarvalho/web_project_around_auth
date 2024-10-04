import React from "react";
import api from "../utils/api";
import { useState, useEffect } from "react";

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const user = api
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
    user.then((data) => {
      setCurrentUser(data);
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
