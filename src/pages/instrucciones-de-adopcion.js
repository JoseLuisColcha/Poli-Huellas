import { Grid, Typography, Stack, Box } from "@mui/material";
import styles from "../styles/instructionsPage.module.css";
import INSTRUCTIONS from "src/constants/instructions";
import NumberOneImage from "../../public/images/number1.webp";
import NumberTwoImage from "../../public/images/number2.webp";
import NumberThreeImage from "../../public/images/number3.webp";
import NumberFourImage from "../../public/images/number4.webp";
import NumberFiveImage from "../../public/images/number5.webp";
import NumberSixImage from "../../public/images/number6.webp";
import Image from "next/image";

export default function Instructions() {
  return (
    <>
      <Stack
        spacing={6}
        sx={{
          backgroundImage: "url(../images/patron-huellas.webp)",
          backgroundRepeat: "no-repeat",
          paddingX: 8,
          paddingBottom: 20,
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} sm={12}>
          <Typography
            className={styles.text_title}
            variant="h4"
            align="center"
            sx={{ pt: 8 }}
          >
            PASOS PARA <span className={styles.text_title_span}> ADOPTAR</span>
          </Typography>
        </Grid>
        <Grid container rowSpacing={13} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid container spacing={3} xs={12} sm={6}>
            <Grid item xs={2}>
              <Image
                alt="mascota"
                src={NumberOneImage}
                width={70}
                height={70}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant="h5"
                color="initial"
                className={styles.text_content_rigth}
              >
                {INSTRUCTIONS.STEP1}
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Image
                alt="mascota"
                src={NumberTwoImage}
                width={70}
                height={70}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant="h5"
                color="initial"
                className={styles.text_content_rigth}
              >
                {INSTRUCTIONS.STEP2}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Image
                alt="mascota"
                src={NumberThreeImage}
                width={70}
                height={70}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant="h5"
                color="initial"
                className={styles.text_content_rigth}
              >
                {INSTRUCTIONS.STEP3}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={3} xs={12} sm={6}>
            <Grid item xs={2}>
              <Image
                alt="mascota"
                src={NumberFourImage}
                width={70}
                height={70}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant="h5"
                color="initial"
                className={styles.text_content_left}
              >
                {INSTRUCTIONS.STEP4}
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Image
                alt="mascota"
                src={NumberFiveImage}
                width={70}
                height={70}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant="h5"
                color="initial"
                className={styles.text_content_left}
              >
                {INSTRUCTIONS.STEP5}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Image
                alt="mascota"
                src={NumberSixImage}
                width={70}
                height={70}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant="h5"
                color="initial"
                className={styles.text_content_left}
              >
                {INSTRUCTIONS.STEP6}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Typography variant="h6" color="initial" textAlign={"center"}>
          <span className={styles.text_title_span}>Nota:</span> Recibirás una
          notificación si tu solicitud de adopción fue{" "}
          <span className={styles.text_title_span}>aceptada</span> o{" "}
          <span className={styles.text_title_span}>denegada</span>.
        </Typography>
      </Stack>
    </>
  );
}
