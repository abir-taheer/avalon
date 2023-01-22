import { useEffect, useMemo } from "react";
import { QUERY_KEY, UseQueryWrapperProps } from "@/queries/queryKey";
import { doc } from "firebase/firestore";
import { firestore, realtime } from "@/config";
import { useSubscribeQueryWithDoc } from "@/hooks/firestore/useSubscribeQueryWithDoc";
import { useQuery, useQueryClient } from "react-query";
import { Game, RealTimeUser } from "@/schema";
import { onValue, ref } from "firebase/database";

export type UseRealtimeUserQueryProps = {
  id: string;
  query: UseQueryWrapperProps<RealTimeUser>;
};

export const useRealtimeUserQuery = ({
  id,
  query,
}: UseRealtimeUserQueryProps) => {
  const queryKey = useMemo(() => [QUERY_KEY.REALTIME_USER, id], [id]);
  const userRef = useMemo(() => ref(realtime, "/user/" + id), [id]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onValue(
      userRef,
      async (snapshot) => {
        const data: RealTimeUser | null = snapshot.val() ?? null;
        queryClient.setQueryData(queryKey, data);
      },
      console.error
    );

    return unsubscribe;
  }, [userRef, queryKey, queryClient]);

  return useQuery<RealTimeUser>({
    queryKey,
    ...query,
  });
};
