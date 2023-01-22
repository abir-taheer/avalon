/*

Takes an object and replaces nested objects with dot notation keys

Example:

const example = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
  e: [4, 5, 6],
}

flattenObject(example) -> {
  "a": 1,
  "b.c": 2,
  "b.d": 3,
  "e": [4, 5, 6]
}
 */

export const flattenObject = <ValueType = any>(
  object: Record<string, any>,
  prefix: string = ""
) => {
  const final: Record<string, ValueType> = {};

  Object.keys(object).forEach((key) => {
    const newPrefix = prefix + key;
    const value = object[key];

    const isObject =
      typeof value === "object" &&
      value !== null &&
      typeof value !== "undefined" &&
      !Array.isArray(value);

    if (isObject) {
      Object.assign(final, flattenObject(value, newPrefix + "."));
    } else {
      final[newPrefix] = value;
    }
  });

  return final;
};
