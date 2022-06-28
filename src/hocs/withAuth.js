import withAuthRedirect from "./withAuthRedirect";
import Routes from "../constants/routes";

export default function withAuth(WrappedComponent, location = Routes.LOGIN) {
  return withAuthRedirect({
    WrappedComponent,
    location, 
    expectedAuth: true,
  });
}
