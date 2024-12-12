import { useMemo } from "react";
import { useFactorioData } from "../components/data-provider";

export const useEntriesOfType = (type: string) => {
  const { entries, typeMap } = useFactorioData();
  return useMemo(
    () => typeMap[type].map((name) => entries[name]),
    [entries, typeMap],
  );
};
