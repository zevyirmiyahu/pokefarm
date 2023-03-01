import React from "react";
import { useAuth } from "../../routes/providers/AuthProvider";
import { usePokemons } from "../../routes/providers/PokemonProvider";
import MenuBar from "../../components/menubar/MenuBar";
import GameScreen from "../../components/gamescreen/GameScreen";

import "./styles/profilepage.css";

const ProfilePage = () => {
  const { user } = useAuth();
  const { pokemons } = usePokemons();
  if (!user) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <MenuBar />
        <GameScreen isStarterSelection={pokemons.length === 0} />
      </div>
    );
  }
};

export default ProfilePage;
