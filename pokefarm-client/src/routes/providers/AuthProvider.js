import React, { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN, ROUTES } from "../../constants/AppConstants";
import { useLocalStorage } from "../hooks/useLocalStorage";
// import User from "../../models/User";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  /**
   * Takes users credentials and post request backend
   * @param {{string, string}} credentials
   */
  const login = (credentials) => {
    axios
      .post(`${LOGIN.BASE_URL}/Login`, credentials)
      .then((response) => {
        const loginResponse = response.data.loginResponse;
        if (loginResponse === LOGIN.SUCCESS) {
          setUser({ userId: "01", username: "admin", pokemons: [] });
          navigate(ROUTES.USER_ACCOUNT);
        }
        return loginResponse; // Login Failure
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    setUser(null);
    navigate(ROUTES.LOGIN_IN);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
