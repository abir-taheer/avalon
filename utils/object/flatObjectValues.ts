/*

Completely flattens the entries of an object as well as any nested arrays

Example:
const example = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
  e: [4, 5, 6],
  f: {
    g: [7, 8, 9],
  },
}

flatObjectValues(example) -> [1, 2, 3, 4, 5, 6, 7, 8, 9]

 */

export const flatObjectValues = <ValuesType>(
  obj: Record<string, ValuesType> | object
): ValuesType[] => {
  if (typeof obj !== "object" || obj === null || typeof obj === "undefined") {
    return [obj];
  }

  return Object.values(obj)
    .map((value) => flatObjectValues(value))
    .flat() as ValuesType[];
};
