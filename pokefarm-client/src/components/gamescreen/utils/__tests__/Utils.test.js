import { NOOP } from "../../../../utils/Utils";
import { earningMoney } from "../Utils";

jest.useFakeTimers();

describe("Testing Utils of gamescreen ", () => {
  // earningMoney
  test("earningMoney: Expected value is 1 for empty payData map", () => {
    // ARRANGE
    const pokemonUniqueId = "chikorita" + Date.now(); // unique ID is just name + timestamp
    const payData = new Map();
    const setPayData = NOOP;

    // ACT
    earningMoney(pokemonUniqueId, payData, setPayData);
    jest.advanceTimersByTime(1000);

    // ASSERT
    expect(payData.get(pokemonUniqueId)).toBe(1);
  });

  test("earningMoney: Expected value is 11 for payData that contains 10 seconds", () => {
    // ARRANGE
    const pokemonUniqueId = "chikorita" + Date.now(); // unique ID is just name + timestamp
    const payData = new Map();
    const setPayData = NOOP;

    payData.set(pokemonUniqueId, 10); // pay is 10 pokedollars or 10 seconds

    // ACT
    earningMoney(pokemonUniqueId, payData, setPayData);
    jest.advanceTimersByTime(1000);

    // ASSERT
    expect(payData.get(pokemonUniqueId)).toBe(11);
  });

  test("earningMoney: Pay can't exceed 10,000", () => {
    // ARRANGE
    const pokemonUniqueId = "chikorita" + Date.now(); // unique ID is just name + timestamp
    const payData = new Map();
    const setPayData = NOOP;

    payData.set(pokemonUniqueId, 10000); // pay is 10 pokedollars or 10 seconds

    // ACT
    earningMoney(pokemonUniqueId, payData, setPayData);
    jest.advanceTimersByTime(1000);

    // ASSERT
    expect(payData.get(pokemonUniqueId)).toBe(10000);
    expect(payData.get(pokemonUniqueId)).toBeLessThan(10001);
  });
});
