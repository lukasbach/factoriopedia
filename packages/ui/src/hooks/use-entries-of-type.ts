import { useMemo } from "react";
import { DumpType } from "@factorioui/data";
import { useFactorioData } from "../parts/data-provider";

export const useEntriesOfType = (
  type: string,
  filter?: (entry: DumpType["entries"][string]) => boolean,
) => {
  const { entries, typeMap } = useFactorioData();
  return useMemo(
    () =>
      typeMap[type].map((name) => entries[name]).filter(filter ?? (() => true)),
    [entries, type, typeMap],
  );
};
