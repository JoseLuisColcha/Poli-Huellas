import "@/styles/globals.css";
import { AuthProvider } from "@/lib/auth";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Head from "next/head";
import theme from "../styles/theme";
import { MainLayout } from "@/components/Layout/MainLayout";
import { AlertProvider } from "@/lib/alert";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Poli Huellas</title>
      </Head>
      <AlertProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </ThemeProvider>
        </AuthProvider>
      </AlertProvider>
    </>
  );
}

export default App;
