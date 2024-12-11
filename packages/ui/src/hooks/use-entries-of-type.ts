import { useMemo } from "react";
import { useFactorioData } from "../components/data-provider";

export const useEntriesOfType = (type: string) => {
  const { entries, types } = useFactorioData();
  return useMemo(
    () => types[type].map((name) => entries[name]),
    [entries, types],
  );
};
