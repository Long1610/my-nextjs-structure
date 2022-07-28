import api from "./api";
import { post } from "types/post.interface";

const getPosts = () => {
  return api.get("/posts");
};

const getPostDetail = (id: number) => {
  return api.get(`/posts/${id}`);
};

const createPost = (data: post) => {
  return api.post("/posts", data);
};

const updatePost = (id: number, data: post) => {
  return api.post(`/posts/${id}`, data);
};

const deletePost = (id: number) => {
  return api.delete(`/posts/${id}`);
};

const PostService = {
  getPosts,
  getPostDetail,
  createPost,
  updatePost,
  deletePost,
};

export default PostService;
