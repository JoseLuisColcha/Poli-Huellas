import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Typography,
  Radio,
} from "@mui/material";
import styles from "@/styles/filterPostsRadioGroup.module.css";

export default function FilterPostsRadioGroup(props) {
  const { setPetSize, setPetSex } = props;
  return (
    <>
      <Typography className={styles.title_text}> Filtrar por:</Typography>
      <FormControl>
        <FormLabel>Sexo</FormLabel>
        <RadioGroup
          aria-label="position"
          name="position"
          defaultValue="todos"
          onChange={(e) => setPetSex(e.target.value)}
        >
          <FormControlLabel value="todos" control={<Radio />} label="Todos" />
          <FormControlLabel value="hembra" control={<Radio />} label="Hembra" />
          <FormControlLabel value="macho" control={<Radio />} label="Macho" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Tamaño</FormLabel>
        <RadioGroup
          aria-label="position"
          name="position"
          defaultValue="Todos"
          onChange={(e) => setPetSize(e.target.value)}
        >
          <FormControlLabel value="todos" control={<Radio />} label="Todos" />
          <FormControlLabel
            value="pequeño"
            control={<Radio />}
            label="Pequeño"
          />
          <FormControlLabel
            value="mediano"
            control={<Radio />}
            label="Mediano"
          />
          <FormControlLabel value="grande" control={<Radio />} label="Grande" />
        </RadioGroup>
      </FormControl>
    </>
  );
}
