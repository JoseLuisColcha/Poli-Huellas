import { useAuth } from "@/lib/auth";
import Routes from "../constants/routes";
import { useRouter } from "next/router";
import { Backdrop, CircularProgress } from "@mui/material";

export default function withAuthRedirect({
  WrappedComponent,
  expectedAuth,
  location,
}) {
  const WithAuthRedirect = (props) => {
    const { session, loading } = useAuth();
    const router = useRouter();

    if (loading) {
      return (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      );
    }

    const isAuthenticated = !!session;
    const shouldRedirect = expectedAuth !== isAuthenticated;

    if (shouldRedirect) {
      if (session?.role === "admin") {
        router.push(Routes.ADMIN);
        return "cargando...";
      }
      router.push(location);
    }
    return <WrappedComponent {...props} />;
  };
  return WithAuthRedirect;
}
