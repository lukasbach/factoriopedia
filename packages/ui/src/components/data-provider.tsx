import {
  FC,
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { DumpType } from "@factorioui/data";

const Context = createContext<{ dump: DumpType; path: string }>(null as any);

export const useFactorioData = () => useContext(Context).dump;
export const useFactorioDataPath = () => useContext(Context).path;

export const FactorioDataProvider: FC<
  PropsWithChildren<{ path: string; loader?: ReactNode }>
> = ({ children, path, loader }) => {
  const [data, setData] = useState<DumpType | null>(null);

  useEffect(() => {
    fetch(`${path}${path === "/" ? "" : "/"}data.json`)
      .then((res) => res.json())
      .then(setData);
  }, [path]);

  if (!data) {
    return loader;
  }

  return (
    <Context.Provider value={{ dump: data, path }}>{children}</Context.Provider>
  );
};
