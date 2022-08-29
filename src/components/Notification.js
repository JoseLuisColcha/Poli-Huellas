import {
  MenuItem,
  Typography,
  Grid,
  ListItem,
  IconButton,
  Stack,
} from "@mui/material";
import styles from "../styles/notification.module.css";
import Link from "next/link";
import NOTIFICATIONS from "../constants/notifications";
import Routes from "../constants/routes";
import { useAuth } from "@/lib/auth";
import CloseIcon from "@mui/icons-material/Close";
import { deleteNotification } from "@/lib/notifications";
import { useAlert } from "@/lib/alert";

function Notification(props) {
  const { notification, handleCloseNotificationsMenu } = props;
  const date = notification.createdAt.toDate().toDateString();
  const { session } = useAuth();
  const { addAlert } = useAlert();

  const deleteNotificationUser = () => {
    try {
      deleteNotification(notification.id);
      addAlert({
        text: "Notificación eliminada exitosamente",
        severity: "success",
        duration: 3000,
      });
    } catch (e) {
      addAlert({
        text: "Error al eliminar notificación",
        severity: "error",
        duration: 3000,
      });
    }
  };
  return (
    <>
      <Stack direction="row">
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
        <Grid item xs={1} sm={1} md={1} backgroundColor="#F8EEFE">
          <IconButton
            aria-label="Eliminar"
            className={styles.delete_icon}
            onClick={deleteNotificationUser}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Stack>
    </>
  );
}

export default Notification;
