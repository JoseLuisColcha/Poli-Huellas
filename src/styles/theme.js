import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    h3: {
      marginBottom: "12px",
    },
  },
  palette: {
    type: "light",
    primary: {
      main: "#651fff",
    },
    secondary: {
      main: "#651fff",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#f9f9f9",
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        // backgroundColor: "#ccc",
        width: "100%",
      },
    },
  },
  props: {
    MuiTextField: {
      variant: "outlined",
    },
  },
});

export default theme;
