import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/providers/AuthProvider";

import { BASE_URL, END_POINTS, ROUTES } from "../../constants/AppConstants";

import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import ShopModal from "../modal/ShopModal";
import { usePokemons } from "../../routes/providers/PokemonProvider";

/**
 *
 * @param {*} navigate
 * @param {*} user
 * @param {*} setUser
 */
const handleLogout = (navigate, pokemons, user, setUser) => {
  axios
    .post(`${BASE_URL}/${END_POINTS.SAVE_USER}`, {
      ...user,
      pokemons: pokemons,
    })
    .then((response) => {
      setUser(null);
      navigate(ROUTES.LOGIN_IN);
    })
    .catch((error) => {
      console.error(error);
    });
};

const MenuBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { pokemons } = usePokemons();
  const userId = user.userId;
  const username = user.username;
  const money = user.money;
  const pokemonCount = pokemons.length;

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#e4000f" }}>
          <Toolbar>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Avatar src="" />
            </IconButton>
            <Stack spacing={5} direction="row">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <b>Farmer:</b> {username}
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <b>Pokémon:</b> {pokemonCount}
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <b>Money:</b> {money ? money : 0} ₱
              </Typography>
            </Stack>
            <ShopModal />
            <p style={{ marginLeft: "auto" }}>Account: {userId}</p>
            <Button
              id="profile-page-logout-button"
              onClick={() => handleLogout(navigate, pokemons, user, setUser)}
              color="inherit"
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default MenuBar;
