import { isSameAsPrev } from "./utils";

/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return "";
  }
  if (!size) {
    return string;
  }

  let res = "";
  let counter = 1;

  for (let i = 0; i <= string.length - 1; i++) {
    const prevChar = string[i - 1];
    const currentChar = string[i];

    if (isSameAsPrev(prevChar, currentChar)) {
      if (counter < size) {
        res += currentChar;
        counter += 1;
      }
    } else {
      res += currentChar;
      counter = 1;
    }
  }

  return res;
}
