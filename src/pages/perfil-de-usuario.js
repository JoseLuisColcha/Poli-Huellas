import {
  Grid,
  Avatar,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from "@mui/material";
import { Person, Phone, LocationOn } from "@mui/icons-material";
import { useAuth } from "@/lib/auth";
import withAuth from "@/hocs/withAuth";
import EditUserInfoModal from "@/components/Modals/EditUserInfoModal";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Profile() {
  const { currentUser, updateUser } = useAuth();
  const [open, setOpen] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const convertedData = {
      ...data,
      uid: currentUser.uid,
      displayName: `${data.name} ${data.lastName}`,
    };
    await updateUser(convertedData);
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
    reset({
      name: currentUser?.name,
      lastName: currentUser?.lastName,
      location: currentUser?.location,
      phoneNumber: currentUser?.phoneNumber,
    });
  };

  return (
    <Grid container margin={0}>
      <Grid xs={12} sm={2}>
        <Grid marginY={4} container direction="column" alignItems="center">
          <Avatar
            alt="username"
            sx={{ width: 100, height: 100 }}
            src={currentUser?.photoURL}
          >
            {currentUser?.displayName?.charAt(0)}
          </Avatar>
        </Grid>
        <Grid container>
          <Typography variant="h6" noWrap>
            Contacto
          </Typography>
          <ListItem disablePadding>
            <ListItemIcon>
              <Person color="primary" />
            </ListItemIcon>
            <ListItemText primary={currentUser?.displayName} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <Phone color="primary" />
            </ListItemIcon>
            <ListItemText primary={currentUser?.phoneNumber} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <LocationOn color="primary" />
            </ListItemIcon>
            <ListItemText primary={currentUser?.location} />
          </ListItem>
        </Grid>
        <Grid container direction="row" justifyContent={"center"} margin={2}>
          <Button variant="contained" onClick={handleOpenModal}>
            Editar información
          </Button>
        </Grid>
      </Grid>

      <Grid xs={12} sm={10} container direction="column" alignItems="center">
        List of posts
      </Grid>

      <EditUserInfoModal
        open={open}
        handleClose={() => setOpen(false)}
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
      />
    </Grid>
  );
}

export default withAuth(Profile);
