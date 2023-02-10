import React from "react";
import Banner from "../../components/banners/Banner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/providers/AuthProvider";
import { ROUTES } from "../../constants/AppConstants";
import PokemonSelector from "../../components/pokemonselector/PokemonSelector";
import StarterPage from "./StarterPage";
import "./styles/profilepage.css";

const BASE_STYLE = "profile-page";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return (
    <form>
      <button
        className={`${BASE_STYLE}-logout`}
        onClick={() => {
          setUser(null);
          navigate(ROUTES.LOGIN_IN);
        }}
      >
        Logout
      </button>
    </form>
  );
};

const MenuBar = ({ userId, username, pokemonCount }) => {
  return (
    <div>
      <Banner />
      <div className={`${BASE_STYLE}-menubar`}>
        <p className={`${BASE_STYLE}-text`}>Account ID: {userId}</p>
        <p className={`${BASE_STYLE}-text`}>Farmer: {username}</p>
        <p className={`${BASE_STYLE}-text`}>Pokemon: {pokemonCount}</p>
        <div className={`${BASE_STYLE}-logout-container`}>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

const MainProfilePage = ({ userId, username, pokemonCount }) => {
  return (
    <div>
      <MenuBar
        userId={userId}
        username={username}
        pokemonCount={pokemonCount}
      />
      <PokemonSelector isStarterSelection={false} />
    </div>
  );
};

const ProfilePage = () => {
  const { user } = useAuth();
  if (!user) {
    return <p>Loading...</p>;
  } else {
    const isStarterSelection = user.pokemons.length === 0;
    return isStarterSelection ? (
      <StarterPage />
    ) : (
      <MainProfilePage
        userId={user.userId}
        username={user.username}
        pokemonCount={user.pokemons.length}
      />
    );
  }
};

export default ProfilePage;
