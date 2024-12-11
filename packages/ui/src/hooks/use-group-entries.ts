import { useMemo } from "react";
import { useFactorioData } from "../components/data-provider";

export const useGroupEntries = (group: string) => {
  const { entries, locales } = useFactorioData();
  return useMemo(
    () =>
      Object.values(entries["item-subgroup"])
        .filter((subgroup) => subgroup.group === group)
        .map((subgroup) => ({
          ...subgroup,
          entries: [
            ...Object.values(entries.item),
            // ...Object.values(entries.recipe),
            ...Object.values(entries.tool),
          ]
            .filter((item) => item.subgroup === subgroup.name)
            // .sort((a, b) =>
            //   a.order && b.order ? a.order.localeCompare(b.order) : 1,
            // )
            .map((item) => ({
              ...item,
              locale: locales.item.names[item.name],
            })),
        })),
    [entries, group],
  );
};
