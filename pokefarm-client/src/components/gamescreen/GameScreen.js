import React, { useState, useEffect } from "react";
import { useAuth } from "../../routes/providers/AuthProvider";
import { usePokemons } from "../../routes/providers/PokemonProvider";
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
import { addPokemon } from "../../utils/Utils";
import "./styles/gamescreen.scss";

const BASE_STYLE = "pokemon-game-screen";

// For choosing a pokemon to add to your farm.
const handleSelectPokemon = (userId, pokemon, setPokemons) => {
  const updatedPokemon = { userId, pokemons: [pokemon] };
  axios
    .post(`${BASE_URL}/${END_POINTS.UPDATE_USER}`, updatedPokemon)
    .then((response) => {
      setPokemons(addPokemon(pokemon));
    })
    .catch((error) => {
      console.error(error);
    });
};

// TODO: Remove this has been moved to Pokemon component
const handleWorkStatus = (pokemon, pokemons, setPokemons, user, setUser) => {
  // limit work to ONLY 4 pokemon at a time
  const totalWorking = pokemons.filter(
    (pokemon) => pokemon.isWorking === true
  ).length;

  if (totalWorking >= 4) {
    return;
  }

  const moneyEarned = pokemon.money;
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
        money: user.money + moneyEarned,
      });
      setPokemons(addPokemon(updatedPokemon, pokemons));
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

const MainToolContent = ({ pokemons }) => {
  return (
    <Card className={`${BASE_STYLE}-main-tool-container`}>
      <CardContent>
        <Typography variant="h5" component="div">
          Pokemon Working
        </Typography>
        <Typography sx={{ mb: 1.5 }}>Click Pokemon to return home.</Typography>
        <Stack
          direction="row"
          style={{ flexWrap: "wrap", justifyContent: "space-between" }}
        >
          {pokemons
            .filter((pokemon) => pokemon.isWorking)
            .map((pokemon) => {
              return (
                <div key={pokemon.uniqueId}>
                  <Pokemon
                    className={`${BASE_STYLE}-pokemon`}
                    pokemonObject={pokemon}
                    isAnimated={false}
                  />
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
const StartContent = () => {
  const { user } = useAuth();
  const { pokemons, setPokemons } = usePokemons();
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
            onClick={() =>
              handleSelectPokemon(user.id, pokemons[0], setPokemons)
            }
          />
          <Pokemon
            pokemonObject={pokemons[1]}
            onClick={() =>
              handleSelectPokemon(user.id, pokemons[1], setPokemons)
            }
          />
          <Pokemon
            pokemonObject={pokemons[2]}
            onClick={() =>
              handleSelectPokemon(user.id, pokemons[2], setPokemons)
            }
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
const MainContent = () => {
  const { user, setUser } = useAuth();
  const { pokemons, setPokemons } = usePokemons();
  let firstRowPokemons = pokemons;
  let secondRowPokemons = [];
  if (pokemons.length > 4) {
    firstRowPokemons = pokemons.slice(0, 4);
    secondRowPokemons = pokemons.slice(4, pokemons.length);
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
              const uniqueId = pokemon.uniqueId;
              return <Pokemon key={uniqueId} pokemonObject={pokemon} />;
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
              const uniqueId = pokemon.uniqueId;
              return <Pokemon key={uniqueId} pokemonObject={pokemon} />;
            })}
        </Stack>
      </div>
      <MainToolContent
        user={user}
        setUser={setUser}
        pokemons={pokemons}
        setPokemons={setPokemons}
      />
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
  const { setPokemons } = usePokemons();
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
    return <StartContent />;
  } else {
    return <MainContent />;
  }
};

StartContent.propTypes = {};

MainContent.propTypes = {};

GameScreen.propTypes = {
  /**
   * Determines if user is a newly created user and needs to select
   * his/her first starter Pokemon
   */
  isStarterSelection: PropTypes.bool.isRequired,
};

export default GameScreen;
