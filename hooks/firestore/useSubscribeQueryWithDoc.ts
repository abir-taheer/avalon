import { DocumentReference, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { QueryClient, QueryKey, useQueryClient } from "react-query";

export type UseDocWithSnapshotProps<T> = {
  ref: DocumentReference<T>;
  queryKey: QueryKey;
  skip?: boolean;
};

export type SubscribeQueryWithDocProps<T> = {
  queryKey: QueryKey;
  ref: DocumentReference<T>;
  queryClient: QueryClient;
};

export const subscribeQueryWithDoc = <T>({
  ref,
  queryKey,
  queryClient,
}: SubscribeQueryWithDocProps<T>) => {
  const unsubscribe = onSnapshot(
    ref,
    (snapshot) => {
      const result = snapshot.data() as T;

      queryClient.setQueryData(queryKey, result);
    },
    (error) => {
      console.error(error);
    }
  );

  return unsubscribe;
};

export const useSubscribeQueryWithDoc = <T>({
  ref,
  queryKey,
  skip,
}: UseDocWithSnapshotProps<T>) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (skip) {
      return;
    }

    return subscribeQueryWithDoc({ ref, queryKey, queryClient });
  }, [queryClient, queryKey, ref, skip]);
};
