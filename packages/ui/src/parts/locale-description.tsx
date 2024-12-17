import { FC } from "react";
import { useFactorioData } from "./data-provider";

export const useLocaleDescription = (name: string) =>
  useFactorioData().locales.descriptions?.[name];

export const LocaleDescription: FC<{
  name: string;
}> = ({ name }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>{useFactorioData().locales.descriptions?.[name] ?? "No description"}</>
);
