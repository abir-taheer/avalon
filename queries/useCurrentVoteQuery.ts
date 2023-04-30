import { firestore } from "@/client-config";
import { QUERY_KEY, UseQueryWrapperProps } from "@/queries/queryKey";
import { doc, DocumentReference } from "firebase/firestore";
import { useMemo } from "react";
import { useSnapshotQuery } from "@/queries/useSnapshotQuery";
import { useAuth } from "@/hooks";
import { Vote } from "@/types/schema";

export type UseCurrentVoteProps = {
  game: string;
  round: string;
  query?: UseQueryWrapperProps<Vote>;
  skip?: boolean;
};

export const useCurrentVoteQuery = ({
  query,
  game,
  round,
  skip,
}: UseCurrentVoteProps) => {
  const queryKey = useMemo(
    () => [QUERY_KEY.CURRENT_VOTE, game, round],
    [game, round]
  );

  const { user } = useAuth();

  if (!user) {
    throw new Error("Mutation cannot be used if the user is not authenticated");
  }

  const ref = useMemo(
    () =>
      doc(
        firestore,
        "games",
        game,
        "rounds",
        round,
        "votes",
        user.uid
      ) as DocumentReference<Vote>,
    [user, game, round]
  );
  return useSnapshotQuery({
    ref,
    skip,
    queryKey,
    ...query,
  });
};
