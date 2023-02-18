import React from "react";
import PokemonImage from "../images/PokemonImage";
import { SPRITE_SIZE } from "../../constants/AppConstants";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import "./styles/pokemon.css";

const getToolTipTitle = (id, name, types, isWorking) => {
  if (types.length === 2) {
    const type1 = types[0];
    const type2 = types[1];
    return (
      <div>
        <p>{`ID: ${id}`}</p>
        <p>{name}</p>
        <p>{`Type: ${type1}, ${type2}`}</p>
        <p>{`Working: ${isWorking}`}</p>
      </div>
    );
  }
  const type1 = types[0];

  return (
    <div>
      <p>{`ID: ${id}`}</p>
      <p>{name}</p>
      <p>{`Type: ${type1}`}</p>
      <p>{`Working: ${isWorking}`}</p>
    </div>
  );
};

const Pokemon = ({ className, pokemonObject, onClick, isAnimated = true }) => {
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
          <PokemonImage
            pokemonId={id}
            width={SPRITE_SIZE}
            isAnimated={isAnimated}
          />
        </Button>
      </div>
    </Tooltip>
  );
};

export default Pokemon;
