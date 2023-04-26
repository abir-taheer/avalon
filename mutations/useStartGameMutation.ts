import * as API from "@/api-controllers";
import { useAPI } from "@/hooks";
import { MUTATION_KEY, UseMutationWrapperProps } from "@/mutations/mutationKey";
import { useCallback } from "react";
import { MutationFunction, useMutation } from "react-query";

export type UseStartGameMutationData = API.Game.Start.POST.Response;
export type UseStartGameMutationVariables = API.Game.Start.POST.BodyParams;

export type UseStartGameMutationProps = {
  mutation?: UseMutationWrapperProps<
    UseStartGameMutationData,
    UseStartGameMutationVariables
  >;
};

export const useStartGameMutation = (props?: UseStartGameMutationProps) => {
  const api = useAPI();

  const mutationFn: MutationFunction<
    UseStartGameMutationData,
    UseStartGameMutationVariables
  > = useCallback(
    async (options) => {
      const { data } = await api.post<API.Game.Start.POST.Response>(
        "/games/start",
        options
      );

      return data;
    },
    [api]
  );

  return useMutation({
    mutationKey: [MUTATION_KEY.START_GAME],
    mutationFn,
    ...props?.mutation,
  });
};
