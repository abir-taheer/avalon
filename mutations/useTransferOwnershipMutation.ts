import { firestore } from "@/client-config";
import { MUTATION_KEY, UseMutationWrapperProps } from "@/mutations/mutationKey";
import { doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { MutationFunction, useMutation } from "react-query";

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
