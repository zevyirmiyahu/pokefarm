import React from "react";
import banner from "../../assets/pokemon-page-banner.png";
import "./styles/loginbanner.css";

const BASE_STYLE = "login-container";

const LoginBanner = () => {
  return (
    <img
      className={`${BASE_STYLE}-container`}
      src={banner}
      alt="Pokemon Banner Image"
    />
  );
};

export default LoginBanner;
