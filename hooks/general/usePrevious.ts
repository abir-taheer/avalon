import { useEffect, useRef } from "react";

export const usePrevious = <Type extends any>(value: Type): Type | null => {
  const ref = useRef(null);

  useEffect(() => {
    // @ts-ignore
    ref.current = value;
  }, [value]);

  return ref.current;
};
