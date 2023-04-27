import { firestore } from "@/client-config";
import { useSubscribeQueryWithDoc } from "@/hooks/firestore/useSubscribeQueryWithDoc";
import { QUERY_KEY, UseQueryWrapperProps } from "@/queries/queryKey";
import { Game, Round } from "@/types/schema";
import { doc, getDoc } from "firebase/firestore";
import { useMemo } from "react";
import { useQuery } from "react-query";

export type UseRoundProps = {
  game: Game["id"];
  round: Round["id"];
  query?: UseQueryWrapperProps<Round>;
  skip?: boolean;
};

export const useRoundQuery = ({ query, game, round, skip }: UseRoundProps) => {
  const queryKey = useMemo(() => [QUERY_KEY.ROUND, game, round], [game, round]);

  const ref = useMemo(
    () => doc(firestore, "games", game, "rounds", round),
    [game, round]
  );

  useSubscribeQueryWithDoc({
    ref,
    queryKey,
    skip,
  });

  return useQuery<Round>({
    queryKey,
    queryFn: async () => {
      const docSnap = await getDoc(ref);
      const data = docSnap.data() as Round;
      return data ?? null;
    },
    enabled: false,
    ...query,
  });
};
