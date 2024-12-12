import { useMemo } from "react";
import { DumpType, FactorioType } from "@factorioui/data";
import { useFactorioData } from "../components/data-provider";

type ResolvementProps = {
  data: DumpType;
  group?: string;
  types: string[];
};

const resolveJointItemEntries = (props: ResolvementProps) => {
  const entries: Record<string, FactorioType[]> = Object.fromEntries(
    Object.values(props.data.types["item-subgroup"])
      .filter(
        (subgroup) =>
          !props.group || props.data.entries[subgroup].group === props.group,
      )
      .map((subgroup) => [subgroup, []]),
  );

  for (const entry of Object.values(props.data.entries)) {
    if (!((entry.subgroup ?? "") in entries)) continue;
    if (entries[entry.subgroup as string].includes(entry)) continue;
    entries[entry.subgroup as string].push(entry);
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
