import { FC } from "react";
import { DumpType } from "@factorioui/data";
import { useFactorioData } from "../components/data-provider";

export const keyRemap = {
  planet: "space-location",
} as any;

export const LocaleName: FC<{
  type: keyof DumpType["entries"];
  name: string;
}> = ({ type, name }) => (
  <>{useFactorioData().locales[keyRemap[type] ?? type]?.names[name] ?? name}</>
);
