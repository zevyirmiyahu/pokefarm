/**
 * Payment system for working pokemon. As the pokemon work, the timer
 * ticks away proportional to one second equals one pokedollar.
 *
 * @param {number} pokemonId - the unique id of the pokemon
 * @param {Map<number, number>} payData - a map holding { key: uniqueId, value: payEarned }
 * @param {function} setPayData
 * @returns Callback to clear specific time id
 */
const earningMoney = (pokemonId, payData, setPayData) => {
  const payEarned =
    payData.get(pokemonId) === undefined ? 0 : payData.get(pokemonId);
  if (payEarned < 10000) {
    const timeId = setTimeout(() => {
      setPayData(new Map(payData.set(pokemonId, payEarned + 1)));
    }, 1000);
    return () => clearTimeout(timeId);
  }
};

export { earningMoney };
