import { MUTATION_KEY, UseMutationWrapperProps } from "@/mutations/mutationKey";
import { useCallback } from "react";
import { MutationFunction, useMutation } from "react-query";
import * as API from "@/api-controllers";
import { useAPI } from "@/hooks";

export type UseGuessMerlinMutationData = API.Game.GuessMerlin.POST.Response;
export type UseGuessMerlinMutationVariables =
  API.Game.GuessMerlin.POST.BodyParams;

export type UseGuessMerlinMutationProps = {
  mutation?: UseMutationWrapperProps<
    UseGuessMerlinMutationData,
    UseGuessMerlinMutationVariables
  >;
};

export const useGuessMerlinMutation = (props?: UseGuessMerlinMutationProps) => {
  const api = useAPI();

  const mutationFn: MutationFunction<
    UseGuessMerlinMutationData,
    UseGuessMerlinMutationVariables
  > = useCallback(
    async (options) => {
      const { data } = await api.post<API.Game.GuessMerlin.POST.Response>(
        "/games/guess-merlin",
        options
      );

      return data;
    },
    [api]
  );

  return useMutation({
    mutationKey: [MUTATION_KEY.GUESS_MERLIN],
    mutationFn,
    ...props?.mutation,
  });
};
