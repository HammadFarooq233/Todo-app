import { api } from "./configs/axiosConfig";

async function register(user) {
  const { data } = await api.post("/users", user);
  return data;
}

async function getTasksByUser(userId) {
  const { data } = await api.get(`/users/${userId}/tasks`);
  return data;
}

const UsersApi = {
  register,
  getTasksByUser,
};

export default UsersApi;
