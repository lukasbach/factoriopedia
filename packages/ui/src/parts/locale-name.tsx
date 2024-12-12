import { FC } from "react";
import { useFactorioData } from "../components/data-provider";

export const useLocaleName = (name: string) =>
  useFactorioData().locales.names[name] ?? name;

export const LocaleName: FC<{
  name: string;
}> = ({ name }) => <>{useFactorioData().locales.names[name] ?? name}</>;
