import { typeFormatter } from "../Utils";

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
});
