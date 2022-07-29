import { createAsyncThunk } from "@reduxjs/toolkit";
import TokenService from "services/token.service";
import UserService from "services/user.service";
import { account } from "types/user.interface";

export const signUp = createAsyncThunk("user/signUp", async (data: any) => {
  try {
    const d = { user: data };
    const res = await UserService.signUp(d);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const signIn = createAsyncThunk("user/signIn", async (data: any) => {
  try {
    const d = { user: data };
    const res = await UserService.signIn(d);
    TokenService.setUser(res.data.user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
