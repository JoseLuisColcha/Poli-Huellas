import {
  Grid,
  Avatar,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Divider,
  Box,
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
import styles from "../../styles/userProfile.module.css";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import { updateUserImageURL, uploadUserImage } from "@/lib/shared";
import { getDownloadURL } from "firebase/storage";
import DoNotHavePostImage from "../../../public/images/dont-post-dog.webp";
import Image from "next/image";

function Profile() {
  const {
    query: { id: userId },
  } = useRouter();
  const { updateUser, session } = useAuth();
  const [open, setOpen] = useState(false);
  const [myPosts, setMyPosts] = useState([]);
  const [task, setTask] = useState();
  const [imgURL, setImgURL] = useState("");
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    if (task) {
      task?.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          console.log("Upload completed");
          getDownloadURL(task.snapshot.ref).then((url) => {
            updateUserImageURL(userId, url);
          });
        }
      );
    }
  }, [task]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file !== undefined) {
      setFile(file);
      const task = uploadUserImage(file, userId);
      setTask(task);
      setImageName(file.name);
    }
  };

  const { userDataProfile } = useUserProfileInformation({ userId });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    const status = session
      ? session?.role === "user"
        ? "ACCEPTED"
        : undefined
      : "ACCEPTED";

    const cb = (snapshot) => {
      const posts = snapshot.docs;
      setMyPosts(posts.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const unsub = getMyPosts({ userId, status: status, callback: cb });
    return () => unsub();
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
      <Grid item xs={12} sm={3} justifyContent={"center"}>
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
                onChange={handleImage}
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

      <Grid
        item
        xs={12}
        sm={9}
        container
        direction="column"
        alignItems="center"
      >
        <Typography style={{ fontSize: "32px", fontWeight: 700 }}>
          {userId === session?.uid ? "Tus Publicaciones" : "Publicaciones"}
        </Typography>
        <Divider
          variant="inset"
          style={{ border: "1px solid #C2C6CC", width: "90%" }}
        />
        {myPosts?.length > 0 ? (
          myPosts?.map((post, index) => (
            <MyPostCard
              key={index}
              post={post}
              userId={userId}
              session={session}
            />
          ))
        ) : (
          <Box>
            <Image
              alt="mascota"
              src={DoNotHavePostImage}
              width={420}
              height={400}
            />
          </Box>
        )}
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
