import { Container } from "@mui/material";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const UserLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      <Container>{children}</Container>
      <Footer />;
    </>
  );
};
