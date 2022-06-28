import "@/styles/globals.css";
import { AuthProvider } from "@/lib/auth";
import Navigation from "@/components/Navigation";
import { CssBaseline, ThemeProvider, Container,Grid } from "@mui/material";
import Head from "next/head";
import theme from "../styles/theme";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Poli Huellas</title>
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navigation />
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Component {...pageProps} />
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
