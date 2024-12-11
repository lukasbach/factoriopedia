import { useMemo } from "react";
import { useFactorioData } from "../components/data-provider";

export const useItemGroups = () => {
  const { locales, entries } = useFactorioData();
  return useMemo(
    () =>
      Object.values(entries["item-group"]).map((category) => ({
        ...category,
        locale: locales["item-group"].names[category.name],
      })),
    [entries, locales],
  );
};
