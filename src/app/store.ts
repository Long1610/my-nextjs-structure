import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import postsReducer from "containers/posts/postsSlice";
import userSlice from "containers/user/userSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userSlice,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
