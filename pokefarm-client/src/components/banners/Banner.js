import React from "react";
import Logo from "../../assets/pokefarm-logo.png";
import "./styles/banner.scss";

const BASE_STYLE = "header";

const Banner = () => {
  return (
    <img
      className={`${BASE_STYLE}-banner`}
      src={Logo}
      alt="PokeFarm Logo Image"
    />
  );
};
export default Banner;
