import { Container, Grid } from "@mui/material";
import Navigation from "@/components/Navigation";
import { AdminNav } from "../AdminNav";

export const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNav />
      <Container maxWidth="lg">{children}</Container>
    </>
  );
};
