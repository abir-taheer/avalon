import { word } from "faker-en/word";

export const generateGameId = (length: number) => {
  return Array.from(Array(length), () => word()).join("-");
};
