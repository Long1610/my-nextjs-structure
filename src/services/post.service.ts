import api from "./api";

const getPosts = () => {
  return api.get(`/articles/feed?limit=10&offset=0`);
};

const PostService = {
  getPosts,
};

export default PostService;
