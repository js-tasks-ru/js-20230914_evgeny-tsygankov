import { isObject } from "./utils";

/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const parsedPath = path.split(".");
  let index = 0;

  const inner = (obj) => {
    const key = parsedPath[index];
    const value = obj[key];

    if (value && !isObject(value)) {
      return value;
    }
    if (!value) {
      return undefined;
    }
    index += 1;
    return inner(value);
  };

  return inner;
}
