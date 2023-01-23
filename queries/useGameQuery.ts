import { doc, getDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { firestore } from "@/config";
import {
  subscribeQueryWithDoc,
  useSubscribeQueryWithDoc,
} from "@/hooks/firestore/useSubscribeQueryWithDoc";
import { Game } from "@/schema";
import { useQuery } from "react-query";
import { QUERY_KEY, UseQueryWrapperProps } from "@/queries/queryKey";

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
