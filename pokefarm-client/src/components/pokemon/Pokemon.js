import React, { useState, useEffect } from "react";
import PokemonImage from "../images/PokemonImage";
import { getPokemonData } from "../../apis/PokemonAPI";
import "./styles/pokemon.css";
import { SPRITE_SIZE } from "../../constants/AppConstants";

const getTypes = (data) => {
  return data?.types?.map((t) => (
    <p className="text" key={t?.type?.name}>{`Type: ${t?.type?.name}`}</p>
  ));
};

/**
 * Names are all lowercase, so this function capitalizes first letter
 * @param {string} name
 * @returns
 */
const formatName = (name) => {
  console.log(name);
  const firstLetter = name.substring(0, 1).toUpperCase();
  return firstLetter + name.substring(1, name.length);
};

/**
 * Pokemon def:
 * Name(string) - pokemon's name
 * Types(string) - pokemon's type (grass, water, etc.)
 * Working(boolean) - is pokemon currently working
 *
 * @param {number} pokemonId
 * @returns
 */
const Pokemon = ({ pokemonId }) => {
  const [data, setData] = useState({isLoading: true});

  useEffect(() => {
    getPokemonData(pokemonId, setData);
  }, []);

  return data.isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="container">
      <p className="header">{formatName(data.name)}</p>
      {getTypes(data)}
      <p className="text">Working: No</p>
      <PokemonImage pokemonId={pokemonId} width={SPRITE_SIZE} />
    </div>
  );
};

export default Pokemon;
