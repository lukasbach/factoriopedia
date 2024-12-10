import { useMemo } from "react";
import { useEntriesByType } from "./use-entries-by-type";
import { useFactorioData } from "../components/data-provider";

export const useItemsInCategory = (category: string) => {
  const { entries } = useFactorioData();
  const items = useEntriesByType("item");
  const subgroups = useEntriesByType("item-subgroup");
  return useMemo(
    () =>
      items.filter(
        (item) =>
          item.type === "item" &&
          item.subgroup &&
          subgroups[item.subgroup].group === category,
      ),
    [items, category],
  );
};
