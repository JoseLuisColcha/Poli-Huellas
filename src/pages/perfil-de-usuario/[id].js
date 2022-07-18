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

function Profile(props) {
  const { query: { id } } = useRouter()
  const { updateUser, listenUser } = useAuth();
  const [userDataProfile, setUserDataProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const callback = (doc) => {
      const data = doc.data();
      setUserDataProfile({ ...data, uid: doc.id });
    };
    let unsub;
    if (id) {
      unsub = listenUser(callback, id);
    }
    return () => unsub && unsub();
  }, [id, listenUser])

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getMyPosts(id);
      setMyPosts(posts);
    }
    getPosts();
  }, [id]);

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
    <Grid container margin={0} spacing={2}>
      <Grid xs={12} sm={2}>
        <Grid marginY={4} container direction="column" alignItems="center">
          <Avatar
            alt="username"
            sx={{ width: 100, height: 100 }}
            src={userDataProfile?.photoURL}
          >
            {userDataProfile?.displayName?.charAt(0)}
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
        <Grid container direction="row" justifyContent={"center"} margin={2}>
          <Button variant="contained" onClick={handleOpenModal}>
            Editar información
          </Button>
        </Grid>
      </Grid>

      <Grid xs={12} sm={10} container direction="column" alignItems="center">
        <Typography style={{'fontSize':'32px', 'fontWeight':700}}>Tus Publicaciones</Typography>
        <Divider variant="inset" style={{'border':'1px solid #C2C6CC', 'width':'90%'}} />
          {myPosts?.map((post, index) => (
            <MyPostCard key={index} post={post} />
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
