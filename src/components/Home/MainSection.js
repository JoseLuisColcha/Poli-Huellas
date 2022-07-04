import React from "react";
import { Grid, Box, Button, Typography, Paper } from "@mui/material";
import Pet from "../../../public/images/pets2.png";
import Logo from "../../../public/images/polihuella.png";
import Image from "next/image";
import Link from "next/link";
import Routes from "src/constants/routes";

export default function MainSection() {
  return (
    <Grid
      sx={{
        backgroundColor: "#FAF1FA",
      }}
      container
      direction="row"
      alignItems="center"
    >
      <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }}>
        <Box>
          <Image src={Logo} width={600} height={350} />
        </Box>
        <Typography variant="h5" color="inherit" sx={{ marginLeft: 5 }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta,
          dicta!
        </Typography>
        <Link href={Routes.REGISTER} passHref>
          <Button size="large" variant="contained" sx={{ margin: 5 }}>
            Registrate
          </Button>
        </Link>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={6}
        justifyContent="center"
        order={{ xs: 1, sm: 2 }}
      >
        <Box>
          <Image src={Pet} width={450} height={350} />
        </Box>
      </Grid>
    </Grid>
  );
}
