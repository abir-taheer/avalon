import { useNotifyDialog } from "@/components/dialog/ui/NotifyDialog";
import { UseQueryWrapperProps } from "@/queries/queryKey";
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  FirestoreError,
  onSnapshot,
  Query,
  QuerySnapshot,
} from "@firebase/firestore";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { QueryKey, useQuery, useQueryClient } from "react-query";

export type UseSnapshotQueryProps<Data extends DocumentData | null> = {
  ref: DocumentReference<Data> | Query<Data>;
  queryKey: QueryKey;
  skip?: boolean;

  UseQueryProps?: UseQueryWrapperProps<Data>;
};

const SnapshotListeners: { [key: string]: boolean } = {};

export const useSnapshotQuery = <Data extends DocumentData>({
  ref,
  queryKey,
  skip,
  UseQueryProps,
}: UseSnapshotQueryProps<Data>) => {
  const resolveRef = useRef((data: Data) => {});
  const dataPromise = useMemo(
    () =>
      new Promise<Data>((resolve) => {
        resolveRef.current = resolve;
      }),
    []
  );

  console.log("rendered useSnapshotQuery", queryKey);

  const openNotifyDialog = useNotifyDialog();

  const handleError = useCallback(
    async (error: FirestoreError) => {
      await openNotifyDialog({
        title: "Error",
        message: <pre>{JSON.stringify({ ...error, queryKey }, null, 2)}</pre>,
      });
    },
    [openNotifyDialog, queryKey]
  );

  const queryClient = useQueryClient();

  const handleDocumentSnapshot = useCallback(
    (snapshot: DocumentSnapshot) => {
      const data = snapshot.data() as Data;

      // If we haven't already, resolve the promise for the initial data for the queryFn
      resolveRef.current(data);

      queryClient.setQueryData(queryKey, data);
    },
    [queryClient, queryKey]
  );

  const handleQuerySnapshot = useCallback(
    (snapshot: QuerySnapshot) => {
      const data = snapshot.docs.map((doc) => doc.data() as Data[number]);

      // @ts-ignore
      // This is too much of a hassle to fix right now
      resolveRef.current(data as Data);

      queryClient.setQueryData(queryKey, data);
    },
    [queryKey, queryClient]
  );

  useEffect(() => {
    if (skip) {
      return;
    }

    const key = queryKey.toString();

    if (SnapshotListeners[key]) {
      return;
    }

    let unsubscribe = () => {};

    if (ref instanceof DocumentReference) {
      unsubscribe = onSnapshot(
        ref,
        (snapshot) => {
          handleDocumentSnapshot(snapshot);
        },
        handleError
      );
    }
    // Else we're dealing with a collection query result and need to handle an array
    else {
      unsubscribe = onSnapshot(
        ref,
        (snapshot) => {
          handleQuerySnapshot(snapshot);
        },
        handleError
      );
    }

    SnapshotListeners[key] = true;

    return () => {
      unsubscribe();
      SnapshotListeners[key] = false;
    };
  }, [
    skip,
    handleDocumentSnapshot,
    handleQuerySnapshot,
    queryClient,
    queryKey,
    ref,
    handleError,
  ]);

  return useQuery<Data>({
    queryKey,
    queryFn: () => dataPromise,
    enabled: !skip,
    cacheTime: Infinity,
    ...UseQueryProps,
  });
};

/*
Example Usage:
export const useGameQuery = ({ id, skip }: UseGameQueryProps) => {
  const queryKey = useMemo(() => [QUERY_KEY.GAME, id], [id]);
  const ref = useMemo(
    () => doc(firestore, "games", id) as DocumentReference<Game>,
    [id]
  );
  return useSnapshotQuery({
    ref,
    skip,
    queryKey,
    ...query,
  });
};
 */
