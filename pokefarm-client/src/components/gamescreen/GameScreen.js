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
import PropTypes from "prop-types";
import GameBackground from "./GameBackground";
import { earningMoney } from "./utils/Utils";
import { addPokemon } from "../../utils/Utils";

import "./styles/pokemonselector.css";

const BASE_STYLE = "pokemon-selector";

// For choosing a pokemon to add to your farm.
const handleSelectPokemon = (pokemon, user, setUser) => {
  const userId = user.userId;
  const updatedPokemon = { userId, pokemons: [pokemon] };
  axios
    .post(`${BASE_URL}/${END_POINTS.UPDATE_USER}`, updatedPokemon)
    .then((response) => {
      setUser({ ...user, pokemons: addPokemon(pokemon, user.pokemons) }); // will change this once DB exists
    })
    .catch((error) => {
      console.error(error);
    });
};

const handleWorkStatus = (money, pokemon, user, setUser) => {
  const updatedPokemon = { ...pokemon, isWorking: !pokemon.isWorking };
  axios
    .post(`${BASE_URL}/${END_POINTS.UPDATE_USER}`, updatedPokemon)
    .then((response) => {
      setUser({
        ...user,
        money: user.money + money,
        pokemons: addPokemon(updatedPokemon, user.pokemons),
      }); // will change this once DB exists
    })
    .catch((error) => {
      console.error(error);
    });
};

/**
 * Message of instruction for new users selecting a starter pokemon
 * @component
 * @returns
 */
const StarterMessageContent = () => {
  return (
    <Card className={`${BASE_STYLE}-message-content`}>
      <CardContent>
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

const MainToolContent = ({ user, setUser }) => {
  const [payData, setPayData] = useState(new Map()); // key: uniqueId, value: payEarned

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
              earningMoney(pokemon.uniqueId, payData, setPayData);
              return (
                <div key={pokemon.uniqueId}>
                  <Pokemon
                    pokemonObject={pokemon}
                    isAnimated={false}
                    onClick={() => {
                      const money = payData.get(pokemon.uniqueId);
                      handleWorkStatus(money, pokemon, user, setUser);
                      payData.delete(pokemon.uniqueId); // remove value
                      setPayData(new Map(payData)); // reset pay
                    }}
                  />
                  <p className={`${BASE_STYLE}-main-tool-payment`}>
                    Payment: {payData.get(pokemon.uniqueId)} ₱
                  </p>
                </div>
              );
            })}
        </Stack>
      </CardContent>
    </Card>
  );
};

/**
 * @component
 * Starter content portion of the game.
 * Renders ONLY when user first creates account
 * @returns JSX
 */
const StartContent = ({ user, setUser, pokemons }) => {
  return (
    <div className={`${BASE_STYLE}-starter-container`}>
      <StarterMessageContent />
      <div className={`${BASE_STYLE}-starter-background-container`}>
        <GameBackground className={`${BASE_STYLE}-starter-background-image`} />
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
 * @component
 * Content during main play
 * @returns JSX
 */
const MainContent = ({ user, setUser }) => {
  let firstRowPokemons = user.pokemons;
  let secondRowPokemons = [];
  if (user.pokemons.length > 4) {
    firstRowPokemons = user.pokemons.slice(0, 4);
    secondRowPokemons = user.pokemons.slice(4, user.pokemons.length);
  }

  return (
    <div className={`${BASE_STYLE}-starter-container`}>
      <div className={`${BASE_STYLE}-starter-background-container`}>
        <GameBackground className={`${BASE_STYLE}-starter-background-image`} />
        <Stack
          spacing={2}
          direction="row"
          className={`${BASE_STYLE}-pokemon-row-first`}
        >
          {firstRowPokemons
            .filter((pokemon) => !pokemon.isWorking)
            .map((pokemon) => {
              return (
                <Pokemon
                  key={pokemon.uniqueId}
                  pokemonObject={pokemon}
                  onClick={() => handleWorkStatus(0, pokemon, user, setUser)}
                />
              );
            })}
        </Stack>
        <Stack
          spacing={2}
          direction="row"
          className={`${BASE_STYLE}-pokemon-row-second`}
        >
          {secondRowPokemons
            .filter((pokemon) => !pokemon.isWorking)
            .map((pokemon) => {
              return (
                <Pokemon
                  key={pokemon.uniqueId}
                  pokemonObject={pokemon}
                  onClick={() => handleWorkStatus(0, pokemon, user, setUser)}
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
 * Renders the screens for the game
 * @component
 * @param {boolean} isStarterSelection - determines if user is new
 * @returns
 */
const GameScreen = ({ isStarterSelection }) => {
  const { user, setUser } = useAuth();
  const [pokemons, setPokemons] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Starter Pokemon
  const chikoritaId = 152;
  const totadileId = 158;
  const cyndaquilId = 155;

  useEffect(() => {
    if (isStarterSelection) {
      getMultiPokemonData(
        [chikoritaId, totadileId, cyndaquilId],
        setPokemons
      ).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isStarterSelection) {
    return <StartContent user={user} setUser={setUser} pokemons={pokemons} />;
  } else {
    return <MainContent user={user} setUser={setUser} />;
  }
};

StartContent.propTypes = {
  /**
   * User object held in state
   */
  user: PropTypes.object.isRequired,
  /**
   * Setter function for user state
   */
  setUser: PropTypes.func.isRequired,
};

MainContent.propTypes = {
  /**
   * User object held in state
   */
  user: PropTypes.object.isRequired,
  /**
   * Setter function for user state
   */
  setUser: PropTypes.func.isRequired,
};

GameScreen.propTypes = {
  /**
   * Determines if user is a newly created user and needs to select
   * his/her first starter Pokemon
   */
  isStarterSelection: PropTypes.bool.isRequired,
};

export default GameScreen;
