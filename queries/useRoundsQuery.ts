import { firestore } from "@/client-config";
import { QUERY_KEY, UseQueryWrapperProps } from "@/queries/queryKey";
import { Game, Round } from "@/types/schema";
import { collection, orderBy, query } from "firebase/firestore";
import { useMemo } from "react";
import { useSnapshotQuery } from "@/queries/useSnapshotQuery";
import { Query } from "@firebase/firestore";

export type UseRoundsProps = {
  game: Game["id"];
  query?: UseQueryWrapperProps<Round[]>;
  skip?: boolean;
};

export const useRoundsQuery = ({
  query: queryProps,
  game,
  skip,
}: UseRoundsProps) => {
  const queryKey = useMemo(() => [QUERY_KEY.ROUNDS, game], [game]);

  const ref = useMemo(
    () =>
      query(
        collection(firestore, "games", game, "rounds"),
        orderBy("createdAt")
      ) as Query<Round[]>,
    [game]
  );

  return useSnapshotQuery({
    ref,
    queryKey,
    skip,
    UseQueryProps: queryProps,
  });
};
