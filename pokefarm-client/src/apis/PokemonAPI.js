import axios from "axios";
import PokemonObject from "../objects/PokemonObject";
import { POKE_API } from "../constants/AppConstants";
import { typeFormatter } from "../utils/Utils";

/**
 * Gets single pokmon data and creates pokemonObject to be set in state using setPokemon
 * @param {number} pokemonId
 * @param {function} setPokemon
 */
export const getPokemonData = async (pokemonId, setPokemon) => {
  return axios
    .get(`${POKE_API}/${pokemonId}`)
    .then((response) => {
      const { name, types } = response.data;
      const pokemon = new PokemonObject(pokemonId, name, types, false);
      setPokemon(pokemon);
    })
    .catch((error) => console.log(error));
};

/**
 * Gets the multiple pokmon data and creates pokemonObjects to be set in state using setPokemons
 * @param {[number]} pokemonIds array of ids
 * @param {function} setPokemons state function
 */
export const getMultiPokemonData = async (pokemonIds, setPokemons) => {
  const requests = pokemonIds.map((id) => axios.get(`${POKE_API}/${id}`));
  return axios
    .all(requests)
    .then((responses) => {
      let results = [];
      responses.forEach((response) => {
        const { id, name, types } = response.data;
        const formattedTypes = typeFormatter(types);
        const pokemon = new PokemonObject(id, name, formattedTypes, false);
        results.push(pokemon);
      });
      setPokemons(results);
    })
    .catch((error) => {
      console.log(error);
    });
};
