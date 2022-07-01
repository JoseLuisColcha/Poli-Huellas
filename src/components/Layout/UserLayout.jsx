import { Container, Grid } from "@mui/material";
import Navigation from "@/components/Navigation";

export const UserLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
