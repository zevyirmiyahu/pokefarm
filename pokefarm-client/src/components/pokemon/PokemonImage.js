import React from "react";
import PropTypes from "prop-types";
import { IMG_WIDTH } from "../../constants/AppConstants";

const PokemonImage = ({ pokemonId, isAnimated }) => {
  return isAnimated ? (
    <img
      src={require(`../../assets/sprites/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`)}
      width={IMG_WIDTH}
    />
  ) : (
    <img
      src={require(`../../assets/sprites/sprites/pokemon/versions/generation-v/black-white/${pokemonId}.png`)}
    />
  );
};

PokemonImage.propTypes = {
  /**
   * Id number of the pokemon to image to use
   */
  pokemonId: PropTypes.number.isRequired,
  /**
   * Determines if image should be the animated sprite (gif) or not.
   */
  animated: PropTypes.bool,
};

export default PokemonImage;
