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
