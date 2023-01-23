import { parse } from "querystring";
import { useRouter } from "next/router";
import { useMemo } from "react";

export const useQueryStringParams = () => {
  const { asPath } = useRouter();

  return useMemo(() => {
    const queryString = asPath.split("?")[1] ?? "";

    return parse(queryString) as Record<string, string | string[]>;
  }, [asPath]);
};
