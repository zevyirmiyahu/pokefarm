import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../routes/providers/AuthProvider";
import Pokemon from "../pokemon/Pokemon";
import axios from "axios";
import { BASE_URL, END_POINTS } from "../../constants/AppConstants";
import { getMultiPokemonData } from "../../apis/PokemonAPI";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Timer } from "easytimer.js";

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

/**
 * Payment system for working Pokemon
 * @param {number} pokemonId 
 * @param {Map} payData 
 * @param {function} setPayData 
 * @returns function to clear time id
 */
const earningMoney = (pokemonId, payData, setPayData) => {
  const currentPay =
    payData.get(pokemonId) === undefined ? 0 : payData.get(pokemonId);
  if (currentPay < 10000) {
    const timeId = setTimeout(() => {
      setPayData(new Map(payData.set(pokemonId, currentPay + 1)));
    }, 1000);
    return () => clearTimeout(timeId);
  }
};

const MainToolContent = ({ user, setUser }) => {
  const [payData, setPayData] = useState(new Map()); // key: pokemonId, value: pay

  return (
    <Card className={`${BASE_STYLE}-main-tool-container`}>
      <CardContent>
        <Typography variant="h5" component="div">
          Pokemon Working
        </Typography>
        <Typography sx={{ mb: 1.5 }}>Click Pokemon to return home.</Typography>
        <Stack spacing={2} direction="row">
          {user.pokemons
            .filter((pokemon) => pokemon.isWorking)
            .map((pokemon) => {
              earningMoney(pokemon.id, payData, setPayData);
              return (
                <div key={pokemon.name}>
                  <Pokemon
                    pokemonObject={pokemon}
                    isAnimated={false}
                    onClick={() => {
                      handleWorkStatus(pokemon, user, setUser);
                      payData.delete(pokemon.id); // remove value
                      setPayData(new Map(payData)); // reset pay
                    }}
                  />
                  <p className={`${BASE_STYLE}-main-tool-payment`}>
                    Payment: {payData.get(pokemon.id)} ₱
                  </p>
                </div>
              );
            })}
        </Stack>
      </CardContent>
    </Card>
  );
};

const handleSelectPokemon = (pokemon, user, setUser) => {
  const userId = user.userId;
  const updatedPokemon = { userId, pokemons: [pokemon] };
  axios
    .post(`${BASE_URL}/${END_POINTS.UPDATE_USER}`, updatedPokemon)
    .then((response) => {
      //   console.log(response.data);
      setUser({ ...user, pokemons: [pokemon] }); // will change this once DB exists
    })
    .catch((error) => {
      console.log(error);
    });
};

const handleWorkStatus = (pokemon, user, setUser) => {
  const updatedPokemon = { ...pokemon, isWorking: !pokemon.isWorking };
  axios
    .post(`${BASE_URL}/${END_POINTS.UPDATE_USER}`, updatedPokemon)
    .then((response) => {
      //   console.log(response.data);
      setUser({ ...user, pokemons: [updatedPokemon] }); // will change this once DB exists
    })
    .catch((error) => {
      console.log(error);
    });
};

const Background = ({ className }) => (
  <img
    className={className}
    src={require("../../assets/selection-background.png")}
    width={900}
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

const MainContent = ({ user, setUser }) => {
  return (
    <div className={`${BASE_STYLE}-starter-container`}>
      <div className={`${BASE_STYLE}-starter-background-container`}>
        <Background className={`${BASE_STYLE}-starter-background-image`} />
        <Stack
          spacing={2}
          direction="row"
          className={`${BASE_STYLE}-starter-stack`}
        >
          {user.pokemons
            .filter((pokemon) => !pokemon.isWorking)
            .map((pokemon) => {
              return (
                <Pokemon
                  key={pokemon.name}
                  pokemonObject={pokemon}
                  onClick={() => handleWorkStatus(pokemon, user, setUser)}
                />
              );
            })}
        </Stack>
      </div>
      <MainToolContent user={user} setUser={setUser} />
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

const MainSelection = ({ user, setUser }) => {
  return (
    <div>
      <MainContent user={user} setUser={setUser} />
    </div>
  );
};

const Money = (setCounter) => {
  const timer = new Timer();
  timer.start({ precision: "seconds" });
  const time = timer.getTotalTimeValues().seconds;
  setCounter(time);
};

const PokemonSelector = ({ isStarterSelection }) => {
  const { user, setUser } = useAuth();

  return isStarterSelection ? (
    <StarterSelection user={user} setUser={setUser} />
  ) : (
    <MainSelection user={user} setUser={setUser} />
  ); // MainSelection when game actually starts once user has a single pokemon
};

export default PokemonSelector;
