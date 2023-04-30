import { MUTATION_KEY, UseMutationWrapperProps } from "@/mutations/mutationKey";
import { useCallback } from "react";
import { MutationFunction, useMutation } from "react-query";
import { Game, Round, RoundStatus } from "@/types/schema";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/client-config";

export type UseSubmitTeamMutationData = null;
export type UseSubmitTeamMutationVariables = {
  round: Round["id"];
  game: Game["id"];
};

export type UseSubmitTeamMutationProps = {
  mutation?: UseMutationWrapperProps<
    UseSubmitTeamMutationData,
    UseSubmitTeamMutationVariables
  >;
};

export const useSubmitTeamMutation = (props?: UseSubmitTeamMutationProps) => {
  const mutationFn: MutationFunction<
    UseSubmitTeamMutationData,
    UseSubmitTeamMutationVariables
  > = useCallback(async (options) => {
    const ref = doc(firestore, "games", options.game, "rounds", options.round);

    const newData: Partial<Round> = {
      status: RoundStatus.voting,
    };

    await updateDoc(ref, newData);

    return null;
  }, []);

  return useMutation({
    mutationKey: [MUTATION_KEY.SUBMIT_TEAM],
    mutationFn,
    ...props?.mutation,
  });
};
