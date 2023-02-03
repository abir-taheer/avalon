import * as API from "@/api-controllers";
import { useAPI, useAuth } from "@/hooks";
import { MUTATION_KEY, UseMutationWrapperProps } from "@/mutations/mutationKey";
import { QUERY_KEY } from "@/queries/queryKey";
import { useCallback } from "react";
import { MutationFunction, useMutation, useQueryClient } from "react-query";

export type UseLeaveGameMutationData = API.Game.Join.DELETE.Response;
export type UseLeaveGameMutationVariables = API.Game.Join.DELETE.BodyParams;

export type UseCreateGameMutationProps = {
  mutation?: UseMutationWrapperProps<
    UseLeaveGameMutationData,
    UseLeaveGameMutationVariables
  >;
};

export const useRemovePlayerFromGameMutation = (
  props?: UseCreateGameMutationProps
) => {
  const api = useAPI();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const mutationFn: MutationFunction<
    UseLeaveGameMutationData,
    UseLeaveGameMutationVariables
  > = useCallback(
    async (options) => {
      const { data } = await api<API.Game.Join.DELETE.Response>("/games/join", {
        method: "DELETE",
        data: options,
      });

      queryClient.setQueryData([QUERY_KEY.USER_CURRENT_GAME_ID, user?.uid], {
        id: null,
      });

      return data;
    },
    [user, queryClient, api]
  );

  return useMutation({
    mutationKey: [MUTATION_KEY.LEAVE_GAME],
    mutationFn,
    ...props?.mutation,
  });
};
