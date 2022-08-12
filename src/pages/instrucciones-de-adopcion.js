import { Grid, Typography, Stack } from "@mui/material";
import styles from "../styles/instructionsPage.module.css";
import INSTRUCTIONS from "src/constants/instructions";

const items = [
  { step: INSTRUCTIONS.STEP1 },
  { step: INSTRUCTIONS.STEP2 },
  { step: INSTRUCTIONS.STEP3 },
  { step: INSTRUCTIONS.STEP4 },
  { step: INSTRUCTIONS.STEP5 },
  { step: INSTRUCTIONS.STEP6 },
  { step: INSTRUCTIONS.STEP7 },
];

export default function Instructions() {
  return (
    <>
      <Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4" align="center" sx={{ p: 4 }}>
            ¿Cómo <span className={styles.text_title_span}>adoptar</span> una mascota?
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            p: 6,
            backgroundColor: "#FAF1FA",
          }}
        >
          {items.map((item, index) => (
            <Stack sx={{ p: 2 }} direction="row" spacing={1} key={item.step}>
              <Typography variant="h6">
                <span className={styles.txtcolor}>{index + 1}. </span>
                {item.step}
              </Typography>
            </Stack>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
