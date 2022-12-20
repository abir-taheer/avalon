import { randomBytes } from "crypto";

export const randomString = (length: number) => {
  const numBytes = Math.ceil(length / 2);

  const str = randomBytes(numBytes).toString("hex");

  return str.length === length ? str : str.slice(0, length);
};
