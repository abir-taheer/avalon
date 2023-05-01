import { firestore } from "@/client-config";
import { MUTATION_KEY, UseMutationWrapperProps } from "@/mutations/mutationKey";
import { Game, RealTimeUser, Round } from "@/types/schema";
import { doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { MutationFunction, useMutation } from "react-query";

export type UseUpdateTeamMutationData = null;
export type UseUpdateTeamMutationVariables = {
  round: Round["id"];
  game: Game["id"];
  team: Array<RealTimeUser["uid"]>;
};

export type UseUpdateTeamMutationProps = {
  mutation?: UseMutationWrapperProps<
    UseUpdateTeamMutationData,
    UseUpdateTeamMutationVariables
  >;
};

export const useUpdateTeamMutation = (props?: UseUpdateTeamMutationProps) => {
  const mutationFn: MutationFunction<
    UseUpdateTeamMutationData,
    UseUpdateTeamMutationVariables
  > = useCallback(async (options) => {
    const ref = doc(firestore, "games", options.game, "rounds", options.round);

    const newData: Partial<Round> = {
      teamPlayerIds: options.team,
    };

    await updateDoc(ref, newData);

    return null;
  }, []);

  return useMutation({
    mutationKey: [MUTATION_KEY.UPDATE_TEAM],
    mutationFn,
    ...props?.mutation,
  });
};
