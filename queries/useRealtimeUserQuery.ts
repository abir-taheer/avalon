import { realtime } from "@/client-config";
import { QUERY_KEY, UseQueryWrapperProps } from "@/queries/queryKey";
import { RealTimeUser } from "@/types/schema";
import { onValue, ref } from "firebase/database";
import { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";

export type UseRealtimeUserQueryProps = {
  id: string;
  query?: UseQueryWrapperProps<RealTimeUser>;
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
