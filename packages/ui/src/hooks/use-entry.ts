import { useFactorioData } from "../parts/data-provider";

export const useEntry = (name: string, type?: string) => {
  const data = useFactorioData();
  const entry = data.entries[name];
  return !type || entry[type] ? entry : undefined;
};
