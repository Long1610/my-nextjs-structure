import { useGetAxios } from "hooks/useGetAxios";
import React, { useEffect } from "react";
import PostService from "services/post.service";

const About = () => {
  const [postResponse, postError, postLoading] = useGetAxios(
    PostService.getPosts
  );
  return <div>About</div>;
};

export default About;
