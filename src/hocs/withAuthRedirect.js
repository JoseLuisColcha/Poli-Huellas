import { useAuth } from "@/lib/auth";
import Routes from "../constants/routes";
import { useRouter } from "next/router";

export default function withAuthRedirect({
  WrappedComponent,
  expectedAuth,
  location,
}) {
  return (props) => {
    const { user } = useAuth();
    const router = useRouter();

    if (user === null) {
      return "Cargando...";
    }

    const isAuthenticated = !!user;
    const shouldRedirect = expectedAuth !== isAuthenticated;
    if (shouldRedirect) {
      router.push(location || Routes.LOGIN);
      return null;
    }
    return <WrappedComponent {...props} />;
  };
}
