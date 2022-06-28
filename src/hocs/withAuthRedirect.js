import { useAuth } from "@/lib/auth";
import Routes from "../constants/routes";
import { useRouter } from "next/router";

export default function withAuthRedirect({
  WrappedComponent,
  expectedAuth,
  location,
}) {
  const WithAuthRedirect = (props) => {
    const { session, loading } = useAuth();
    const router = useRouter();

    if (loading) {
      return "Cargando...";
    }

    const isAuthenticated = !!session;
    const shouldRedirect = expectedAuth !== isAuthenticated;
    if (shouldRedirect) {
      router.push(location || Routes.LOGIN);
      return "Cargando...";
    }
    return <WrappedComponent {...props} />;
  };
  return WithAuthRedirect;
}
