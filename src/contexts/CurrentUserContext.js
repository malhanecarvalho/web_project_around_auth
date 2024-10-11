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

  function onUpdateUser(evt) {
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
        console.log("Quebrou no GET /cards");
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

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, onProfileInfoAvatar, onProfileInfo, onUpdateUser, onUpdateAvatar }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
