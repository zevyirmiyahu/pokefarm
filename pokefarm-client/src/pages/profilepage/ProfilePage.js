import React from "react";
import banner from "../../assets/pokemon-page-banner.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/providers/AuthProvider";
import { ROUTES } from "../../constants/AppConstants";
import PokemonSelector from "../../components/pokemonselector/PokemonSelector";
import "./styles/profilepage.css";

const BASE_STYLE = "profile-page";
const Banner = () => {
  return <img className={`${BASE_STYLE}-banner`}src={banner} alt="Pokemon Banner Image" />;
};

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

const GeneralList = (values) => {
  const list = values.map((value) => {
    <li key={value.name}>{value.name}</li>;
  });
  return <div>{list}</div>;
};

const MenuBar = ({ userId, username, pokemonCount, logout }) => {
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

const ProfilePage = () => {
  const { user, logout } = useAuth();
  if (!user) {
    return <p>Loading...</p>;
  } else {
    const isStarterSelection = user.pokemons.length === 0;
    return (
      <div>
        <MenuBar
          userId={user.userId}
          username={user.username}
          pokemonCount={user.pokemons.length}
          logout={logout}
        />
        <PokemonSelector isStarterSelection={isStarterSelection} />
      </div>
    );
  }
};

export default ProfilePage;
