import { useMemo } from "react";
import { useFactorioData } from "../parts/data-provider";

type ResolvementProps = {
  group: string;
  types?: string[];
};

export const useResolveJointItemEntries = (props: ResolvementProps) => {
  const data = useFactorioData();
  return useMemo(
    () =>
      data.groupMap[props.group]
        .map((subgroup) => {
          return data.subgroupMap[subgroup]
            ?.filter(
              (entry) => !props.types || props.types.includes(entry.type),
            )
            ?.map((entry) => {
              return {
                entry: data.entries[entry.name],
                name: entry.name,
                type: entry.type,
              };
            });
          // .filter(
          //   (entry) =>
          //     !props.types ||
          //     entry.types.some((type) => props.types?.includes(type)),
          // ) ?? []
        })
        .filter((subgroup) => subgroup && subgroup.length > 0),
    [data, props.group, props.types],
  );
};
