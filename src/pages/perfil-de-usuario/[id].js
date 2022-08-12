import {
  Grid,
  Avatar,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { Person, Phone, LocationOn } from "@mui/icons-material";
import { useAuth } from "@/lib/auth";
import withAuth from "@/hocs/withAuth";
import EditUserInfoModal from "@/components/Modals/EditUserInfoModal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getMyPosts } from "@/lib/posts";
import { MyPostCard } from "@/components/MyPostCard";
import { useRouter } from "next/router";
import { useUserProfileInformation } from "@/hooks/useUserProfileInformation";
import styles from "../../styles/userProfile.module.css"
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";

function Profile() {
  const {
    query: { id: userId },
  } = useRouter();
  const { updateUser, session } = useAuth();
  const [open, setOpen] = useState(false);
  const [myPosts, setMyPosts] = useState([]);

  const { userDataProfile } = useUserProfileInformation({ userId });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getMyPosts(userId);
      setMyPosts(posts);
    };
    getPosts();
  }, [userId]);

  const onSubmit = async (data) => {
    const convertedData = {
      ...data,
      uid: userDataProfile.uid,
      displayName: `${data.name} ${data.lastName}`,
    };
    await updateUser(convertedData);
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
    reset({
      name: userDataProfile?.name,
      lastName: userDataProfile?.lastName,
      location: userDataProfile?.location,
      phoneNumber: userDataProfile?.phoneNumber,
    });
  };

  return (
    <Grid container margin={0} spacing={2} marginTop={4}>
      <Grid xs={12} sm={3} justifyContent={"center"}>
        <Grid
          marginY={4}
          container
          direction="column"
          alignItems="center"
          marginLeft={3}
        >
          <Avatar
            alt="username"
            sx={{ width: 150, height: 150 }}
            src={userDataProfile?.photoURL}
          >
            {userDataProfile?.displayName?.charAt(0)}
          </Avatar>
        </Grid>
        <Grid container marginLeft={4}>
          <Grid container marginBottom={2} justifyContent={"center"}>
            {userId === session?.uid ? (
              <Button
                variant="outlined"
                component="label"
                className={styles.button_upload}
                endIcon={<UploadIcon />}
              >
                Seleccionar Imagen
                <input type="file" accept=".png,.jpg,.jpeg" hidden />
              </Button>
            ) : (
              ""
            )}
          </Grid>
          <Typography variant="h6" noWrap>
            Contacto
          </Typography>
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
        </Grid>
        <Grid container direction="row" justifyContent={"center"} margin={3}>
          {userId === session?.uid ? (
            <Button
              variant="contained"
              className={styles.button_update_information}
              onClick={handleOpenModal}
              endIcon={<EditIcon />}
            >
              Editar información
            </Button>
          ) : (
            ""
          )}
        </Grid>
      </Grid>

      <Grid xs={12} sm={9} container direction="column" alignItems="center">
        <Typography style={{ fontSize: "32px", fontWeight: 700 }}>
          {userId === session?.uid ? "Tus Publicaciones" : "Publicaciones"}
        </Typography>
        <Divider
          variant="inset"
          style={{ border: "1px solid #C2C6CC", width: "90%" }}
        />
        {myPosts?.map((post, index) => (
          <MyPostCard
            key={index}
            post={post}
            userId={userId}
            session={session}
          />
        ))}
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
