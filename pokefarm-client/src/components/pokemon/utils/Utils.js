/**
 * Names are all lowercase, so this function capitalizes first letter
 * @param {string} name
 * @returns
 */
export const formatName = (name) => {
  const firstLetter = name.substring(0, 1).toUpperCase();
  return firstLetter + name.substring(1, name.length);
};
