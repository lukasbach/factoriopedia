import { FC } from "react";
import { useFactorioData } from "../components/data-provider";
import { keyRemap } from "./locale-name";

export const useLocaleDescription = (name: string) =>
  useFactorioData().locales[keyRemap.recipe]?.descriptions?.[name] ??
  "No description";

export const LocaleDescription: FC<{
  name: string;
}> = ({ name }) => (
  <>
    {useFactorioData().locales.recipe?.descriptions?.[name] ?? "No description"}
  </>
);
