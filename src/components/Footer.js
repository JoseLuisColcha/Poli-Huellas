import * as React from "react";
import style from "../styles/Footer.module.css"

const footer = () => {
  return (
    <footer className={style.foot}>
      <span className={style.text}>
        Designed by José Luis Colcha &reg;
        {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default footer;
