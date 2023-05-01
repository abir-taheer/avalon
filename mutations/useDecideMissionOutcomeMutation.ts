import * as API from "@/api-controllers";
import { useAPI } from "@/hooks";
import { MUTATION_KEY, UseMutationWrapperProps } from "@/mutations/mutationKey";
import { useCallback } from "react";
import { MutationFunction, useMutation } from "react-query";

export type UseDecideMissionOutcomeMutationData =
  API.Game.MissionOutcome.POST.Response;
export type UseDecideMissionOutcomeMutationVariables =
  API.Game.MissionOutcome.POST.BodyParams;

export type UseDecideMissionOutcomeMutationProps = {
  mutation?: UseMutationWrapperProps<
    UseDecideMissionOutcomeMutationData,
    UseDecideMissionOutcomeMutationVariables
  >;
};

export const useDecideMissionOutcomeMutation = (
  props?: UseDecideMissionOutcomeMutationProps
) => {
  const api = useAPI();

  const mutationFn: MutationFunction<
    UseDecideMissionOutcomeMutationData,
    UseDecideMissionOutcomeMutationVariables
  > = useCallback(
    async (options) => {
      const { data } = await api.post<API.Game.MissionOutcome.POST.Response>(
        "/games/mission-outcome",
        options
      );

      return data;
    },
    [api]
  );

  return useMutation({
    mutationKey: [MUTATION_KEY.MISSION_OUTCOME],
    mutationFn,
    ...props?.mutation,
  });
};
