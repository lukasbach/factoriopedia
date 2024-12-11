import { useMemo } from "react";
import { DumpType, FactorioType } from "@factorioui/data";
import { useFactorioData } from "../components/data-provider";

type ResolvementProps = {
  data: DumpType;
  group?: string;
  types: (keyof DumpType["entries"])[];
};

const resolveJointItemEntries = (props: ResolvementProps) => {
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

export const useResolveJointItemEntries = (
  props: Omit<ResolvementProps, "data">,
) => {
  const data = useFactorioData();
  return useMemo(
    () =>
      resolveJointItemEntries({
        data,
        group: props.group,
        types: props.types,
      }),
    [data, props.group, props.types],
  );
};
