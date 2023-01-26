import { userAtom } from "@/atoms";
import { useAPI } from "@/hooks";
import { MUTATION_KEY, UseMutationWrapperProps } from "@/mutations/mutationKey";
import { POST_GamesAPIResponse } from "@/pages/api/games";
import { QUERY_KEY } from "@/queries/queryKey";
import { GameOptions } from "@/schema";
import { useAtomValue } from "jotai";
import { useCallback } from "react";
import { useMutation, MutationFunction, useQueryClient } from "react-query";

export type UseCreateGameMutationData = {
  id: string;
};

export type UseCreateGameMutationVariables = GameOptions;

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
      const { data } = await api.post<POST_GamesAPIResponse>("/games", options);

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
