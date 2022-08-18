import React, {useEffect, useState} from 'react';
import { Box, Modal, Typography, Button, Avatar, TextField, Grid, MenuItem } from '@mui/material';
import styles from "../../styles/editPost.module.css";
import UploadIcon from "@mui/icons-material/Upload";
import { useAuth } from "@/lib/auth";
import { uploadPetImage} from "@/lib/giveAdoption";
import { updatePostImage } from '@/lib/posts';
import { getDownloadURL } from "firebase/storage";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "442px",
    bgcolor: "background.paper",
    border: "1px solid #000056",
    borderRadius: "20px",
    paddingX: "2rem",
    paddingY: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#FFFFFF"
  };

const EditPostModal = ({openEdition, handleCloseEdition, postPhoto, postId, register = () => "", errors, onSubmit}) => {

    const { currentUser } = useAuth();
    const [task, setTask] = useState();
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
                  updatePostImage(postId, url)
                });
            }
          );
        }
      }, [task]);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file !== undefined) {
          setFile(file);
          const task = uploadPetImage(file, currentUser.uid);
          setTask(task);
          setImageName(file.name);
        }
      };

  
  return (
    <Modal
    open={openEdition}
    onClose={handleCloseEdition}>
        <Box sx={style} onSubmit={onSubmit} component='form'>
          <Typography className={styles.text}>
            <span className={styles.label}>Información de</span> {`mascota`}
          </Typography>
          <Avatar className={styles.petImage} src={postPhoto}></Avatar>
          <Button
          variant="outlined"
          component="label"
          className={styles.button_upload}
          endIcon={<UploadIcon />}
          >
          Seleccionar Imagen
          <input
                type="file"
                accept=".png,.jpg,.jpeg"
                hidden
                onChange={handleImage}
              />
          </Button>
          {imageName && <Typography>{imageName}</Typography>}
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
            className={styles.field}
              id="petName"
              label="Nombre de la mascota"
              {...register("petName")}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
            className={styles.field}
              id="petAge"
              label="Edad de la mascota"
              {...register("petAge")}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
            className={styles.field}
              id="petSex"
              label="Sexo de la mascota"
              select
              defaultValue=""
              {...register("petSex")}
            >
              <MenuItem value="" disabled>
                <em>Seleccione</em>
              </MenuItem>
              <MenuItem value="Hembra">Hembra</MenuItem>
              <MenuItem value="Macho">Macho</MenuItem>
            </TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField
            className={styles.field}
              id="petSize"
              label="Tamaño de la mascota"
              select
              defaultValue=""
              {...register("petSize")}
            >
              <MenuItem value="" disabled>
                <em>Seleccione</em>
              </MenuItem>
              <MenuItem value="Grande">Grande</MenuItem>
              <MenuItem value="Mediano">Mediano</MenuItem>
              <MenuItem value="Pequeño">Pequeño</MenuItem>
            </TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField
            className={styles.field}
              id="petSize"
              label="Descripción"
              {...register("description")}
            />
            </Grid>
          </Grid>
          <Box>
            <Button className={styles.cancel_button} onClick={handleCloseEdition}>
              Cancelar
            </Button>
            <Button className={styles.submit_button} type="submit">
              Aceptar
            </Button>
          </Box>
        </Box>
    </Modal>
  )
}

export default EditPostModal