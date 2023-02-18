import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/providers/AuthProvider";
import { BASE_URL, ROUTES } from "../../constants/AppConstants";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import "./styles/createaccountpage.css";

const BASE_STYLE = "create-account-page";

/**
 * Takes users credentials and post request backend
 * @param {{string, string}} credentials
 */
const handleCreateUser = (credentials, navigate, setUser) => {
  axios
    .post(`${BASE_URL}/create`, credentials)
    .then((response) => {
      // const { loginResponse } = response.data;
      const { userId, username, email, pokemons } = response.data;
      console.log(response.data);
      // const { userId, username, pokemons } = response.data;
      setUser({ ...credentials });
      // navigate(ROUTES.LOGIN_IN);
      navigate(`/${ROUTES.USER_ACCOUNT}`);
    })
    .catch((error) => {
      console.log(error);
    });
};

const createUserCredentials = (credentials, key, value) => {
  return { ...credentials, [key]: value };
};

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const userNameRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const emailRef = useRef("");

  // holds user state data
  const [credentials, setCredentials] = useState({});
  const [isError, setIsError] = useState(false);

  const validatePassword = () => {
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setIsError(true);
    } else if (!isError) {
      setIsError(false);
    }
  };

  const CreateAccountForm = () => {
    return (
      <Box
        className={`${BASE_STYLE}-form-container`}
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
            onBlur={(e) => {
              createUserCredentials();
            }}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="filled"
            inputRef={passwordRef}
          />
        </div>
        <div>
          <TextField
            error={isError}
            id="confirm-password"
            label="Confirm Password"
            type="password"
            variant="filled"
            helperText={isError ? "Passwords don't match" : ""}
            inputRef={confirmPasswordRef}
            onBlur={(e) => {
              validatePassword();
            }}
          />
        </div>
        <div>
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="filled"
            inputRef={emailRef}
          />
        </div>
        <Stack
          id="create-account-page-button-stack"
          spacing={2}
          direction="row"
        >
          <Button
            variant="text"
            onClick={() => {
              navigate(`${ROUTES.LOGIN_IN}`);
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              validatePassword();
              handleCreateUser(
                {
                  username: userNameRef,
                  password: passwordRef,
                  email: emailRef,
                  pokemons: [],
                },
                navigate,
                setUser
              );
            }}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    );
  };

  return (
    <div>
      <CreateAccountForm />
    </div>
  );
};

export default CreateAccountPage;
