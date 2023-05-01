import { firestore } from "@/client-config";
import { QUERY_KEY, UseQueryWrapperProps } from "@/queries/queryKey";
import { useSnapshotQuery } from "@/queries/useSnapshotQuery";
import { Game } from "@/types/schema";
import { doc, DocumentReference } from "firebase/firestore";
import { useMemo } from "react";

export type UseGameProps = {
  id: string;
  query?: UseQueryWrapperProps<Game>;
  skip?: boolean;
};

export const useGameQuery = ({ query, id, skip }: UseGameProps) => {
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
