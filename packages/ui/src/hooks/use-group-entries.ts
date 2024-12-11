import { useMemo } from "react";
import { useFactorioData } from "../components/data-provider";

export const useGroupEntries = (group: string) => {
  const { entries } = useFactorioData();
  return useMemo(
    () =>
      Object.values(entries.item).filter(
        (item) =>
          item.subgroup &&
          entries["item-subgroup"][item.subgroup].group === group,
      ),
    [entries, group],
  );
};
