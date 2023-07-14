import jwt_decode from "jwt-decode";

const token_key = "todo-token";

export const storeToken = (token) => {
  try {
    localStorage.setItem(token_key, token);
    return jwt_decode(token);
  } catch (error) {
    console.log("Error storing auth token.");
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem(token_key);
  } catch (error) {
    console.log("Error getting auth token.");
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem(token_key);
  } catch (error) {
    console.log("Error removing auth token.");
  }
};

export const getUser = () => {
  try {
    const token = getToken();
    const decoded = jwt_decode(token);
    return decoded;
  } catch (error) {
    console.log("Error getting user.");
  }
};
