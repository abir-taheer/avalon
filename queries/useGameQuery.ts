import { firestore } from "@/config";
import { useSubscribeQueryWithDoc } from "@/hooks/firestore/useSubscribeQueryWithDoc";
import { QUERY_KEY, UseQueryWrapperProps } from "@/queries/queryKey";
import { Game } from "@/schema";
import { doc, getDoc } from "firebase/firestore";
import { useMemo } from "react";
import { useQuery } from "react-query";

export type UseGameProps = {
  id: string;
  query?: UseQueryWrapperProps<Game>;
  skip?: boolean;
};

export const useGameQuery = ({ query, id, skip }: UseGameProps) => {
  const queryKey = useMemo(() => [QUERY_KEY.GAME, id], [id]);
  const ref = useMemo(() => doc(firestore, "games", queryKey[1]), [queryKey]);

  useSubscribeQueryWithDoc({
    ref,
    queryKey,
    skip,
  });

  return useQuery<Game>({
    queryKey,
    queryFn: async () => {
      const docSnap = await getDoc(ref);
      const data = docSnap.data() as Game;
      return data ?? null;
    },
    enabled: false,
    ...query,
  });
};
