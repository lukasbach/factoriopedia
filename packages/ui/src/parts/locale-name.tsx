import { FC } from "react";
import { useFactorioData } from "../components/data-provider";

export const useLocaleName = (name: string) =>
  useFactorioData().locales.names[name]?.replace(/\[entity=[^\]]+\]/, "") ??
  name;

export const LocaleName: FC<{
  name: string;
}> = ({ name }) => <>{useLocaleName(name)}</>;
