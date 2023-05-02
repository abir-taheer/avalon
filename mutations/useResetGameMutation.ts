import * as API from "@/api-controllers";
import { useAPI } from "@/hooks";
import { MUTATION_KEY, UseMutationWrapperProps } from "@/mutations/mutationKey";
import { useCallback } from "react";
import { MutationFunction, useMutation } from "react-query";

export type UseResetGameMutationData = API.Game.Reset.POST.Response;
export type UseResetGameMutationVariables = API.Game.Reset.POST.BodyParams;

export type UseResetGameMutationProps = {
  mutation?: UseMutationWrapperProps<
    UseResetGameMutationData,
    UseResetGameMutationVariables
  >;
};

export const useResetGameMutation = (props?: UseResetGameMutationProps) => {
  const api = useAPI();

  const mutationFn: MutationFunction<
    UseResetGameMutationData,
    UseResetGameMutationVariables
  > = useCallback(
    async (options) => {
      const { data } = await api.post<API.Game.Reset.POST.Response>(
        "/games/reset",
        options
      );

      return data;
    },
    [api]
  );

  return useMutation({
    mutationKey: [MUTATION_KEY.RESET_GAME],
    mutationFn,
    ...props?.mutation,
  });
};
