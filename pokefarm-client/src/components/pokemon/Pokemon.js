import React from "react";
import PokemonImage from "../images/PokemonImage";
import { SPRITE_SIZE } from "../../constants/AppConstants";
import "./styles/pokemon.css";

const getTypes = (data) => {
  return data?.types?.map((t) => (
    <p className="text" key={t?.type?.name}>{`Type: ${t?.type?.name}`}</p>
  ));
};

const Pokemon = ({ pokemonObject }) => {
  const { id, name, types, isWorking } = pokemonObject;
  return (
    <div className="container">
      <p className="header">{name}</p>
      {getTypes(types)}
      <p className="text">{`Working: ${isWorking}`}</p>
      <PokemonImage pokemonId={id} width={SPRITE_SIZE} />
    </div>
  );
};

export default Pokemon;
