// No-Operation function
export const NOOP = () => {};

/**
 * Grabs only type names and capitalizes them.
 * @param {array} types
 * @returns array of string type names
 */
export const typeFormatter = (types) => {
  return types.map((el) => {
    const typeValue = el.type.name;
    return formatName(typeValue);
  });
};

/**
 * Names are all lowercase, so this function capitalizes first letter
 * @param {string} name
 * @returns
 */
export const formatName = (name) => {
  const firstLetter = name.substring(0, 1).toUpperCase();
  return firstLetter + name.substring(1, name.length);
};

/**
 * Generates a random number from min (inclusive) to max (inclusive)
 * @param {number} min - lowest possible number
 * @param {number} max - highest possible number
 * @returns {number} random number
 */
export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Ensures the pokemon array has unique elements.
 * @param {Object} pokemon - new pokemon or pokemon to update
 * @param {Object[]} pokemons - current array of pokemon the user has
 * @returns {Object[]}
 */
export const addPokemon = (pokemon, pokemons) => {
  if (pokemons.length === 0) {
    return [...pokemons, pokemon];
  } else {
    const uniqueId = pokemon.uniqueId;
    const result = pokemons.filter((pokemon) => pokemon.uniqueId !== uniqueId); // remove old version of pokemon (if it exists)
    return [...result, pokemon]; // replace or add with new version of pokemon
  }
};

/**
 * Generates a universally unique identifier
 * @param {string} name
 * @returns
 */
export const generateUniversallyUniqueId = (name) => {
  return name + Date.now().toString(16) + Math.random().toString(16).slice(2);
};
