import * as API from "@/api-controllers";
import { userAtom } from "@/atoms";
import { useAPI } from "@/hooks";
import { MUTATION_KEY, UseMutationWrapperProps } from "@/mutations/mutationKey";
import { QUERY_KEY } from "@/queries/queryKey";
import { useAtomValue } from "jotai";
import { useCallback } from "react";
import { MutationFunction, useMutation, useQueryClient } from "react-query";

export type UseCreateGameMutationData = API.Game.POST.Response;
export type UseCreateGameMutationVariables = API.Game.POST.BodyParams;

export type UseCreateGameMutationProps = {
  mutation?: UseMutationWrapperProps<
    UseCreateGameMutationData,
    UseCreateGameMutationVariables
  >;
};

export const useCreateGameMutation = (props?: UseCreateGameMutationProps) => {
  const api = useAPI();
  const queryClient = useQueryClient();
  const user = useAtomValue(userAtom);

  const mutationFn: MutationFunction<
    UseCreateGameMutationData,
    UseCreateGameMutationVariables
  > = useCallback(
    async (options) => {
      const { data } = await api.post<API.Game.POST.Response>(
        "/games",
        options
      );

      queryClient.setQueryData(
        [QUERY_KEY.USER_CURRENT_GAME_ID, user?.uid],
        data
      );

      return data;
    },
    [user, queryClient, api]
  );

  return useMutation({
    mutationKey: [MUTATION_KEY.CREATE_GAME],
    mutationFn,
    ...props?.mutation,
  });
};
