const SPRITE_SIZE = 90;
const POKE_API = "https://pokeapi.co/api/v2/pokemon";

const LOGIN = Object.freeze({
  BASE_URL: "http://localhost:8080",
  SUCCESS: "success",
  FAILURE: "failure",
});

const END_POINTS = Object.freeze({
  UPDATE_USER: "update-user",
  SELECT_POKEMON: "select-pokemon",
});

const SESSION = Object.freeze({
  SESSION_TOKEN: "sessionToken",
  TOKEN_FAILURE: "Token_Failure",
  LOGGED_OUT: "Logged_Out",
});

const ROUTES = Object.freeze({
  LOGIN_IN: "/",
  SIGNUP: "signup",
  USER_ACCOUNT: "user-account",
});

export { LOGIN, END_POINTS, SESSION, ROUTES, SPRITE_SIZE, POKE_API };
