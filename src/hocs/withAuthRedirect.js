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
      if(session?.role === 'admin'){
        router.push(Routes.ADMIN);
        return 'cargando...'
      }
      router.push(location);
    }
    return <WrappedComponent {...props} />;
  };
  return WithAuthRedirect;
}
