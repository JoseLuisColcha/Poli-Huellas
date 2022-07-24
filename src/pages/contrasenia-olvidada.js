import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { useAuth } from "@/lib/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import withoutAuth from "@/hocs/withoutAuth";
import Image from "next/image";
import styles from "../styles/ForgotPassword.module.css";
import Routes from "src/constants/routes";
import NextLink from "next/link";
import ForgotPasswInfoModal from "@/components/Modals/ForgotPasswInfoModal";

const schema = yup.object({
  email: yup
    .string("El campo debe ser alfanumérico")
    .email("Ingrese un correo válido")
    .required("Este campo es requerido"),
});

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    await resetPassword(data);
    setOpen(true);
  };

  return (
    <Grid container direction="row" alignItems="center" spacing={8}>
      <Grid item xs={12} sm={12} md={6}>
        <Grid item xs={12} className={styles.item_container}>
          <Typography variant="h4" align="center">
            ¿Olvidaste tu
            <span className={styles.information_text}> contraseña</span>?
          </Typography>
          <Typography
            variant="subtitle1"
            align="justify"
            className={styles.item_container}
          >
            <span className={styles.information_text}></span>
            No hay problema. Simplemente haznos saber tu dirección de correo
            electrónico y te enviaremos un enlace de restablecimiento de
            contraseña que te permitirá elegir una nueva.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid
            tem
            xs={12}
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            align="center"
            className={styles.item_container}
          >
            <TextField
              id="email"
              label="Ingrese su correo electrónico"
              {...register("email")}
              error={!!errors.email}
              helperText={errors?.email?.message}
              className={styles.select}
            />
            <Grid item xs={12} align="center" className={styles.item_container}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                className={styles.button_container}
              >
                Solicitar enlace
              </Button>
            </Grid>
            <ForgotPasswInfoModal open={open} handleClose={handleClose} />
          </Grid>
        </Grid>
        <Grid item xs={12} className={styles.item_container}>
          <Grid item xs={12}>
            <Typography align="center">
              Ya tienes cuenta?
              <NextLink href={Routes.LOGIN} passHref>
                <MuiLink> Inicia sesión</MuiLink>
              </NextLink>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        justifyContent="center"
      >
        <Image
          src="/images/pet8.jpg"
          alt="cover"
          width="1024px"
          height="768px"
        />
      </Grid>
    </Grid>
  );
};

export default withoutAuth(ResetPassword);
