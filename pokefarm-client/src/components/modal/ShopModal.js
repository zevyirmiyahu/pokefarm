import React, { useEffect, useState } from "react";
import { useAuth } from "../../routes/providers/AuthProvider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Pokemon from "../pokemon/Pokemon";
import Pokeball from "../../assets/pokeball.png";
import { getMultiPokemonData } from "../../apis/PokemonAPI";
import { addPokemon } from "../../utils/Utils";
import { generateRandomNumber } from "../../utils/Utils";
import "./styles/shopmodal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

const BASE_STYLE = "shop-modal";

/**
 * User can select pokémon to buy from this modal
 * @component
 */
const ShopModal = () => {
  const { user, setUser } = useAuth();
  const [pokemons, setPokemons] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getMultiPokemonData(
      [
        generateRandomNumber(1, 600),
        generateRandomNumber(1, 600),
        generateRandomNumber(1, 600),
      ],
      setPokemons
    ).finally(() => {
      setIsLoading(false);
    });
  }, [open]);

  const handlePurchase = (pokemon, user, setUser) => {
    setUser({ ...user, pokemons: addPokemon(pokemon, user.pokemons) });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Button sx={{ marginLeft: "2rem" }} onClick={handleOpen} color="inherit">
        <img src={Pokeball} alt="Pokeball" width={25} />
        <Typography
          variant="h6"
          component="div"
          sx={{ marginLeft: "6px", flexGrow: 1 }}
        >
          Shop
        </Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Poké Shop <img src={Pokeball} alt="Pokeball" width={20} />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please select a pokémon you'd like to purchase.
          </Typography>
          <Stack spacing={2} direction="row">
            <div className={`${BASE_STYLE}-pokemon-container`}>
              <h3>{pokemons[0].name}</h3>
              <p>
                <b>Cost:</b> {generateRandomNumber(15, 65)} ₱
              </p>
              <Pokemon
                pokemonObject={pokemons[0]}
                onClick={() => handlePurchase(pokemons[0], user, setUser)}
              />
            </div>
            <div className={`${BASE_STYLE}-pokemon-container`}>
              <h3>{pokemons[1].name}</h3>
              <p>
                <b>Cost:</b> {generateRandomNumber(15, 65)} ₱
              </p>
              <Pokemon
                pokemonObject={pokemons[1]}
                onClick={() => handlePurchase(pokemons[1], user, setUser)}
              />
            </div>
            <div className={`${BASE_STYLE}-pokemon-container`}>
              <h3>{pokemons[2].name}</h3>
              <p>
                <b>Cost:</b> {generateRandomNumber(15, 65)} ₱
              </p>
              <Pokemon
                pokemonObject={pokemons[2]}
                onClick={() => handlePurchase(pokemons[2], user, setUser)}
              />
            </div>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ShopModal;
