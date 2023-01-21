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
