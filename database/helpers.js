const snakeToCamel = function (str) {
  return str.replace(/_\w/g, match => match[1].toUpperCase());
};

const camelToSnake = function (str) {
  return str.replace(/([A-Z])/g, match => `_${match.toLowerCase()}`);
};

module.exports = {
  snakeToCamel,
  camelToSnake,
};
