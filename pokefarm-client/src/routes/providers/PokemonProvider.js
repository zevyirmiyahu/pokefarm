import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useLocalStorage("pokemons", null);
  const value = useMemo(
    () => ({ pokemons, setPokemons }),
    [pokemons, setPokemons]
  );

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

export const usePokemons = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error("usePokemons MUST be used within the PokemonProvider");
  }
  return useContext(PokemonContext);
};
