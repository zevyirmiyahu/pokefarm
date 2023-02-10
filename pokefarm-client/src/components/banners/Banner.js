import React from "react";
import banner from "../../assets/pokemon-page-banner.png";
import "./styles/banner.css";

const BASE_STYLE = "header";

const Banner = () => {
  return (
    <img
      className={`${BASE_STYLE}-banner`}
      src={banner}
      alt="Pokemon Banner Image"
    />
  );
};
export default Banner;
