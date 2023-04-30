import { firestore } from "@/client-config";
import { QUERY_KEY, UseQueryWrapperProps } from "@/queries/queryKey";
import { Vote } from "@/types/schema";
import { collection, Query, query } from "firebase/firestore";
import { useMemo } from "react";
import { useSnapshotQuery } from "@/queries/useSnapshotQuery";

export type UseRoundVotesProps = {
  game: string;
  round: string;
  query?: UseQueryWrapperProps<Vote[]>;
  skip?: boolean;
};

export const useRoundVotesQuery = ({
  query: UseQueryProps,
  game,
  round,
  skip,
}: UseRoundVotesProps) => {
  const queryKey = useMemo(
    () => [QUERY_KEY.ROUND_VOTES, game, round],
    [game, round]
  );

  const ref = useMemo(
    () =>
      query(
        collection(firestore, "games", game, "rounds", round, "votes")
      ) as Query<Vote[]>,
    [game, round]
  );

  return useSnapshotQuery({
    ref,
    queryKey,
    skip,
    UseQueryProps,
  });
};
