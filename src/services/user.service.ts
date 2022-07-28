import { account } from "types/user.interface";
import api from "./api";

const signUp = (data: any) => {
  return api.post(`/users`, data);
};

const signIn = (data: any) => {
  return api.post(`/users/login`, data);
};

const UserService = { signUp, signIn };

export default UserService;
