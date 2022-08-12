import { Container} from "@mui/material";
import { AdminNav } from "../AdminNav";
import Footer from "@/components/Footer";

export const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNav />
      <Container maxWidth="lg">{children}</Container>
      <Footer />
    </>
  );
};
