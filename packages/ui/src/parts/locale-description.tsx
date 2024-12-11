import { FC } from "react";
import { DumpType } from "@factorioui/data";
import { useFactorioData } from "../components/data-provider";
import { keyRemap } from "./locale-name";

export const LocaleDescription: FC<{
  type: keyof DumpType["entries"];
  name: string;
}> = ({ type, name }) => (
  <>
    {useFactorioData().locales[keyRemap[type] ?? type]?.descriptions?.[name] ??
      "No description"}
  </>
);
