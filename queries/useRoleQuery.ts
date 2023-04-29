import { firestore } from "@/client-config";
import { QUERY_KEY, UseQueryWrapperProps } from "@/queries/queryKey";
import { Role } from "@/types/schema";
import { doc, DocumentReference } from "firebase/firestore";
import { useMemo } from "react";
import { useAuth } from "@/hooks";
import { useSnapshotQuery } from "@/queries/useSnapshotQuery";

export type UseRoleProps = {
  game: string;
  query?: UseQueryWrapperProps<Role>;
  skip?: boolean;
};

export const useRoleQuery = ({ query, game, skip }: UseRoleProps) => {
  const { user } = useAuth();

  if (!user) {
    throw new Error("Tried to call useRoleQuery in an unauthenticated context");
  }

  const queryKey = useMemo(
    () => [QUERY_KEY.GAME, game, user.uid],
    [game, user]
  );

  const ref = useMemo(
    () =>
      doc(
        firestore,
        "games",
        game,
        "roles",
        user.uid
      ) as DocumentReference<Role>,
    [game, user]
  );

  return useSnapshotQuery({
    ref,
    queryKey,
    skip,
    UseQueryProps: query,
  });
};
