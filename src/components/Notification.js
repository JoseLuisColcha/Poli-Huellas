import { MenuItem, Typography, Grid, ListItem } from "@mui/material";
import styles from "../styles/notification.module.css";
import Link from "next/link";
import NOTIFICATIONS from "../constants/notifications";
import Routes from "../constants/routes";
import { useAuth } from "@/lib/auth";

function Notification(props) {
  const { notification, handleCloseNotificationsMenu } = props;
  const date = notification.createdAt.toDate().toDateString();
  const { session } = useAuth();

  return (
    <>
      <Link
        href={
          notification?.message === NOTIFICATIONS.BAD_REQUEST_ADOPTION
            ? Routes.ADOPTIONS
            : notification?.message === NOTIFICATIONS.ACCEPTED_POST
            ? `/perfil-de-usuario/${session?.uid}`
            : notification?.postId !== undefined
            ? `/post/${notification?.postId}`
            : Routes.HOME
        }
      >
        <MenuItem
          onClick={handleCloseNotificationsMenu}
          className={styles.container}
        >
          <Grid container>
            <ListItem>
              <Typography xs className={styles.notification_text}>
                {notification.message}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography xs className={styles.date_text}>
                {date}
              </Typography>
            </ListItem>
          </Grid>
        </MenuItem>
      </Link>
    </>
  );
}

export default Notification;
