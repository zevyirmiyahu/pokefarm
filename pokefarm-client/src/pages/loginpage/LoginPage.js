import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES, LOGIN, BASE_URL } from "../../constants/AppConstants";
import { useAuth } from "../../routes/providers/AuthProvider";
import axios from "axios";
import Banner from "../../components/banners/Banner";

/**
 * Takes users credentials and post request backend
 * @param {{string, string}} credentials
 */
export const handleLogin = (credentials, navigate, setUser) => {
  axios
    .post(`${BASE_URL}/Login`, credentials)
    .then((response) => {
      const { loginResponse } = response.data;
      if (loginResponse === LOGIN.SUCCESS) {
        const { userId, username, pokemons } = response.data;
        setUser({ userId: userId, username: username, pokemons: pokemons });
        navigate(ROUTES.USER_ACCOUNT);
      }
      return loginResponse; // Login Failure
    })
    .catch((error) => {
      console.log(error);
    });
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ username, password }, navigate, setUser);
  };

  const handleUserChange = (name) => {
    setUsername(name);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  return (
    <div>
      <Banner />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User Name:
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => handleUserChange(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      {/* <InvalidCredentials isInvalidCredentials={isInvalidCredentials} /> */}
      <h3>- or -</h3>
      <h3>Don't have an account?</h3>
      <Link to={`/${ROUTES.SIGNUP}`}>Sign up</Link>
    </div>
  );
};

export default LoginPage;
