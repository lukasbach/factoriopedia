import { FC } from "react";
import { DumpType } from "@factorioui/data";
import { useFactorioData } from "../components/data-provider";
import { keyRemap } from "./locale-name";

export const useLocaleDescription = (
  type: keyof DumpType["entries"] | string,
  name: string,
) =>
  useFactorioData().locales[keyRemap[type] ?? type]?.descriptions?.[name] ??
  "No description";

export const LocaleDescription: FC<{
  type: keyof DumpType["entries"] | string;
  name: string;
}> = ({ type, name }) => (
  <>
    {useFactorioData().locales[keyRemap[type] ?? type]?.descriptions?.[name] ??
      "No description"}
  </>
);
