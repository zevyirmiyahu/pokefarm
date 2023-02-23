import PokemonObject from "../../objects/PokemonObject";
import {
  typeFormatter,
  formatName,
  addPokemon,
  generateUniversallyUniqueId,
} from "../Utils";

describe("General Util functions testing", () => {
  test("typeFormatter: Capitalizes 1 type value", () => {
    // ARRANGE
    const types = [
      {
        slot: 1,
        type: {
          name: "ghost",
          url: "https://pokeapi.co/api/v2/type/5/",
        },
      },
    ];

    // ACT
    const result = typeFormatter(types);

    // ASSERT
    expect(result[0]).toBe("Ghost");
  });

  test("typeFormatter: Does not fail when types is empty", () => {
    // ARRANGE
    const types = [];

    // ACT
    const result = typeFormatter(types);

    // ASSERT
    expect(result.length).toBe(0);
  });

  test("typeFormatter: Capitalizes 2 type values", () => {
    // ARRANGE
    const types = [
      {
        slot: 1,
        type: {
          name: "ground",
          url: "https://pokeapi.co/api/v2/type/5/",
        },
      },
      {
        slot: 2,
        type: {
          name: "psychic",
          url: "https://pokeapi.co/api/v2/type/14/",
        },
      },
    ];

    // ACT
    const result = typeFormatter(types);

    // ASSERT
    expect(result[0]).toBe("Ground");
    expect(result[1]).toBe("Psychic");
  });

  test("typeFormatter: Does not fail when types is empty", () => {
    // ARRANGE
    const types = [];

    // ACT
    const result = typeFormatter(types);

    // ASSERT
    expect(result.length).toBe(0);
  });

  test("formatName: Capitalizes first letters", () => {
    // ARRANGE
    const name = "bulbasaur";

    // ACT
    const result = formatName(name);

    // ASSERT
    expect(result).toBe("Bulbasaur");
  });

  test("formatName: No Errors if name is already capitalized", () => {
    // ARRANGE
    const name = "Bulbasaur";

    // ACT
    const result = formatName(name);

    // ASSERT
    expect(result).toBe("Bulbasaur");
  });

  test("addPokemon: Given empty pokemons array, pokemon is correctly added ", () => {
    // ARRANGE
    const types = [
      {
        slot: 1,
        type: {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/5/",
        },
      },
    ];
    const pokemon = new PokemonObject(152, "chikorita", types, false);

    // ACT
    const result = addPokemon(pokemon, []);

    // ASSERT
    expect(result.length).toBe(1);
  });

  test("addPokemon: Ensure no mutation occured to pokemon added to empty pokemon array", () => {
    // ARRANGE
    const types = [
      {
        slot: 1,
        type: {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/5/",
        },
      },
    ];
    const expectedPokemon = new PokemonObject(152, "chikorita", types, false);

    // ACT
    const actualResult = addPokemon(expectedPokemon, []);

    // ASSERT
    const actualPokemon = actualResult[0];
    expect(actualPokemon.id).toBe(expectedPokemon.id);
    expect(actualPokemon.name).toBe(expectedPokemon.name);
    expect(actualPokemon.types.length).toBe(expectedPokemon.types.length);
    expect(actualPokemon.types[0].type.name).toBe(
      expectedPokemon.types[0].type.name
    );
  });

  test("addPokemon: Can't add pokemon that already exists in pokemons array", () => {
    // ARRANGE
    const types = [
      {
        slot: 1,
        type: {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/5/",
        },
      },
    ];
    const chikorita = new PokemonObject(152, "chikorita", types, false);

    // ACT
    const result = addPokemon(chikorita, [chikorita]);
    const result2 = addPokemon(chikorita, result);

    // ASSERT
    expect(result.length).toBe(1);
    expect(result2.length).toBe(1);
  });

  test("addPokemon: Should add pokemon to pokemons array that have differing uniqueIds", () => {
    // ARRANGE
    const types = [
      {
        slot: 1,
        type: {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/5/",
        },
      },
    ];
    // Two different chikorita will have differing uniqueIds
    const chikorita1 = new PokemonObject(152, "chikorita", types, false);
    const chikorita2 = new PokemonObject(152, "chikorita", types, false);

    // ACT
    const result = addPokemon(chikorita2, [chikorita1]);

    // ASSERT
    expect(result.length).toBe(2);
  });

  // Commenting this test out due to duration
  //   test("generateUniversallyUniqueId: should generate universally unique Ids", () => {
  //     // ARRANGE
  //     const name = "chikorita";
  //     const size = 10000000; // 10 million

  //     // ACT
  //     const set = new Set(
  //       new Array(size).fill(0).map(() => generateUniversallyUniqueId(name))
  //     );

  //     // ASSERT
  //     expect(set.size).toBe(size); // Size should be same if all IDs are unique
  //   });
});
