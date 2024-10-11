const BASE_URL = "https://register.nomoreparties.co";

export const register = async ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const login = async ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const checkToken = async (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "Application/json",
      "Content-Type": "Application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
