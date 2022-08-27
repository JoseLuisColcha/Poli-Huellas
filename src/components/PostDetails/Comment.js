import { Avatar, Grid, Typography, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import styles from "../../styles/comments.module.css";
import { DeleteOutlined } from "@mui/icons-material";
import DeleteCommentModal from "@/components/Modals/DeleteCommentModal.js";

function Comment({ userId, comment, createdAt, commentId }) {
  const { listenUser, session } = useAuth();
  const [userOwnerProfile, setUserOwnerProfile] = useState(null);
  useEffect(() => {
    const callback = (doc) => {
      const data = doc.data();
      setUserOwnerProfile({ ...data, uid: doc.id });
    };
    let unsub;
    if (userId) {
      unsub = listenUser(callback, userId);
    }
    return () => unsub && unsub();
  }, [userId, listenUser]);

  const date = createdAt.toDate().toDateString();
  console.log(date);

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <>
      {userOwnerProfile ? (
        <Grid container className={styles.comment_container}>
          <Grid item xs={2} sm={1} className={styles.container}>
            <Avatar
              className={styles.avatar_user}
              alt={comment}
              src={userOwnerProfile.photoURL}
            />
          </Grid>
          <Grid item xs={10} sm={10} md={10}>
            <Typography className={styles.commenter_name}>
              {userOwnerProfile.displayName}
            </Typography>
            <Typography className={styles.comment_date}>{date}</Typography>
            <Typography className={styles.message}>{comment}</Typography>
          </Grid>
          {userId === session?.uid || session?.role === "admin" ? (
            <Grid item xs={1} sm={1} md={1}>
              <IconButton
                aria-label="Eliminar"
                className={styles.delete_icon}
                onClick={handleOpenModal}
              >
                <DeleteOutlined />
              </IconButton>
              <DeleteCommentModal
                open={open}
                handleClose={() => setOpen(false)}
                commentId={commentId}
              />
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      ) : (
        ""
      )}
    </>
  );
}

export default Comment;
