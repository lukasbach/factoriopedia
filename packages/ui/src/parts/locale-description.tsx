import { FC } from "react";
import { useFactorioData } from "../components/data-provider";

export const useLocaleDescription = (name: string) =>
  useFactorioData().locales.descriptions?.[name] ?? "No description";

export const LocaleDescription: FC<{
  name: string;
}> = ({ name }) => (
  <>{useFactorioData().locales.descriptions?.[name] ?? "No description"}</>
);
