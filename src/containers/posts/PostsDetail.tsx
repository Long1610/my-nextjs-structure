import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PostService from "services/post.service";
import { post } from "types/post.interface";

const Detail = () => {
  const [item, setItem] = useState<post>();
  const router = useRouter();
  const { id } = router.query as any;

  useEffect(() => {
    (async () => {
      try {
        const res = await PostService.getPostDetail(id);
        setItem(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return <div>{item?.body}</div>;
};

export default Detail;
