import { useMemo } from "react";
import { useFactorioData } from "../components/data-provider";

export const useEntriesByType = (type: string) => {
  const { categories, entries } = useFactorioData();
  return useMemo(
    () => categories[type].map((name: string) => entries[name]),
    [categories, entries, type],
  );
};
