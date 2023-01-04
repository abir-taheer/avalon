import { RealTimeUser } from "@/schema";
import { useEffect, useMemo, useState } from "react";
import { onValue, ref } from "firebase/database";
import { realtime } from "@/config";

export type UseRealTimeUserProps = {
  id: string;
};

export const useRealTimeUser = ({ id }: UseRealTimeUserProps) => {
  const [user, setUser] = useState<RealTimeUser | null>(null);
  const [loading, setLoading] = useState(true);
  const userRef = useMemo(() => ref(realtime, "/user/" + id), [id]);

  useEffect(() => {
    if (!userRef) {
      setUser(null);
      return;
    }

    const unsubscribe = onValue(
      userRef,
      async (snapshot) => {
        const data: RealTimeUser | null = snapshot.val();

        setLoading(false);
        setUser(data ?? null);
      },
      console.error
    );

    return unsubscribe;
  }, [userRef]);

  return { user, loading };
};
