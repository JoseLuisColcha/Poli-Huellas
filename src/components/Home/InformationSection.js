import { Grid, Box, Typography } from "@mui/material";
import Pets from "../../../public/images/pets.webp";
import Image from "next/image";
import styles from "../../styles/homePage.module.css";

export default function InformationSection() {
  return (
    <>
      <Grid>
        <Grid item xs={12} sm={8}>
          <Typography className={styles.text_title_information}>
            ¿Porqué <span className={styles.text_title_span}>adoptar</span> es
            importante?
          </Typography>
          <Typography className={styles.text_information}>
            Un animal doméstico puede ser adoptado de un albergue o de un hogar
            de paso y en ambos casos, al adoptar, estamos salvando la vida de la
            mascota abandonada y de un nuevo animal doméstico en estado de
            calle.
          </Typography>
        </Grid>
        <Grid container item xs={12} sm={12} justifyContent="center">
          <Box>
            <Image src={Pets} width={400} height={300} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
