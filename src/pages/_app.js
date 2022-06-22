import "@/styles/globals.css";
import { AuthProvider } from "@/lib/auth";
import Navigation from "@/components/Navigation";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Head from "next/head";
import theme from "../styles/theme";

function App({ Component, pageProps}) {
  return (
    <>
      <Head>
        <title>Poli Huellas</title>
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navigation />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
