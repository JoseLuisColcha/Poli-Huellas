import { Grid, Box, Typography } from "@mui/material";
import Pets from "../../../public/images/pets.png";
import Image from "next/image";
import styles from "../../styles/TextGlobal.module.css";

export default function InformationSection() {
  return (
    <>
      <Grid sx={{ p: 6 }}>
        <Grid item xs={12} sm={8}>
          <Typography variant="h3" align="center" sx={{ p: 6 }}>
            ¿Porqué <span className={styles.txtcolor}>adoptar</span> es
            importante?
          </Typography>
          <Typography variant="h6" color="inherit" sx={{ marginLeft: 5 }}>
            text. It has roots in a piece of classical Latin literature from 45
            BC, making it over 2000 years old. Richard McClintock, a Latin
            professor at Hampden-Sydney College in Virginia, looked up one of
            the more obscure Latin words, consectetur, from a Lorem Ipsum
            passage, and going through
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
