import { createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "services/post.service";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const res = await PostService.getPosts();
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
