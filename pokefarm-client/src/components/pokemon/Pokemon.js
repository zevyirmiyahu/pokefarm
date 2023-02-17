import React from "react";
import PokemonImage from "../images/PokemonImage";
import { SPRITE_SIZE } from "../../constants/AppConstants";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import "./styles/pokemon.css";

const getToolTipTitle = (id, name, data, isWorking) => {
  if (data.length === 2) {
    const type1 = data[0].type.name;
    const type2 = data[1].type.name;
    return (
      <div>
        <p>{`ID: ${id}`}</p>
        <p>{name}</p>
        <p>{`Type: ${type1}, ${type2}`}</p>
        <p>{`Working: ${isWorking}`}</p>
      </div>
    );
  }
  const type1 = data[0].type.name;

  return (
    <div>
      <p>{`ID: ${id}`}</p>
      <p>{name}</p>
      <p>{`Type: ${type1}`}</p>
      <p>{`Working: ${isWorking}`}</p>
    </div>
  );
};

const Pokemon = ({ className, pokemonObject, onClick }) => {
  const { id, name, types, isWorking } = pokemonObject;

  return (
    <Tooltip
      className={className}
      title={getToolTipTitle(id, name, types, isWorking)}
      TransitionComponent={Zoom}
      placement="top"
      arrow
    >
      <div>
        <Button variant="text" onClick={onClick}>
          <PokemonImage pokemonId={id} width={SPRITE_SIZE} />
        </Button>
      </div>
    </Tooltip>
  );
};

export default Pokemon;
