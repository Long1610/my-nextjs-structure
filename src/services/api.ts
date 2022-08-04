import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
  baseURL: "https://api.realworld.io/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const user = TokenService.getUser();
    if (user?.token) {
      config.headers!["Authorization"] = "Token " + user?.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
