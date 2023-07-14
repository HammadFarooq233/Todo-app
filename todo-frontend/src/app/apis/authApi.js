import { api } from "./configs/axiosConfig";

async function login(user) {
  const { data } = await api.post("/auth/token", user);

  return data;
}

const AuthApi = {
  login,
};

export default AuthApi;
