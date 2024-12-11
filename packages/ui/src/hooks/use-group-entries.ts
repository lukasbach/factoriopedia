import { useMemo } from "react";
import { FactorioType } from "@factorioui/data/src";
import { DumpType } from "@factorioui/data";
import { useFactorioData } from "../components/data-provider";

const resolveJointItemEntries = (props: {
  data: DumpType;
  group?: string;
  types: (keyof DumpType["entries"])[];
}) => {
  const entries: Record<string, FactorioType[]> = Object.fromEntries(
    Object.values(props.data.entries["item-subgroup"])
      .filter((subgroup) => !props.group || subgroup.group === props.group)
      .map((subgroup) => [subgroup.name, []]),
  );
  const ids: string[] = [];

  for (const type of props.types) {
    const addEntries = Object.values(props.data.entries[type]).filter(
      (entry) => !ids.includes(entry.name),
    );

    for (const entry of addEntries) {
      if (entries[entry.subgroup]) {
        entries[entry.subgroup].push(entry);
        ids.push(entry.name);
      }
    }
  }

  for (const [key, entry] of Object.entries(entries)) {
    if (entry.length === 0) {
      delete entries[key];
    } else {
      entry.sort((a, b) =>
        a.order && b.order ? a.order.localeCompare(b.order) : 1,
      );
    }
  }
  return entries;
};

export const useGroupEntries = (group: string) => {
  const data = useFactorioData();
  return useMemo(
    () =>
      resolveJointItemEntries({
        data,
        group,
        types: ["item", "tool", "recipe"],
      }),
    [data, group],
  );
};
