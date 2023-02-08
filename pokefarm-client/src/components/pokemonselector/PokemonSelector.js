import React from "react";
import { useAuth } from "../../routes/providers/AuthProvider";
import Pokemon from "../pokemon/Pokemon";
import axios from "axios";
import { LOGIN, END_POINTS } from "../../constants/AppConstants";
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

const handleSelectPokemon = (pokemonId, user, setUser) => {
  axios
    .post(`${LOGIN.BASE_URL}/${END_POINTS.SELECT_POKEMON}`, user, pokemonId)
    .then((response) => {
      const { pokemons } = response.data;
      setUser({ ...user, pokemons: pokemons }).catch((error) => {
        console.log(error);
      });
    });
};

/**
 * Happens ONLY when user first create account
 * @returns JSX
 */
const StarterSelection = ({ user, setUser }) => {
  return (
    <div className={`${BASE_STYLE}-starter-container`}>
      <MessageContent />
      <div className={`${BASE_STYLE}-starter-inner-container`}>
        <div
          className={`${BASE_STYLE}-button`}
          onClick={() => handleSelectPokemon(155, user, setUser)}
        >
          <Pokemon pokemonId={155} />
        </div>
        <div
          className={`${BASE_STYLE}-button`}
          onClick={() => console.log("PRESSED!")}
        >
          <Pokemon pokemonId={158} />
        </div>
        <div
          className={`${BASE_STYLE}-button`}
          onClick={() => console.log("PRESSED!")}
        >
          <Pokemon pokemonId={152} />
        </div>
      </div>
    </div>
  );
};

const PokemonSelector = ({ isStarterSelection }) => {
  const { user, setUser } = useAuth();
  return isStarterSelection ? (
    <StarterSelection user={user} setUser={setUser} />
  ) : null;
};

export default PokemonSelector;
