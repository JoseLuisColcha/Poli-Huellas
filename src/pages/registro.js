import * as React from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import styles from "../styles/registerPage.module.css";
import Routes from "src/constants/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import withoutAuth from "@/hocs/withoutAuth";
import { useAuth } from "@/lib/auth";
import RegisterImage from "../../public/images/register-image.webp";
import Image from "next/image";

const schema = yup.object({
  email: yup
    .string("El campo debe ser alfanumérico")
    .email("Ingrese un correo válido")
    .required("Este campo es requerido"),
  name: yup.string().required("Este campo es requerido"),
  lastName: yup.string().required("Este campo es requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteress")
    .required("Este campo es requerido"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Este campo es requerido"),
});

const Register = () => {
  const { singup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await singup(data);
  };

  return (
    <Grid container component="main">
      <Grid item xs={12} sm={12} md={7}>
        <Image alt="mascota" src={RegisterImage} width={2200} height={1945} />
      </Grid>

      <Grid item xs={12} sm={12} md={5} component={Paper}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ m: 5 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="firstName"
                  label="Ingresa tu nombre"
                  autoFocus
                  color="primary"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ingresa tu apellido"
                  name="lastName"
                  color="primary"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors?.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Ingresa tu email"
                  name="email"
                  autoComplete="email"
                  color="primary"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Ingresa tu contraseña"
                  type="password"
                  id="password"
                  color="primary"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Confirmar tu contraseña"
                  type="password"
                  id="passwordConfirmation"
                  color="primary"
                  {...register("passwordConfirmation")}
                  error={!!errors.passwordConfirmation}
                  helperText={errors?.passwordConfirmation?.message}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              className={styles.button_register}
            >
              Registrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={Routes.LOGIN}>
                  <a className={styles.text_link}>
                    Ya tienenes cuenta? Inicia sesión
                  </a>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default withoutAuth(Register);
