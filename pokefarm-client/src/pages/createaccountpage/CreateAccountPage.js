import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/providers/AuthProvider";
import { BASE_URL, ROUTES } from "../../constants/AppConstants";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import UserObject from "../../objects/UserObject";
import PokemonObject from "../../objects/PokemonObject";
import { usePokemons } from "../../routes/providers/PokemonProvider";
import "./styles/createaccountpage.scss";

const BASE_STYLE = "create-account-page";

/**
 * Takes users credentials and post request to backend
 * @param {{string, string}} credentials
 */
const handleCreateUser = (credentials, navigate, setUser, setPokemons) => {
  axios
    .post(`${BASE_URL}/create`, credentials)
    .then((response) => {
      const { userId, username, password, email, pokemons } = response.data;
      const userObject = new UserObject(userId, username, password, email, 0);
      setUser(userObject);
      setPokemons(buildPokemons(pokemons));
      navigate(`/${ROUTES.USER_ACCOUNT}`);
    })
    .catch((error) => {
      console.error(error);
    });
};

// unit test this
const buildPokemons = (pokemons) => {
  return pokemons.map((pokemon) => {
    const pokemonObject = new PokemonObject(
      pokemon.id,
      pokemon.name,
      pokemon.types,
      pokemon.isWorking
    );
    return pokemonObject;
  });
};

const createUserCredentials = (credentials, key, value) => {
  return { ...credentials, [key]: value };
};

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { setPokemons } = usePokemons();
  const userNameRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const emailRef = useRef("");
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
          sx={{ display: "table", margin: "auto" }}
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
                  username: userNameRef.current.value,
                  password: passwordRef.current.value,
                  email: emailRef.current.value,
                  pokemons: [],
                },
                navigate,
                setUser,
                setPokemons
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

CreateAccountPage.propTypes = {};

export default CreateAccountPage;
