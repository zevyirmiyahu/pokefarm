const LOGIN = Object.freeze({
  BASE_URL: "http://localhost:8080",
  SUCCESS: "success",
  FAILURE: "failure",
});

const SESSION = Object.freeze({
  SESSION_TOKEN: "sessionToken",
  TOKEN_FAILURE: "Token_Failure",
  LOGGED_OUT: "Logged_Out",
});

const ROUTES = Object.freeze({
  LOGIN_IN: "/",
  CREATE: "create",
  USER_ACCOUNT: "user-account",
});

export { LOGIN, SESSION, ROUTES };
