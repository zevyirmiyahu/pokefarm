const SPRITE_SIZE = 90;
const POKE_API = "https://pokeapi.co/api/v2/pokemon";
const BASE_URL = "http://localhost:8080";

const LOGIN = Object.freeze({
  SUCCESS: 200,
  FAILURE: "failure",
});

const END_POINTS = Object.freeze({
  LOGIN: "login",
  UPDATE_USER: "update-user",
  SELECT_POKEMON: "select-pokemon",
  SAVE_USER: "save-user",
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

export { BASE_URL, LOGIN, END_POINTS, SESSION, ROUTES, SPRITE_SIZE, POKE_API };
