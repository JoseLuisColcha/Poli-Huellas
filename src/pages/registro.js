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
import styles from "../styles/textglobal.module.css";
import Routes from "src/constants/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import withoutAuth from "@/hocs/withoutAuth";
import { useAuth } from "@/lib/auth";

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
    console.log("formData", data);
    try {
      await singup(data);
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
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(http://localhost:3000/images/pet14.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
                  color="secondary"
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
                  color="secondary"
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
                  color="secondary"
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
                  color="secondary"
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
                  color="secondary"
                  {...register("passwordConfirmation")}
                  error={!!errors.passwordConfirmation}
                  helperText={errors?.passwordConfirmation?.message}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              Registrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={Routes.LOGIN}>
                  <a className={styles.tx}>Ya tienenes cuenta? Inicia sesión</a>
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
