import Navigation from "../components/Navigation";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Head from "next/head";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Poli Huellas</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
