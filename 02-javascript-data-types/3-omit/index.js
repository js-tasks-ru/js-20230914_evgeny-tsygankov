/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const resultObject = { ...obj };
  fields.forEach((key) => {
    if (key in obj) {
      delete resultObject[key];
    }
  });
  return resultObject;
};
