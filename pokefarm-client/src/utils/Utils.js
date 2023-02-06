import { LOGIN, ROUTES, SESSION } from "../constants/AppConstants";
import axios from "axios";

// No-Operation function
export const NOOP = () => {};

export const handleLogout = (navigate, setToken) => {
  sessionStorage.setItem(SESSION.SESSION_TOKEN, null);
  navigate(ROUTES.LOGIN_IN);
  setToken(SESSION.LOGGED_OUT);
};
