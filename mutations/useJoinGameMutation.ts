import * as API from "@/api-controllers";
import { userAtom } from "@/atoms";
import { useAPI } from "@/hooks";
import { MUTATION_KEY, UseMutationWrapperProps } from "@/mutations/mutationKey";
import { QUERY_KEY } from "@/queries/queryKey";
import { useAtomValue } from "jotai";
import { useCallback } from "react";
import { MutationFunction, useMutation, useQueryClient } from "react-query";

export type UseJoinGameMutationData = API.Game.Join.POST.Response;
export type UseJoinGameMutationVariables = API.Game.Join.POST.BodyParams;

export type UseCreateGameMutationProps = {
  mutation?: UseMutationWrapperProps<
    UseJoinGameMutationData,
    UseJoinGameMutationVariables
  >;
};

export const useJoinGameMutation = (props?: UseCreateGameMutationProps) => {
  const api = useAPI();
  const queryClient = useQueryClient();
  const user = useAtomValue(userAtom);

  const mutationFn: MutationFunction<
    UseJoinGameMutationData,
    UseJoinGameMutationVariables
  > = useCallback(
    async (options) => {
      const { data } = await api.post<API.Game.Join.POST.Response>(
        "/games/join",
        options
      );

      queryClient.setQueryData([QUERY_KEY.USER_CURRENT_GAME_ID, user?.uid], {
        id: options.game,
      });

      return data;
    },
    [user, queryClient, api]
  );

  return useMutation({
    mutationKey: [MUTATION_KEY.JOIN_GAME],
    mutationFn,
    ...props?.mutation,
  });
};
