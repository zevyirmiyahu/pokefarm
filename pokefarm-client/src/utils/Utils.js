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
    return (
      typeValue.substring(0, 1).toUpperCase() +
      typeValue.substring(1, typeValue.length)
    );
  });
};
