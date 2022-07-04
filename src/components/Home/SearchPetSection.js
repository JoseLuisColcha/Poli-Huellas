import { Grid, Box, Button, Typography } from "@mui/material";
import Huella from "../../../public/images/huella.png";
import Image from "next/image";
import Link from "next/link";
import Routes from "src/constants/routes";
import styles from "../../styles/Home.module.css";

export default function SearchPetSection() {
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        sx={{
          backgroundColor: "#FAF1FA",
          p: 6,
        }}
      >
        <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }} sx={{ marginY: 8 }}>
          <Typography variant="h4" sx={{ marginLeft: 5 }}>
            Encuentra un <span className={styles.txtcolor}>amigo</span> de
            Verdad!
          </Typography>
          <Typography variant="h6" color="inherit" sx={{ marginLeft: 5 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            facilis magnam ratione, voluptas excepturi quos quo consequatur
            iusto dignissimos
          </Typography>
          <Link href={Routes.ADOPTIONS} passHref>
            <Button size="large" variant="contained" sx={{ margin: 4 }}>
              Buscar mascotas
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
            <Image src={Huella} width={250} height={150} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
