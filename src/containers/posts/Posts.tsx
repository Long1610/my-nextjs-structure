import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Link from "next/link";
import { posts } from "./postsSlice";
import { fetchPosts } from "./postsThunk";
import styles from "./Posts.module.scss";

const Posts = () => {
  const list = useAppSelector(posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <table id={styles.post}>
        <thead>
          <tr className={styles.row}>
            <th className={styles.label}>UserId</th>
            <th className={styles.label}>Title</th>
            <th className={styles.label}>Body</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((item) => (
            <tr key={item.userId} className={styles.row}>
              <td className={styles.title}>{item.userId}</td>
              <td className={styles.title}>{item.title}</td>
              <td className={styles.title}>{item.body}</td>
              <td className={styles.title}>
                <Link href={`posts/${item.id}`}>Detail</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default Posts;
