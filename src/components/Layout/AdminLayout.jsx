import { Container, Grid } from "@mui/material";
import Navigation from "@/components/Navigation";
import { AdminNav } from "../AdminNav";

export const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNav />
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
