import { LocationOn, Person, Phone } from "@mui/icons-material";
import {
  Grid,
  Avatar,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  List,
} from "@mui/material";
import { useRouter } from "next/router";
import { useUserProfileInformation } from "../hooks/useUserProfileInformation";
import styles from "../styles/userInformation.module.css";

export const UserInformation = ({ userId }) => {
  const { userDataProfile } = useUserProfileInformation({ userId });
  const router = useRouter();

  return (
    <Grid xs={12} sm={2}>
      <Typography className={styles.text_title}>
        Información y formulario completado del{" "}
        <span className={styles.text_title_span}>adoptante</span>
      </Typography>
      <Grid marginY={2} container direction="column" alignItems="center">
        <Avatar
          alt="username"
          sx={{ width: 150, height: 150 }}
          src={userDataProfile?.photoURL}
        >
          {userDataProfile?.displayName?.charAt(0)}
        </Avatar>
      </Grid>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h6" noWrap>
          Adoptante
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <Person color="primary" />
            </ListItemIcon>
            <ListItemText primary={userDataProfile?.displayName} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <Phone color="primary" />
            </ListItemIcon>
            <ListItemText primary={userDataProfile?.phoneNumber} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <LocationOn color="primary" />
            </ListItemIcon>
            <ListItemText primary={userDataProfile?.location} />
          </ListItem>
        </List>
      </Grid>
      <Grid container justifyContent="center">
        <Button
          className={styles.button_view_profile}
          onClick={() =>
            router.push(`/perfil-de-usuario/${userDataProfile.uid}`)
          }
        >
          Ver perfil
        </Button>
      </Grid>
    </Grid>
  );
};
