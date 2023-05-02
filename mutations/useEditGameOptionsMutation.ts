import * as API from "@/api-controllers";
import { useAPI } from "@/hooks";
import { MUTATION_KEY, UseMutationWrapperProps } from "@/mutations/mutationKey";
import { useCallback } from "react";
import { MutationFunction, useMutation } from "react-query";

export type UseEditGameOptionsMutationData = API.Game.PATCH.Response;
export type UseEditGameOptionsMutationVariables = API.Game.PATCH.BodyParams;

export type UseEditGameOptionsMutationProps = {
  mutation?: UseMutationWrapperProps<
    UseEditGameOptionsMutationData,
    UseEditGameOptionsMutationVariables
  >;
};

export const useEditGameOptionsMutation = (
  props?: UseEditGameOptionsMutationProps
) => {
  const api = useAPI();

  const mutationFn: MutationFunction<
    UseEditGameOptionsMutationData,
    UseEditGameOptionsMutationVariables
  > = useCallback(
    async (options) => {
      const { data } = await api.patch<API.Game.PATCH.Response>(
        "/games",
        options
      );

      return data;
    },
    [api]
  );

  return useMutation({
    mutationKey: [MUTATION_KEY.UPDATE_GAME_OPTIONS],
    mutationFn,
    ...props?.mutation,
  });
};
