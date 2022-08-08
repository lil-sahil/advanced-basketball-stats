export const removeAccents = (str) => {
  str = str === undefined ? "" : str.replace(/'/g, "");
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
