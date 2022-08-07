import React from 'react'
import {MenuItem, Typography, Grid, ListItem, ListItemText} from "@mui/material";
import styles from "../styles/Notification.module.css";

function Notification(props) {
    const {notification} = props;
    const date = notification.createdAt.toDate().toDateString()

  return (
    <>
    <MenuItem className={styles.container}>
      <Grid container>
        <ListItem>
          <Typography xs className={styles.notification_text}>{notification.message}</Typography>
        </ListItem>
        <ListItem>
          <Typography xs className={styles.date_text}>{date}</Typography>
        </ListItem>
      </Grid>
    </MenuItem>
    </>
  )
}

export default Notification;