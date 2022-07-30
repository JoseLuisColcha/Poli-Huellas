import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Stack, Grid, Container, MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from "@mui/material";
import { useAuth } from "@/lib/auth";
import Image from 'next/image';
import styles from "../styles/NewAdoption.module.css";
import { uploadPetImage, newPost } from "@/lib/giveAdoption";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { getDownloadURL } from "firebase/storage";
import Routes from "src/constants/routes";
import QUESTIONS from "src/constants/questions";
import PETTYPE from "src/constants/petType";

const schema = yup.object({
  petAge: yup
    .string("El campo debe ser alfanumérico")
    .required("Este campo es requerido"),
  petSize: yup.string().required("Este campo es requerido"),
  petType: yup.string().required("Este campo es requerido"),
});

export default function Giveadoption() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { currentUser } = useAuth();
  const [task, setTask] = useState();
  const [imgURL, setImgURL] = useState("");
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (task) {
      task?.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          console.log("Upload completed");
          getDownloadURL(task.snapshot.ref).then(setImgURL);
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

  const handleClose = () => {
    setOpen(false);
  }

  const onSubmit = async (data) => {
    const {answerOne, answerTwo, answerThree, answerFour, petType, petName, petSize, petAge, petSex, extraDescription} = data;
    try {
      await newPost(answerOne, answerTwo, answerThree, answerFour, petType, petName, petSize, petAge, petSex, imgURL, extraDescription, currentUser.uid);
      setOpen(true);
    } catch (error) {
      if (error.response) {
        alert(error.response.message);
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };


  return (
    <>
      <Container className={styles.container}>
        <Image
          src="/images/pet19.jpg"
          alt="cover"
          width="1080px"
          height="491px"
        />
      </Container>
      <Container className={styles.container}>
        <Stack direction="row" spacing={1}>
          <Image
            src="/images/huella.png"
            alt="fingerprint"
            width="60px"
            height="23.34px"
          />
          <Typography>Por favor, completa el presente formulario si deseas dar una mascota en adopción.</Typography>
        </Stack>
      </Container>
      <Box className={styles.form_container} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>

        <Grid container spacing={2} className={styles.question_container}>
          <Grid item xs={8}>
            <Typography>{QUESTIONS.GIVE_Q1}</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
            className={styles.select}
            id="question-one"
            select
            defaultValue=""
            label="Seleccionar una opción"
            {...register("answerOne")}
            helperText={QUESTIONS.GIVE_Q1}
            >
              <MenuItem value="" disabled><em>Seleccione</em></MenuItem>
              <MenuItem value="Rescatado de la calle">Rescatado de la calle</MenuItem>
              <MenuItem value="Alergías">Alergías</MenuItem>
              <MenuItem value="Cambio de domicilio">Cambio de domicilio</MenuItem>
              <MenuItem value="No permiten mascotas en lugar de residencia">No permiten mascotas en lugar de residencia</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={2} className={styles.question_container}>
          <Grid item xs={8}>
            <Typography>{QUESTIONS.GIVE_Q2}</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
            className={styles.select}
            id="question-two"
            select
            defaultValue=""
            label="Seleccionar una opción"
            {...register("answerTwo")}
            helperText={QUESTIONS.GIVE_Q2}
            >
              <MenuItem value="" disabled><em>Seleccione</em></MenuItem>
              <MenuItem value="Agresivo">Agresivo</MenuItem>
              <MenuItem value="Tranquilo">Tranquilo</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={2} className={styles.question_container}>
          <Grid item xs={8}>
            <Typography>{QUESTIONS.GIVE_Q3}</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
            className={styles.select}
            id="question-three"
            select
            defaultValue=""
            label="Seleccionar una opción"
            {...register("answerThree")}
            helperText={QUESTIONS.GIVE_Q3}
            >
              <MenuItem value="" disabled><em>Seleccione</em></MenuItem>
              <MenuItem value="Sí">Sí</MenuItem>
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="No lo sé">No lo sé</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={styles.question_container}>
          <Grid item xs={8}>
            <Typography>{QUESTIONS.GIVE_Q4}</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
            className={styles.select}
            id="question-four"
            select
            defaultValue=""
            label="Seleccionar una opción"
            {...register("answerFour")}
            helperText={QUESTIONS.GIVE_Q4}
            >
              <MenuItem value="" disabled><em>Seleccione</em></MenuItem>
              <MenuItem value="No, la encontré en la calle">No, la encontré en la calle</MenuItem>
              <MenuItem value="Sí, es mía">Sí, es mía</MenuItem>
              <MenuItem value="Es de un amigo o familiar">Es de un amigo o familiar</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={styles.question_container}>
          <Grid item xs={8}>
          <Typography>Tipo de mascota</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
            className={styles.select}
            id="petType"
            select
            defaultValue=""
            label="Seleccionar una opción"
            {...register("petType")}
              helperText="Seleccione el tipo de mascota"
            >
              <MenuItem value="" disabled><em>Seleccione</em></MenuItem>
              <MenuItem value={PETTYPE.GATO}>{PETTYPE.GATO}</MenuItem>
              <MenuItem value={PETTYPE.PERRO}>{PETTYPE.PERRO}</MenuItem>
              <MenuItem value={PETTYPE.OTROS}>{PETTYPE.OTROS}</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={styles.question_container}>
          <Grid item xs={8}>
            <Typography>Nombre de la mascota</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              className={styles.select}
              id="petAge"
              label="Ingrese el nombre de la mascota"
              {...register("petName")}
              helperText="Ingrese el nombre que tiene o como quisieras llamarlo"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={styles.question_container}>
          <Grid item xs={8}>
            <Typography>Tamaño de la mascota</Typography>
          </Grid>
          <Grid item xs={4}>
          <TextField
            className={styles.select}
            id="petSize"
            select
            defaultValue=""
            label="Seleccione el tamaño de la mascota"
            {...register("petSize")}
            helperText="Tamaño de la mascota"
            >
              <MenuItem value="" disabled><em>Seleccione</em></MenuItem>
              <MenuItem value="Grande">Grande</MenuItem>
              <MenuItem value="Mediano">Mediano</MenuItem>
              <MenuItem value="Pequeño">Pequeño</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={styles.question_container}>
          <Grid item xs={8}>
            <Typography>Edad de la mascota</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              className={styles.select}
              id="petAge"
              label="Ingrese la edad de la mascota"
              {...register("petAge")}
              helperText="En años y meses. (Ej. 1 año y 2 meses)"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={styles.question_container}>
          <Grid item xs={8}>
            <Typography>Sexo de la mascota</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              className={styles.select}
              id="petSex"
              select
              defaultValue=""
              label="Seleccionar una opción"
              {...register("petSex")}
              helperText="Sexo de la mascota"
            >
              <MenuItem value="" disabled><em>Seleccione</em></MenuItem>
              <MenuItem value="Hembra">Hembra</MenuItem>
              <MenuItem value="Macho">Macho</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={styles.question_container}>
          <Grid item xs={8}>
            <Typography>Imagen de la mascota</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              component="label"
            >
              Seleccionar Imagen
              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                hidden
                onChange={handleImage}
              />
            </Button>
            {
              imageName && (
                <Typography>{imageName}</Typography>
              )
            }
          </Grid>
        </Grid>
        <Grid container spacing={2} className={styles.question_container}>
          <Grid item xs={12} className={styles.container}>
            <TextField
              className={styles.select}
              id="extraDescription"
              label="Agregar una descripción"
              {...register("extraDescription")}
              multiline
              rows={5}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={styles.question_container}>
          <Grid item xs={10} className={styles.button_container}>
            <Button className={styles.submit_button} type="submit">
              Enviar
            </Button>
          </Grid>
        </Grid>
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Poner en adopción una mascota"}
            </DialogTitle>
            <DialogContent className={styles.dialog_container}>
            <Image
              src="/images/huella.png"
              alt="fingerprint"
              width="154.24px"
              height="60px"
              background = "#B224EF"
              transform="rotate(-34.58deg)"
            />
            <DialogContentText id="alert-dialog-description" className={styles.dialog_text}>
                Se ha enviado tu socilitud para publicar una mascota,
                la aprobación se te informará en tu bandeja de notificaciones.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button className={styles.submit_button} autoFocus href={Routes.USERPROFILE} onClick={handleClose}>
                OK!
            </Button>
            </DialogActions>
        </Dialog>
    </Box>
    </>
  );
}
