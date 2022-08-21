import React, { useEffect, useState } from "react";
import withAuth from "@/hocs/withAuth";
import { getPosts } from "@/lib/posts";
import PETTYPE from "src/constants/petType";
import PostsTable from "@/components/PostsTable";
import { Typography } from "@mui/material";
import styles from "@/styles/pagesPostsAdmin.module.css";

function Gatos() {
  const [catPosts, setCatPosts] = useState();

  useEffect(() => {
    const getCatPosts = async () => {
      const posts = await getPosts(PETTYPE.GATO);
      setCatPosts(posts);
    };
    getCatPosts();
  }, []);
  return (
    <>
      <Typography className={styles.title_text}>
        Lista de <span className={styles.span_text}>gatos</span>
      </Typography>
      <PostsTable posts={catPosts} />
    </>
  );
}
export default withAuth(Gatos);
