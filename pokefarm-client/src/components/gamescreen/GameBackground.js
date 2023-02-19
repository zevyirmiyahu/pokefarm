import PropTypes from "prop-types";
const SCREEN_WIDTH = 900;

const GameBackground = ({ className }) => (
  <img
    className={className}
    src={require("../../assets/selection-background.png")}
    width={SCREEN_WIDTH}
  />
);

GameBackground.propTypes = {
  /**
   * Optional styling className
   */
  className: PropTypes.string,
};

export default GameBackground;
