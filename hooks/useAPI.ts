import { apiAtom } from "@/atoms/api";
import { useAtomValue } from "jotai";

export const useAPI = () => {
  return useAtomValue(apiAtom);
};
