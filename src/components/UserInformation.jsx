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

export const UserInformation = ({ userId }) => {
  const { userDataProfile } = useUserProfileInformation({ userId });
  const router = useRouter();

  return (
    <Grid xs={12} sm={2}>
      <Grid marginY={2} container direction="column" alignItems="center">
        <Avatar
          alt="username"
          sx={{ width: 100, height: 100 }}
          src={userDataProfile?.photoURL}
        >
          {userDataProfile?.displayName?.charAt(0)}
        </Avatar>
      </Grid>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h6" noWrap>
          Adoptador
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
          variant="contained"
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
