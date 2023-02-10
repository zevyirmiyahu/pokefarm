import PokemonSelector from "../../components/pokemonselector/PokemonSelector";
import Banner from "../../components/banners/Banner";

const StarterPage = () => {
  return (
    <>
      <Banner />
      <PokemonSelector isStarterSelection={true} />
    </>
  );
};

export default StarterPage;
