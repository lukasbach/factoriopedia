import { useMemo } from "react";
import { useFactorioData } from "../components/data-provider";
import { useEntriesByType } from "./use-entries-by-type";

export const useItemCategories = () => {
  const { locales } = useFactorioData();
  const categories = useEntriesByType("item-group");
  return useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        locale: locales["item-group"].names[category.name],
      })),
    [categories, locales],
  );
};
