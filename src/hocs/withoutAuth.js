import withAuthRedirect from "./withAuthRedirect";
import Routes from "../constants/routes";

export default function withoutAuth(WrappedComponent, location = Routes.HOME) {

  return withAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: false,
  });
}
