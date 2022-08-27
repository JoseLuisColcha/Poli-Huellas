import * as React from "react";
import {
  Avatar,
  Button,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NextLink from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../styles/loginPage.module.css";
import { useForm } from "react-hook-form";
import Routes from "src/constants/routes";
import withoutAuth from "@/hocs/withoutAuth";
import { useAuth } from "@/lib/auth";
import RegisterImage from "../../public/images/login-image.webp";
import Image from "next/image";

const schema = yup.object({
  email: yup
    .string("El campo debe ser alfanumérico")
    .email("Ingrese un correo válido")
    .required("Este campo es requerido"),
  password: yup
    .string("El campo debe ser alfanumérico")
    .required("Este campo es requerido")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const Login = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await login(data);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item xs={false} sm={4} md={7}>
        <Image alt="mascota" src={RegisterImage} width={1500} height={1400} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Ingresa tu email"
              autoComplete="email"
              autoFocus
              color="primary"
              {...register("email")}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Ingresa tu contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              color="primary"
              {...register("password")}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
            <Button type="submit" className={styles.button_start}>
              Iniciar
            </Button>
            <Grid container>
              <Grid item xs>
                <NextLink href={Routes.FORGOT_PASSWORD}>
                  <a a className={styles.text_link}>
                    Olvidaste tu contraseña?
                  </a>
                </NextLink>
              </Grid>
              <Grid item>
                <NextLink href={Routes.REGISTER}>
                  <a>
                    No tienes cuenta?{" "}
                    <span className={styles.text_link}>Crea una</span>
                  </a>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default withoutAuth(Login);
