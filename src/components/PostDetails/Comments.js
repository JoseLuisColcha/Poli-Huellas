import React, { useState, useEffect } from "react";
import { listtenComments } from "@/lib/comments";
import { Typography, Grid } from "@mui/material";
import styles from "../../styles/comments.module.css";
import Comment from "./Comment";
import SendComment from "./SendComment";

function Comments({ postId, ownerId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const cb = (snapshot) => {
      const comments = snapshot.docs;
      setComments(comments.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const unsub = listtenComments({ postId, callback: cb });
    return () => unsub();
  }, [postId]);

  return (
    <>
      {comments === [] || comments === undefined ? (
        <Typography className={styles.message_alert}>
          No tiene comentarios
        </Typography>
      ) : (
        <Typography className={styles.message_alert}>
          {comments.length} comentarios
        </Typography>
      )}
      <SendComment postId={postId} ownerId={ownerId} />
      <Grid className={styles.messages_container}>
        {comments?.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment.comment}
            userId={comment.userId}
            createdAt={comment.createdAt}
            commentId={comment.id}
          />
        ))}
      </Grid>
    </>
  );
}

export default Comments;
