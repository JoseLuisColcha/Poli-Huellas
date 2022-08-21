import React, { useEffect, useState } from "react";
import withAuth from "@/hocs/withAuth";
import { getPosts } from "@/lib/posts";
import PETTYPE from "src/constants/petType";
import PostsTable from "@/components/PostsTable";
import { Typography } from "@mui/material";
import styles from "@/styles/pagesPostsAdmin.module.css";

function Perros() {
  const [dogPosts, setDogPosts] = useState();

  useEffect(() => {
    const getDogPosts = async () => {
      const posts = await getPosts(PETTYPE.PERRO);
      setDogPosts(posts);
    };
    getDogPosts();
  }, []);

  return (
    <>
      <Typography className={styles.title_text}>
        Lista de <span className={styles.span_text}>perros</span>
      </Typography>
      <PostsTable posts={dogPosts} />;
    </>
  );
}
export default withAuth(Perros);
