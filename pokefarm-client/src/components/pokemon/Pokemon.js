import React, { useState, useEffect } from "react";
import PokemonImage from "./PokemonImage";
import axios from "axios";
import { BASE_URL, END_POINTS } from "../../constants/AppConstants";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import { addPokemon } from "../../utils/Utils";
import { usePokemons } from "../../routes/providers/PokemonProvider";
import { useAuth } from "../../routes/providers/AuthProvider";
import "./styles/pokemon.scss";

const BASE_STYLE = "pokemon";

const handleWorkStatus = (
  pay,
  pokemon,
  pokemons,
  setPokemons,
  user,
  setUser
) => {
  // limit work to ONLY 4 pokemon at a time
  const totalWorking = pokemons.filter(
    (pokemon) => pokemon.isWorking === true
  ).length;

  if (totalWorking >= 4 && pokemon.isWorking === false) {
    return;
  }

  const updatedPokemon = {
    ...pokemon,
    money: 0,
    isWorking: !pokemon.isWorking,
  };
  axios
    .post(`${BASE_URL}/${END_POINTS.UPDATE_USER}`, updatedPokemon)
    .then((response) => {
      setUser({
        ...user,
        money: user.money + pay,
      }); // will change this once DB exists
      setPokemons(addPokemon(updatedPokemon, pokemons));
    })
    .catch((error) => {
      console.error(error);
    });
};

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

const Pokemon = ({
  className,
  onPurchase,
  pokemonObject,
  isAnimated = true,
}) => {
  const { pokemons, setPokemons } = usePokemons();
  const { user, setUser } = useAuth();
  const [pay, setPay] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const { id, name, types, isWorking } = pokemonObject;

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
          <Button
            disabled={disabled}
            variant="text"
            onClick={
              onPurchase
                ? () => {
                    const isBought = onPurchase();
                    setDisabled(isBought);
                  }
                : () =>
                    handleWorkStatus(
                      pay,
                      pokemonObject,
                      pokemons,
                      setPokemons,
                      user,
                      setUser
                    )
            }
          >
            {disabled ? (
              <p>Bought</p>
            ) : (
              <PokemonImage pokemonId={id} isAnimated={isAnimated} />
            )}
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
