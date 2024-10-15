// src/utils/helpers.js

export const formatNumberWithCommas = (number) => {
  if (isNaN(number)) {
    return '0';
  }
  return Number(number).toLocaleString();
};
