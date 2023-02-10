import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/providers/AuthProvider";
import { BASE_URL, ROUTES } from "../../constants/AppConstants";
import axios from "axios";

/**
 * Takes users credentials and post request backend
 * @param {{string, string}} credentials
 */
const handleCreateUser = (credentials, navigate, setUser) => {
  axios
    .post(`${BASE_URL}/create`, credentials)
    .then((response) => {
      // const { loginResponse } = response.data;

      console.log(response.data);
      // const { userId, username, pokemons } = response.data;
      setUser({ ...credentials });
      navigate(ROUTES.USER_ACCOUNT);

      return {}; // Login Failure
    })
    .catch((error) => {
      console.log(error);
    });
};

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <h1>Create Account</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateUser(
            { username, password, email, pokemons: [] },
            navigate,
            setUser
          );
        }}
      >
        <label>User Name:</label>
        <br />
        <input
          type="text"
          id="username"
          size="32"
          maxLength="64"
          required
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br />

        <label>Password:</label>
        <br />
        <input
          type="password"
          id="password"
          size="32"
          maxLength="64"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />

        <label>Confirm Password:</label>
        <br />
        <input
          type="password"
          id="confirm-password"
          size="32"
          maxLength="64"
          required
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <br />

        <label>Email:</label>
        <br />
        <input
          type="email"
          id="email"
          size="32"
          maxLength="64"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />

        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default CreateAccountPage;
