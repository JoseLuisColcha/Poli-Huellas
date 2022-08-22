import React, { useEffect, useState } from "react";
import withAuth from "@/hocs/withAuth";
import { getPosts } from "@/lib/posts";
import PETTYPE from "src/constants/petType";
import PostsTable from "@/components/PostsTable";
import { Typography } from "@mui/material";
import styles from "@/styles/pagesPostsAdmin.module.css";

function Otros() {
  const [otherPosts, setOtherPosts] = useState();

  useEffect(() => {
    const cb = (snapshot) => {
      const others = snapshot.docs;
      setOtherPosts(others.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    
    const unsub = getPosts({petType: PETTYPE.OTROS, callback: cb});
    return () => unsub();
  }, []);
  return (
    <>
      <Typography className={styles.title_text}>
        Lista de conejos y <span className={styles.span_text}>otros</span>
      </Typography>
      <PostsTable posts={otherPosts} />
    </>
  );
}
export default withAuth(Otros);
