import React from "react";

const PokemonImage = ({ pokemonId, width }) => {
  return (
    <img
      src={require(`../../assets/sprites/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`)}
      width={width}
    />
  );
};

export default PokemonImage;
