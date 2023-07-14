const axios = require("axios").default;

const api = axios.create({
  baseURL: "https://todo-backend-gipp.onrender.com",
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("todo-token");
  config.headers["x-access-token"] = token;
  return config;
});

export { api };

const errorHandler = (error) => {
  const statusCode = error.response?.status;

  if (statusCode && statusCode !== 401) {
    console.log(error.response?.data);
  }
  console.log(error.response?.data);
  return Promise.reject(error);
};

api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});
