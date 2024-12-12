import { useMemo } from "react";
import { useFactorioData } from "../components/data-provider";

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
          console.log(subgroup);
          return (
            data.subgroupMap[subgroup]
              ?.map((entry) => {
                return data.entries[entry.name];
              })
              .filter(
                (entry) =>
                  !props.types ||
                  entry.types.some((type) => props.types?.includes(type)),
              ) ?? []
          );
        })
        .filter((subgroup) => subgroup.length > 0),
    [data, props.group, props.types],
  );
};
