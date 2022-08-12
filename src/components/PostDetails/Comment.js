import { Avatar, Grid, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';
import { useAuth } from "@/lib/auth";
import styles from '../../styles/comments.module.css';

function Comment({userId, comment, createdAt}) {
  const { listenUser } = useAuth();
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

    const date = createdAt.toDate().toDateString()
    console.log(date);
  return (
    <>
        {
          userOwnerProfile ?
            <Grid container className={styles.comment_container}>
            <Grid item xs={1} sm={1} className={styles.container}>
              <Avatar alt={comment} src="/images/pet19.jpg"/>
            </Grid>
            <Grid item xs={12} sm={11}>
              <Typography className={styles.commenter_name}>{userOwnerProfile.name}</Typography>
              <Typography className={styles.comment_date}>{date}</Typography>
              <Typography className={styles.message}>{comment}</Typography>
            </Grid>
          </Grid>
          :
          ""
        }
    </>
  )
}

export default Comment