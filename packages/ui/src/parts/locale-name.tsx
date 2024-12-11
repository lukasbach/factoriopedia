import { FC } from "react";
import { DumpType } from "@factorioui/data";
import { useFactorioData } from "../components/data-provider";

export const keyRemap = {
  planet: "space-location",
} as any;

export const useLocaleName = (type: keyof DumpType["entries"], name: string) =>
  useFactorioData().locales[keyRemap[type] ?? type]?.names[name] ?? name;

export const LocaleName: FC<{
  type: keyof DumpType["entries"] | string;
  name: string;
}> = ({ type, name }) => (
  <>{useFactorioData().locales[keyRemap[type] ?? type]?.names[name] ?? name}</>
);
