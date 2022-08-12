import * as React from "react";
import styles from "../styles/footer.module.css";
import { Typography } from "@mui/material";

const footer = () => {
  return (
    <footer className={styles.footer_container}>
      <Typography className={styles.text_title}>
        POLI <span className={styles.text_span}>HUELLAS</span>
      </Typography>
      <span className={styles.text_content}>
        Diseñado y desarrollado por José Luis Colcha &reg;
        {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default footer;
