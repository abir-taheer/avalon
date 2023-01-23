import { useRouter } from "next/router";
import { useMemo } from "react";

const extractParamsFromAsPath = (asPath: string, route: string) => {
  const routeParts = route.split("/");
  const asPathParts = asPath.split("/");
  const params: Record<string, string> = {};

  const paramRegex = /(\[.*?])/g;

  routeParts.forEach((routePart, index) => {
    const isParam = paramRegex.test(routePart);

    if (isParam) {
      const param = routePart.replace(/^\[/, "").replace(/]$/, "");
      params[param] = asPathParts[index];
    }
  });

  return params;
};

export const usePathParams = <Expected extends Record<string, string>>() => {
  const { query, isReady, asPath, route } = useRouter();

  return useMemo(
    () => (isReady ? query : extractParamsFromAsPath(asPath, route)),
    [query, isReady, asPath, route]
  ) as Expected;
};
