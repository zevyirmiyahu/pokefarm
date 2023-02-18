import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/providers/AuthProvider";
import { ROUTES } from "../../constants/AppConstants";
import PokemonSelector from "../../components/pokemonselector/PokemonSelector";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import "./styles/profilepage.css";

const handleLogout = (navigate, setUser) => {
  setUser(null);
  navigate(ROUTES.LOGIN_IN);
};

const MenuBar = ({ userId, username, pokemonCount }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return (
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
              Account ID: {userId}
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Farmer: {username}
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Pokemon: {pokemonCount}
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Money: 0 ₱
            </Typography>
          </Stack>
          <Button
            id="profile-page-logout-button"
            onClick={() => handleLogout(navigate, setUser)}
            color="inherit"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const ProfilePage = () => {
  const { user } = useAuth();
  if (!user) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <MenuBar
          userId={user.userId}
          username={user.username}
          pokemonCount={user.pokemons.length}
        />
        <PokemonSelector isStarterSelection={user.pokemons.length === 0} />
      </div>
    );
  }
};

export default ProfilePage;
