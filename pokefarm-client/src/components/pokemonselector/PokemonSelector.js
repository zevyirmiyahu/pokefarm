import React, { useState, useEffect } from "react";
import { useAuth } from "../../routes/providers/AuthProvider";
import Pokemon from "../pokemon/Pokemon";
import axios from "axios";
import { BASE_URL, END_POINTS } from "../../constants/AppConstants";
import { getMultiPokemonData } from "../../apis/PokemonAPI";
import "./styles/pokemonselector.css";

const BASE_STYLE = "pokemon-selector";

const MessageContent = () => {
  return (
    <div>
      <h2>Please Choose a Pokemon.</h2>
      <p>This will be your very first pokemon! Choose wisely.</p>
    </div>
  );
};

const handleSelectPokemon = (pokemon, user, setUser) => {
  const updatedUser = { ...user, pokemons: [pokemon] };
  axios
    .post(`${BASE_URL}/${END_POINTS.UPDATE_USER}`, updatedUser)
    .then((response) => {
      //   console.log(response.data);
      setUser(updatedUser);
    })
    .catch((error) => {
      console.log(error);
    });
};

const Content = ({ user, setUser, pokemons }) => {
  return (
    <div className={`${BASE_STYLE}-starter-container`}>
      <MessageContent />
      <div className={`${BASE_STYLE}-starter-inner-container`}>
        <div
          className={`${BASE_STYLE}-button`}
          onClick={() => handleSelectPokemon(pokemons[0], user, setUser)}
        >
          <Pokemon pokemonObject={pokemons[0]} />
        </div>
        <div
          className={`${BASE_STYLE}-button`}
          onClick={() => handleSelectPokemon(pokemons[1], user, setUser)}
        >
          <Pokemon pokemonObject={pokemons[1]} />
        </div>
        <div
          className={`${BASE_STYLE}-button`}
          onClick={() => handleSelectPokemon(pokemons[2], user, setUser)}
        >
          <Pokemon pokemonObject={pokemons[2]} />
        </div>
      </div>
    </div>
  );
};

/**
 * Happens ONLY when user first create account
 * @returns JSX
 */
const StarterSelection = ({ user, setUser }) => {
  const [pokemons, setPokemons] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const chikoritaId = 152;
  const totadileId = 158;
  const cyndaquilId = 155;

  useEffect(() => {
    getMultiPokemonData(
      [chikoritaId, totadileId, cyndaquilId],
      setPokemons
    ).finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Loading..</p>;
  } else {
    return <Content user={user} setUser={setUser} pokemons={pokemons} />;
  }
};

const PokemonSelector = ({ isStarterSelection }) => {
  const { user, setUser } = useAuth();
  return isStarterSelection ? (
    <StarterSelection user={user} setUser={setUser} />
  ) : null;
};

export default PokemonSelector;
