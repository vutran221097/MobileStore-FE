import axios from "axios";
import url from "../setup"
const API_URL = `${url}/auth/`;

const login = (username, password) => {
  return axios
    .post(API_URL + "sign-in", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        sessionStorage.setItem("token", JSON.stringify(response.data.accessToken));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;