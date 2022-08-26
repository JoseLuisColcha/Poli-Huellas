import React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import Pet from "../../../public/images/pets2.webp";
import Logo from "../../../public/images/logo-polihuella.webp";
import Image from "next/image";
import Link from "next/link";
import Routes from "src/constants/routes";
import { useAuth } from "@/lib/auth";
import styles from "../../styles/homePage.module.css";

export default function MainSection() {
  const { session } = useAuth();

  return (
    <Grid
      sx={{
        backgroundColor: "#FAF1FA",
      }}
      container
      direction="row"
      alignItems="center"
    >
      <Grid item xs={12} sm={6} order={{ xs: 1, sm: 1 }}>
        <Box className={styles.image_logo_container}>
          <Image alt="logo" src={Logo} width={3850} height={1240} />
        </Box>
        <Typography className={styles.text_content}>
          El sitio ideal para encontrar un amigo de compañia y disfrutar bellos
          momentos con él.
        </Typography>
        {!session && (
          <Link href={Routes.REGISTER} passHref>
            <Button className={styles.button_register}>Registrate</Button>
          </Link>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        order={{ xs: 2, sm: 2 }}
        className={styles.image_pet_main_container}
      >
        <Box>
          <Image alt="mascota" src={Pet} width={450} height={350} />
        </Box>
      </Grid>
    </Grid>
  );
}
