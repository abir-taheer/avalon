import { firestore } from "@/client-config";
import { useSubscribeQueryWithDoc } from "@/hooks/firestore/useSubscribeQueryWithDoc";
import { QUERY_KEY, UseQueryWrapperProps } from "@/queries/queryKey";
import { Role } from "@/types/schema";
import { doc, getDoc } from "firebase/firestore";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useAuth } from "@/hooks";

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
    () => doc(firestore, "games", game, "roles", user.uid),
    [game, user]
  );

  useSubscribeQueryWithDoc({
    ref,
    queryKey,
    skip,
  });

  return useQuery<Role>({
    queryKey,
    queryFn: async () => {
      const docSnap = await getDoc(ref);
      const data = docSnap.data() as Role;
      return data ?? null;
    },
    enabled: false,
    ...query,
  });
};
