import { useAPI, useAuth } from "@/hooks";
import { MUTATION_KEY, UseMutationWrapperProps } from "@/mutations/mutationKey";
import { useCallback } from "react";
import { MutationFunction, useMutation, useQueryClient } from "react-query";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/client-config";

export type UseTransferOwnershipMutationData = {
  success: true;
};
export type UseTransferOwnershipMutationVariables = {
  game: string;
  user: string;
};

export type UseTransferOwnershipMutationProps = {
  mutation?: UseMutationWrapperProps<
    UseTransferOwnershipMutationData,
    UseTransferOwnershipMutationVariables
  >;
};

export const useTransferOwnershipMutation = (
  props?: UseTransferOwnershipMutationProps
) => {
  const mutationFn: MutationFunction<
    UseTransferOwnershipMutationData,
    UseTransferOwnershipMutationVariables
  > = useCallback(async (options) => {
    const ref = doc(firestore, "games", options.game);
    await updateDoc(ref, { ownerId: options.user });
    return { success: true };
  }, []);

  return useMutation({
    mutationKey: [MUTATION_KEY.TRANSFER_OWNERSHIP],
    mutationFn,
    ...props?.mutation,
  });
};
