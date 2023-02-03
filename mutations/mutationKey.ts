import { UseMutationOptions } from "react-query";

export enum MUTATION_KEY {
  CREATE_GAME = "MUTATION::CREATE_GAME",
  JOIN_GAME = "MUTATION::JOIN_GAME",
  LEAVE_GAME = "MUTATION::LEAVE_GAME",
  TRANSFER_OWNERSHIP = "MUTATION::TRANSFER_OWNERSHIP",
}

export type UseMutationWrapperProps<Data, Variables> = Omit<
  UseMutationOptions<Data, any, Variables>,
  "mutationKey" | "mutationFn"
>;
