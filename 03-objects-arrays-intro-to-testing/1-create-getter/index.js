import { isObject } from "./utils";

/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const parsedPath = path.split(".");

  const inner = (obj) => {
    let result = { ...obj };

    for (const key of parsedPath) {
      if (!(key in result)) {
        result = undefined;
        break;
      }
      const value = result[key];
      if (!isObject(value)) {
        result = value;
        break;
      }
      result = { ...value };
    }

    return result;
  };

  return inner;
}
