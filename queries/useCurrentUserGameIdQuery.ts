import { userAtom } from "@/atoms";
import { firestore } from "@/config";
import { QUERY_KEY, UseQueryWrapperProps } from "@/queries/queryKey";
import { GameStatus } from "@/schema";
import { query, where, collection, getDocs } from "firebase/firestore";
import { useAtomValue } from "jotai";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";

type CurrentUserGameIdQueryDataType = {
  id: string | null;
};

export type UseCurrentUserGameIdProps = {
  query?: UseQueryWrapperProps<CurrentUserGameIdQueryDataType>;
};

export const useCurrentUserGameIdQuery = (
  props?: UseCurrentUserGameIdProps
) => {
  const user = useAtomValue(userAtom);

  return useQuery<CurrentUserGameIdQueryDataType>({
    queryKey: [QUERY_KEY.USER_CURRENT_GAME_ID, user?.uid],
    queryFn: async ({ queryKey }) => {
      const empty = {
        id: null,
      };

      if (!queryKey[1]) {
        return empty;
      }

      const games = collection(firestore, "games");

      const q = query(
        games,
        where("playerIds", "array-contains", queryKey[1]),
        where("status", "in", [GameStatus.waiting, GameStatus.started])
      );

      const data = await getDocs(q);

      if (data.empty) {
        return empty;
      }

      const game = data.docs[0];

      return { id: game.id };
    },
    refetchOnMount: false,

    ...props?.query,
  });
};
