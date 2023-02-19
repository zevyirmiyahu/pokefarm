import React from "react";

const PokemonImage = ({ pokemonId, width, isAnimated }) => {
  return isAnimated ? (
    <img
      src={require(`../../assets/sprites/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`)}
      width={width}
    />
  ) : (
    <img
      src={require(`../../assets/sprites/sprites/pokemon/versions/generation-v/black-white/${pokemonId}.png`)}
      width={width}
    />
  );
};

export default PokemonImage;
