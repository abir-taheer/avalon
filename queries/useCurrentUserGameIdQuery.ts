import { firestore } from "@/client-config";
import { useAuth } from "@/hooks";
import { QUERY_KEY, UseQueryWrapperProps } from "@/queries/queryKey";
import { GameStatus } from "@/types/schema";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useQuery } from "react-query";

type CurrentUserGameIdQueryDataType = {
  id: string | null;
};

export type UseCurrentUserGameIdProps = {
  query?: UseQueryWrapperProps<CurrentUserGameIdQueryDataType>;
};

export const useCurrentUserGameIdQuery = (
  props?: UseCurrentUserGameIdProps
) => {
  const { user } = useAuth();

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
