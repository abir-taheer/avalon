import * as API from "@/api-controllers";
import { useAPI } from "@/hooks";
import { MUTATION_KEY, UseMutationWrapperProps } from "@/mutations/mutationKey";
import { useCallback } from "react";
import { MutationFunction, useMutation } from "react-query";

export type UseTeamVoteMutationData = API.Game.Vote.POST.Response;
export type UseTeamVoteMutationVariables = API.Game.Vote.POST.BodyParams;

export type UseTeamVoteMutationProps = {
  mutation?: UseMutationWrapperProps<
    UseTeamVoteMutationData,
    UseTeamVoteMutationVariables
  >;
};

export const useTeamVoteMutation = (props?: UseTeamVoteMutationProps) => {
  const api = useAPI();

  const mutationFn: MutationFunction<
    UseTeamVoteMutationData,
    UseTeamVoteMutationVariables
  > = useCallback(
    async (options) => {
      const { data } = await api.post<API.Game.Vote.POST.Response>(
        "/games/vote",
        options
      );

      return data;
    },
    [api]
  );

  return useMutation({
    mutationKey: [MUTATION_KEY.TEAM_VOTE],
    mutationFn,
    ...props?.mutation,
  });
};
