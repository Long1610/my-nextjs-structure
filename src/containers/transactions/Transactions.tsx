import { useGetAxios } from "hooks/useGetAxios";
import React, { useEffect } from "react";
import PostService from "services/post.service";

const Transactions = () => {
  const [postResponse, postError, postLoading] = useGetAxios(
    PostService.getPosts
  );
  return (
    <div>
      <h1>Transactions</h1>
    </div>
  );
};

export default Transactions;
