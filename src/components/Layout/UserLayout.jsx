import { Container, Grid } from "@mui/material";
import Navigation from "@/components/Navigation";

export const UserLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      <Container maxWidth="lg">{children}</Container>
    </>
  );
};
