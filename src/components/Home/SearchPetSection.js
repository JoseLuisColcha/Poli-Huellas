import { Grid, Box, Button, Typography } from "@mui/material";
import Huella from "../../../public/images/huella.webp";
import Image from "next/image";
import Link from "next/link";
import Routes from "src/constants/routes";
import styles from "../../styles/homePage.module.css";

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
        <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }} >
          <Typography className={styles.text_title_search}>
            Encuentra un <span className={styles.text_title_span}>amigo</span> de
            Verdad!
          </Typography>
          <Typography className={styles.text_content_search}>
            Está comprobado que tener una mascota en tu hogar mejora tu salud y
            humor.
          </Typography>
          <Link href={Routes.ADOPTIONS} passHref>
            <Button className={styles.button_search}>
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
