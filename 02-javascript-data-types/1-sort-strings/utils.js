const locales = ["ru-RU", "en-EN"];
const compareOptions = {
  caseFirst: "upper",
};

/**
 * sortStrings - sorts array of string by two criteria "asc"
 * @param {string} str1 - first string for comparing
 * @param {string} str2 - first string for comparing
 * @returns {number}
 */
export const ascComparator = (str1, str2) =>
  str1.localeCompare(str2, locales, compareOptions);

/**
 * sortStrings - sorts array of string by two criteria "desc"
 * @param {string} str1 - first string for comparing
 * @param {string} str2 - first string for comparing
 * @returns {number}
 */
export const descComparator = (str1, str2) =>
  str2.localeCompare(str1, locales, compareOptions);
