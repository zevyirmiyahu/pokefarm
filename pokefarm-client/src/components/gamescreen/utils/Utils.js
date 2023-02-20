/**
 * Payment system for working pokemon. As the pokemon work, the timer
 * ticks away proportional to one second equals one pokedollar.
 *
 * @param {number} pokemonId - the unique id of the pokemon
 * @param {Map<number, number>} payData - a map holding { key: uniqueId, value: payEarned }
 * @param {function} setPayData
 * @returns Callback to clear specific time id
 */
const earningMoney = (pokemonUniqueId, payData, setPayData) => {
  const payEarned =
    payData.get(pokemonUniqueId) === undefined
      ? 0
      : payData.get(pokemonUniqueId);
  if (payEarned < 10000) {
    const timeId = setTimeout(() => {
      setPayData(new Map(payData.set(pokemonUniqueId, payEarned + 1)));
    }, 1000);
    return () => clearTimeout(timeId);
  }
};

/**
 * Ensures the items array are unique.
 * @param {Object} pokemon - new pokemon or pokemon to update
 * @param {Object[]} pokemons - current array of pokemon the user has
 * @returns {Object[]}
 */
const addPokemon = (pokemon, pokemons) => {
  if (pokemons.length === 0) {
    return [...pokemons, pokemon];
  } else {
    const uniqueId = pokemon.uniqueId;
    const result = pokemons.filter((pokemon) => pokemon.uniqueId !== uniqueId); // remove old version of pokemon (if it exists)
    return [...result, pokemon]; // replace or add with new version of pokemon
  }
};

export { earningMoney, addPokemon };
