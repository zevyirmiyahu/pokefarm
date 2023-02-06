import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/AppConstants";
import AuthContext from "../../routes/providers/AuthProvider";
import { useAuth } from "";

// const InvalidCredentials = () => {
//   if (isInvalidCredentials) {
//     return (
//       <p style={{ color: "red" }}>
//         Invalid Username OR Password. Please try again.
//       </p>
//     );
//   }
// };

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  const handleUserChange = (name) => {
    setUsername(name);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  return (
    <AuthContext.Consumer>
      <div>
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
        <Link to={`/${ROUTES.CREATE}`}>Sign up</Link>
      </div>
    </AuthContext.Consumer>
  );
};

export default LoginPage;
