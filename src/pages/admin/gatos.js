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
    const cb = (snapshot) => {
      const cats = snapshot.docs;
      setCatPosts(cats.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    
    const unsub = getPosts({petType: PETTYPE.GATO, callback: cb});
    return () => unsub();
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
