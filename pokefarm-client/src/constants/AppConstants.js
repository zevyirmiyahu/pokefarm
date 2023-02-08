const LOGIN = Object.freeze({
  BASE_URL: "http://localhost:8080",
  SUCCESS: "success",
  FAILURE: "failure",
});

const END_POINTS = Object.freeze({
  SELECT_POKEMON: "select-pokemon",
});

const SESSION = Object.freeze({
  SESSION_TOKEN: "sessionToken",
  TOKEN_FAILURE: "Token_Failure",
  LOGGED_OUT: "Logged_Out",
});

const SPRITE_SIZE = 90;

const ROUTES = Object.freeze({
  LOGIN_IN: "/",
  SIGNUP: "signup",
  USER_ACCOUNT: "user-account",
});

export { LOGIN, END_POINTS, SESSION, ROUTES, SPRITE_SIZE };
