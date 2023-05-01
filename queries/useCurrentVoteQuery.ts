import { firestore } from "@/client-config";
import { useAuth } from "@/hooks";
import { QUERY_KEY, UseQueryWrapperProps } from "@/queries/queryKey";
import { useSnapshotQuery } from "@/queries/useSnapshotQuery";
import { Vote } from "@/types/schema";
import { doc, DocumentReference } from "firebase/firestore";
import { useMemo } from "react";

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
