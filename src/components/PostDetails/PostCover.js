import React, {useState, useEffect} from 'react'
import { Card, CardContent, Avatar, Typography, Grid, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import styles from '../../styles/PostDetails.module.css';
import { useAuth } from "@/lib/auth";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';

function PostCover(props) {
    const { petImage, petName, userId } = props;
    const { listenUser } = useAuth();
    const [userDataProfile, setUserDataProfile] = useState(null);
    useEffect(() => {
      const callback = (doc) => {
        const data = doc.data();
        setUserDataProfile({ ...data, uid: doc.id });
      };
      let unsub;
      if (userId) {
        unsub = listenUser(callback, userId);
      }
      return () => unsub && unsub();
    }, [userId, listenUser]);
  return (
    <>
      {
        userDataProfile ?
        <Card>
        <CardContent className={`${styles.container} ${styles.cover}`}>
          <Avatar
                className={styles.pet_image}
                alt={petName}
                src={petImage}
            />
            <Grid container className={styles.container}>
              <Typography className={styles.title}>Información de Contacto</Typography>
              <ListItem>
                <ListItemIcon><EmailOutlinedIcon/></ListItemIcon>
                <ListItemText primary={userDataProfile.email} />
              </ListItem>
              <ListItem>
                <ListItemIcon><CallOutlinedIcon/></ListItemIcon>
                <ListItemText primary={userDataProfile.phoneNumber} />
              </ListItem>
            </Grid>
        </CardContent>
      </Card>
      : ""
      }
    </>
  )
}

export default PostCover