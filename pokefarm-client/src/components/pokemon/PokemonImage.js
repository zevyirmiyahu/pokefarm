import React from "react";
import { IMG_WIDTH } from "../../constants/AppConstants";

const PokemonImage = ({ pokemonId, isAnimated }) => {
  return isAnimated ? (
    <img
      src={require(`../../assets/sprites/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`)}
      width={IMG_WIDTH}
    />
  ) : (
    <img
      src={require(`../../assets/sprites/sprites/pokemon/versions/generation-v/black-white/${pokemonId}.png`)}
    />
  );
};

export default PokemonImage;
