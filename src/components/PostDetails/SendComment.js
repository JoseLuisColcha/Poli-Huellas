import { useAuth } from "@/lib/auth";
import React, { useEffect } from "react";
import { Box, FormControl, OutlinedInput, Button } from "@mui/material";
import styles from "../../styles/comments.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { addComment } from "@/lib/comments";
import Routes from "../../constants/routes";
import { useRouter } from "next/router";
import { createNotification } from "@/lib/notifications";
import NOTIFICATIONS from "src/constants/notifications";
const schema = yup.object({
  comment: yup
    .string("El campo debe ser alfanumérico")
    .required("Este campo es requerido"),
});

function SendComment(props) {
  const { postId, ownerId } = props;
  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { comment: "" },
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    const { comment } = data;
    if (!currentUser) return router.push(Routes.LOGIN);
    try {
      await addComment(comment, currentUser.uid, postId);
      if (currentUser.uid !== ownerId) {
        await createNotification(
          ownerId,
          `${currentUser?.displayName} ${NOTIFICATIONS.COMMENTED}`
        );
      }
      reset({ comment: "" });
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

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ comment: "" });
    }
  }, [formState, reset]);

  const cancel = () => {
    reset({ comment: "" });
  };

  return (
    <>
      <Box
        className={styles.message_input}
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl sx={{ width: "100%" }}>
          <OutlinedInput
            {...register("comment")}
            error={!!errors.comment}
            placeholder="Escribe aquí tu comentario"
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            alignItems: "right",
            justifyContent: "right",
            paddingTop: "10px",
          }}
        >
          <Button className={styles.submit_button} type="submit">
            Enviar
          </Button>
          <Button className={styles.cancel_button} onClick={cancel}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default SendComment;
