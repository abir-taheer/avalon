import { firestore } from "@/client-config";
import { QUERY_KEY, UseQueryWrapperProps } from "@/queries/queryKey";
import { useSnapshotQuery } from "@/queries/useSnapshotQuery";
import { Game, Round } from "@/types/schema";
import { doc, DocumentReference } from "firebase/firestore";
import { useMemo } from "react";

export type UseRoundProps = {
  game: string;
  round: string;
  query?: UseQueryWrapperProps<Game>;
  skip?: boolean;
};

export const useRoundQuery = ({ query, game, round, skip }: UseRoundProps) => {
  const queryKey = useMemo(() => [QUERY_KEY.ROUND, game, round], [game, round]);

  const ref = useMemo(
    () =>
      doc(
        firestore,
        "games",
        game,
        "rounds",
        round
      ) as DocumentReference<Round>,
    [game, round]
  );
  return useSnapshotQuery({
    ref,
    skip,
    queryKey,
    ...query,
  });
};
