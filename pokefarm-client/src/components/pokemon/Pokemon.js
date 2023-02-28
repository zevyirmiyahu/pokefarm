import React, { useState, useEffect } from "react";
import PokemonImage from "./PokemonImage";
import { SPRITE_SIZE } from "../../constants/AppConstants";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import "./styles/pokemon.scss";

const BASE_STYLE = "pokemon";

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
  const [pay, setPay] = useState(null);

  useEffect(() => {
    if (isWorking) {
      if (pay < 10000) {
        const timeId = setTimeout(() => {
          setPay(pay + 1);
        }, 1000);
        return () => clearTimeout(timeId);
      }
    }
  }, [pay]);

  return (
    <div className={className}>
      <Tooltip
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
      {isWorking ? (
        <p className={`${BASE_STYLE}-payment`}>Payment: {pay ? pay : 0} ₱</p>
      ) : null}
    </div>
  );
};

export default Pokemon;
