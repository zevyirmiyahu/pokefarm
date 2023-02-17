import React, { useState, useEffect } from "react";
import { useAuth } from "../../routes/providers/AuthProvider";
import Pokemon from "../pokemon/Pokemon";
import axios from "axios";
import { BASE_URL, END_POINTS } from "../../constants/AppConstants";
import { getMultiPokemonData } from "../../apis/PokemonAPI";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import "./styles/pokemonselector.css";

const BASE_STYLE = "pokemon-selector";

const StarterMessageContent = () => {
  return (
    <Card className={`${BASE_STYLE}-message-content`}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Info
        </Typography>
        <Typography variant="h5" component="div">
          Choose a Pokemon
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Pick wisely!
        </Typography>
        <Typography variant="body2">
          This will be your very first pokemon.
        </Typography>
      </CardContent>
    </Card>
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

const Background = ({ className }) => (
  <img
    className={className}
    src={require("../../assets/selection-background.png")}
    width={1000}
  />
);

const StartContent = ({ user, setUser, pokemons }) => {
  return (
    <div className={`${BASE_STYLE}-starter-container`}>
      <StarterMessageContent />
      <div className={`${BASE_STYLE}-starter-background-container`}>
        <Background className={`${BASE_STYLE}-starter-background-image`} />
        <Stack
          spacing={2}
          direction="row"
          className={`${BASE_STYLE}-starter-stack`}
        >
          <Pokemon
            pokemonObject={pokemons[0]}
            onClick={() => handleSelectPokemon(pokemons[0], user, setUser)}
          />
          <Pokemon
            pokemonObject={pokemons[1]}
            onClick={() => handleSelectPokemon(pokemons[1], user, setUser)}
          />
          <Pokemon
            pokemonObject={pokemons[2]}
            onClick={() => handleSelectPokemon(pokemons[2], user, setUser)}
          />
        </Stack>
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
    return <p>Loading...</p>;
  } else {
    return <StartContent user={user} setUser={setUser} pokemons={pokemons} />;
  }
};

const PokemonSelector = ({ isStarterSelection }) => {
  const { user, setUser } = useAuth();
  return isStarterSelection ? (
    <StarterSelection user={user} setUser={setUser} />
  ) : null; // MainSelection when game actually starts once user has a single pokemon
};

export default PokemonSelector;
