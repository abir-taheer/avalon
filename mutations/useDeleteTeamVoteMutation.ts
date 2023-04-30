import * as API from "@/api-controllers";
import { useAPI } from "@/hooks";
import { MUTATION_KEY, UseMutationWrapperProps } from "@/mutations/mutationKey";
import { useCallback } from "react";
import { MutationFunction, useMutation } from "react-query";

export type UseDeleteTeamVoteMutationData = API.Game.Vote.DELETE.Response;
export type UseDeleteTeamVoteMutationVariables =
  API.Game.Vote.DELETE.BodyParams;

export type UseDeleteTeamVoteMutationProps = {
  mutation?: UseMutationWrapperProps<
    UseDeleteTeamVoteMutationData,
    UseDeleteTeamVoteMutationVariables
  >;
};

export const useDeleteTeamVoteMutation = (
  props?: UseDeleteTeamVoteMutationProps
) => {
  const api = useAPI();

  const mutationFn: MutationFunction<
    UseDeleteTeamVoteMutationData,
    UseDeleteTeamVoteMutationVariables
  > = useCallback(
    async (options) => {
      const { data } = await api.delete<API.Game.Vote.DELETE.Response>(
        "/games/vote",
        {
          data: options,
        }
      );

      return data;
    },
    [api]
  );

  return useMutation({
    mutationKey: [MUTATION_KEY.DELETE_TEAM_VOTE],
    mutationFn,
    ...props?.mutation,
  });
};
