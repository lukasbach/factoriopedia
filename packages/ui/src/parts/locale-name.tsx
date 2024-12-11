import { FC } from "react";
import { useFactorioData } from "../components/data-provider";

export const keyRemap = {
  planet: "space-location",
} as any;

export const useLocaleName = (name: string) =>
  useFactorioData().locales.recipe?.names[name] ?? name;

export const LocaleName: FC<{
  name: string;
}> = ({ name }) => <>{useFactorioData().locales.recipe?.names[name] ?? name}</>;
