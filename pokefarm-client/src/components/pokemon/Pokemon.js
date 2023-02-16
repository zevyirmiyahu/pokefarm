import React, { useState, useEffect } from "react";
import PokemonImage from "../images/PokemonImage";
import { SPRITE_SIZE } from "../../constants/AppConstants";
import "./styles/pokemon.css";

// const getTypes = (data) => {
//   return <p>hello</p>;
//   // return data?.types?.map((t) => (
//   //   <p className="text" key={t?.type?.name}>{`Type: ${t?.type?.name}`}</p>
//   // ));
// };

const getTypes = (data) => {
  if (data.length === 2) {
    const type1 = data[0].type.name;
    const type2 = data[1].type.name;
    return (
      <div>
        <p>{`Type: ${type1}, ${type2}`}</p>
      </div>
    );
  }
  const type1 = data[0].type.name;

  return <p>{`Type: ${type1}`}</p>;
};

const Pokemon = ({ pokemonObject }) => {
  const { id, name, types, isWorking } = pokemonObject;

  // const typeList = getTypes(types);
  // useEffect(() => {
  //   console.log(getTypes(types));
  // }, [types]);

  return (
    // <div className="container">
    //   <p className="header">{name}</p>
    //   {getTypes(types)}
    //   <p className="text">{`Working: ${isWorking}`}</p>
    //   <PokemonImage pokemonId={id} width={SPRITE_SIZE} />
    // </div>

    <div className="tooltip">
      <p className="tooltiptext">
        {`ID: ${id}`}
        <br />
        {name}
        {getTypes(types)}
        {`Working: ${isWorking}`}
      </p>
      <PokemonImage pokemonId={id} width={SPRITE_SIZE} />
    </div>
  );
};

export default Pokemon;
