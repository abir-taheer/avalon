import { UseMutationOptions } from "react-query";

export enum MUTATION_KEY {
  CREATE_GAME = "MUTATION::CREATE_GAME",
}

export type UseMutationWrapperProps<Data, Variables> = Omit<
  UseMutationOptions<Data, any, Variables>,
  "mutationKey" | "mutationFn"
>;
