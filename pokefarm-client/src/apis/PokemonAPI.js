import axios from "axios";

export const getPokemonData = async (PokemonId, setData) => {
  const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
  axios
    .get(`${BASE_URL}/${PokemonId}`)
    .then((reponse) => {
      setData({ isLoading: false, ...reponse.data });
    })
    .catch((error) => console.log(error));
};
