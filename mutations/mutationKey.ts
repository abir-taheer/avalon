import { UseMutationOptions } from "react-query";

export enum MUTATION_KEY {
  CREATE_GAME = "MUTATION::CREATE_GAME",
  JOIN_GAME = "MUTATION::JOIN_GAME",
  LEAVE_GAME = "MUTATION::LEAVE_GAME",

  START_GAME = "MUTATION::START_GAME",
  TEAM_VOTE = "MUTATION::TEAM_VOTE",
  DELETE_TEAM_VOTE = "MUTATION::DELETE_TEAM_VOTE",

  UPDATE_TEAM = "MUTATION::UPDATE_TEAM",
  SUBMIT_TEAM = "MUTATION::SUBMIT_TEAM",
  TRANSFER_OWNERSHIP = "MUTATION::TRANSFER_OWNERSHIP",
}

export type UseMutationWrapperProps<Data, Variables> = Omit<
  UseMutationOptions<Data, any, Variables>,
  "mutationKey" | "mutationFn"
>;
