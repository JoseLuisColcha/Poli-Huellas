import {
  createAdoptionRequest,
  updateAdoptionRequestStatus,
} from "@/lib/adoption-requests";
import { useAlert } from "@/lib/alert";
import { useAuth } from "@/lib/auth";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Routes from "src/constants/routes";
import { useAdoptionRequest } from "@/hooks/useAdoptionRequest";
import styles from "../../../styles/AdoptionRequest.module.css";

const ADOPTION_REQUEST_QUESTIONS = [
  {
    question: "¿Por qué desea adoptar una mascota?",
    answer: "",
    error: {
      message: "",
      exists: false,
    },
  },
  {
    question: "¿Quién será el responsable de la mascota?",
    answer: "",
    error: {
      message: "",
      exists: false,
    },
  },
  {
    question: "¿Tiene una vivienda propia o arrienda?",
    answer: "",
    error: {
      message: "",
      exists: false,
    },
  },
  {
    question: "¿Qué tipo de vivienda posee?",
    answer: "",
    error: {
      message: "",
      exists: false,
    },
  },
  {
    question:
      "¿Por qué consideras que eres apropiado para adoptar esta mascota?",
    answer: "",
    error: {
      message: "",
      exists: false,
    },
  },
  {
    question: "¿Su familia esta de acuerdo con la adopción de la mascota?",
    answer: "",
    error: {
      message: "",
      exists: false,
    },
  },
  {
    question: "¿Qué hará si el perro llega a enfermarse?",
    answer: "",
    error: {
      message: "",
      exists: false,
    },
  },
  {
    question: "¿Ha cambiado de domicilio en los últimos años?",
    answer: "",
    error: {
      message: "",
      exists: false,
    },
  },
  {
    question:
      "En caso de convivir con niños, ¿Ellos saben cómo cuidar a la mascota?",
    answer: "",
    error: {
      message: "",
      exists: false,
    },
  },
  {
    question: "Usted o alguno de sus convivientes tiene alguna alergia?",
    answer: "",
    error: {
      message: "",
      exists: false,
    },
  },
  {
    question: "Dispone de tiempo para invertir en la mascota",
    answer: "",
    error: {
      message: "",
      exists: false,
    },
  },
  {
    question: "Si llegara a viajar, ¿Con quién quedaría el perro?",
    answer: "",
    error: {
      message: "",
      exists: false,
    },
  },
  {
    question: "¿Es la primera mascota que ha adoptado en su vida?",
    answer: "",
    error: {
      message: "",
      exists: false,
    },
  },
  {
    question: "¿En su hogar convive con otras mascotas?",
    answer: "",
    error: {
      message: "",
      exists: false,
    },
  },
];

function AdoptionRequest() {
  const [questions, setQuestions] = useState(ADOPTION_REQUEST_QUESTIONS);
  const { session } = useAuth();
  const { query, push } = useRouter();
  const { userAdoptionRequestByPostId } = useAdoptionRequest({
    postId: query.id,
    userId: query?.userId,
  });
  const { addAlert } = useAlert();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (userAdoptionRequestByPostId)
      setQuestions(userAdoptionRequestByPostId?.formData);
  }, [userAdoptionRequestByPostId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasErrors(questions)) return;
    const newQuestions = questions.map(({ error: _, ...rest }) => ({
      ...rest,
    }));
    try {
      await createAdoptionRequest({
        userId: session.uid,
        postId: query.id,
        formData: newQuestions,
      });
      setOpenDialog(true);
      setQuestions(ADOPTION_REQUEST_QUESTIONS);
    } catch (e) {
      addAlert({
        text: "Error al enviar la solicitud",
        severity: "error",
        duration: 6000,
      });
      console.error(e);
    }
  };

  const handleOnChange = (e, index) => {
    const { value } = e.target;
    const newQuestions = [...questions]; // check this out bacause I am mutating the state since I am not doing a deep copy
    newQuestions[index].answer = value;
    newQuestions[index].error.exists = false;
    setQuestions(newQuestions);
  };

  const hasErrors = (questions) => {
    const newQuestions = questions.map(({ answer, ...rest }) =>
      !answer
        ? {
            ...rest,
            answer,
            error: { message: "Este campo es obligatorio", exists: true },
          }
        : {
            ...rest,
            answer,
          }
    );
    setQuestions(newQuestions);
    return newQuestions.some(({ error: { exists } }) => exists);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    push(Routes.USERPROFILE(session.uid));
  };

  const updateAdoptionReqStatus = async (status) => {
    try {
      await updateAdoptionRequestStatus({
        status,
        id: userAdoptionRequestByPostId?.id,
      });
      addAlert({
        text: "Solicitud de adopción actualizada",
        severity: "success",
        duration: 6000,
      });
      push(`/post/${query.id}`)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Container>
        <Image
          src="/images/adoption-request-dog.jpg"
          alt="cover"
          width="1080px"
          height="450px"
        />
      </Container>
      <Container
        sx={{ padding: "1rem", display: "flex", justifyContent: "center" }}
      >
        <Stack direction="row" spacing={1}>
          <Image
            src="/images/huella.png"
            alt="fingerprint"
            width="60px"
            height="24px"
          />
          <Typography>
            Por favor, complete el presente formulario si esta de acuerdo en
            adoptar y cuidar una mascota.
          </Typography>
        </Stack>
      </Container>
      <Box
        className={styles.form_container}
        component="form"
        onSubmit={handleSubmit}
      >
        {questions.map((questionGroup, index) => (
          <Grid
            container
            className={styles.question_container}
            key={questionGroup.question}
          >
            <Grid
              item
              xs={12}
              md={8}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography>{questionGroup.question}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <TextField
                className={styles.select}
                id={`question_${index}`}
                label="Escribe aquí tu respuesta"
                value={questionGroup.answer}
                helperText={
                  questionGroup?.error?.exists && questionGroup?.error?.message
                }
                error={questionGroup?.error?.exists}
                onChange={(e) => handleOnChange(e, index)}
                disabled={query?.userId}
              />
            </Grid>
          </Grid>
        ))}
        <Grid
          container
          sx={{ justifyContent: { xs: "center", md: "flex-end" }, gap: "1rem" }}
        >
          {query?.userId ? (
            <>
              <Button
                className={styles.submit_button}
                type="button"
                id="aceptado"
                onClick={({ target }) => updateAdoptionReqStatus(target.id)}
                disabled={
                  userAdoptionRequestByPostId?.status === "aceptado" ||
                  userAdoptionRequestByPostId?.status === "rechazado"
                }
              >
                Aceptar
              </Button>
              <Button
                className={styles.reject_button}
                type="button"
                id="rechazado"
                onClick={({ target }) => updateAdoptionReqStatus(target.id)}
                disabled={
                  userAdoptionRequestByPostId?.status === "aceptado" ||
                  userAdoptionRequestByPostId?.status === "rechazado"
                }
              >
                Denegar
              </Button>
            </>
          ) : (
            <Button className={styles.submit_button} type="submit">
              Enviar
            </Button>
          )}
        </Grid>
      </Box>
      <Dialog open={openDialog}>
        <DialogTitle id="alert-dialog-title">
          {"Poner en adopción una mascota"}
        </DialogTitle>
        <DialogContent className={styles.dialog_container}>
          <Image
            src="/images/huella.png"
            alt="fingerprint"
            width="154.24px"
            height="60px"
            background="#B224EF"
            transform="rotate(-34.58deg)"
          />
          <DialogContentText
            id="alert-dialog-description"
            className={styles.dialog_text}
          >
            Se ha enviado tu socilitud para publicar una mascota, la aprobación
            se te informará en tu bandeja de notificaciones.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className={styles.submit_button}
            autoFocus
            onClick={handleCloseDialog}
          >
            OK!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AdoptionRequest;
