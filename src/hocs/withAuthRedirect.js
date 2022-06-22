import { useAuth } from "@/lib/auth";
import Loading from "@/components/Loading";
import Routes from "../constants/routes";
import { useRouter } from "next/router";

export default function withAuthRedirect({
  WrappedComponent,
  LoadingComponent = Loading,
  expectedAuth,
  location,
}) {
  return (props) => {
    const { user } = useAuth();
    const router = useRouter();

    if (user === null) {
      return <LoadingComponent />;
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
