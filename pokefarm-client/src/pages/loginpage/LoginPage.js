import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ROUTES,
  LOGIN,
  BASE_URL,
  END_POINTS,
} from "../../constants/AppConstants";
import { useAuth } from "../../routes/providers/AuthProvider";
import axios from "axios";
import Banner from "../../components/banners/Banner";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import UserObject from "../../objects/UserObject";
import "./styles/loginpage.scss";

const BASE_STYLE = "login-page";

/**
 * Takes users credentials and post request backend
 * @param {{string, string}} credentials
 */
export const handleLogin = (credentials, navigate, setUser) => {
  axios
    .post(`${BASE_URL}/${END_POINTS.LOGIN}`, credentials)
    .then((response) => {
      const { userId, username, password, email, money, pokemons } =
        response.data;
      if (response.status === LOGIN.SUCCESS) {
        const userObject = new UserObject(
          userId,
          username,
          password,
          email,
          money,
          pokemons
        );
        setUser(userObject);
        navigate(ROUTES.USER_ACCOUNT);
      } else {
        throw new Error("Login failed with status: " + response.status);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const userNameRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = (e) => {
    const username = userNameRef.current.value;
    const password = passwordRef.current.value;
    e.preventDefault();
    handleLogin({ username, password }, navigate, setUser);
  };

  const SignInForm = () => {
    return (
      <Box
        className={`${BASE_STYLE}-signin-container`}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ marginLeft: "auto" }}>
          <TextField
            id="username"
            label="Username"
            variant="filled"
            inputRef={userNameRef}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
            inputRef={passwordRef}
          />
        </div>
        <Stack id="login-page-button-stack" spacing={2} direction="row">
          <Button
            variant="text"
            onClick={() => {
              navigate(`/${ROUTES.SIGNUP}`);
            }}
          >
            Sign Up
          </Button>
          <Button variant="contained" onClick={(e) => handleSubmit(e)}>
            Submit
          </Button>
        </Stack>
      </Box>
    );
  };

  return (
    <>
      <Banner />
      <SignInForm />
    </>
  );
};

export default LoginPage;
