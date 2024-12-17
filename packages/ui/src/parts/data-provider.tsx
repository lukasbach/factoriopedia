import {
  FC,
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DumpType } from "@factorioui/data";
import deepmerge from "deepmerge";

const Context = createContext<{ dump: DumpType; path: string }>(null as any);

export const useFactorioData = () => useContext(Context).dump;
export const useFactorioDataPath = () => useContext(Context).path;

export const FactorioDataProvider: FC<
  PropsWithChildren<{ path: string; loader?: ReactNode }>
> = ({ children, path, loader }) => {
  const [data, setData] = useState<DumpType | null>(null);

  useEffect(() => {
    fetch(`${path}${path === "/" ? "" : "/"}data.json`)
      .then((res) => res.json() as Promise<DumpType>)
      .then((dump) => {
        for (const [key, value] of Object.entries(dump.entries)) {
          const { types, ...rest } = value;
          // eslint-disable-next-line no-param-reassign
          dump.entries[key].merged = deepmerge.all(Object.values(rest)) as any;
        }
        setData(dump);
      });
  }, [path]);
  const value = useMemo(
    () => (data ? { dump: data, path } : undefined),
    [data, path],
  );

  if (!value) {
    return loader;
  }

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const StaticFactorioDataProvider: FC<
  PropsWithChildren<{ data: DumpType; path: string }>
> = ({ children, data, path }) => (
  <Context.Provider value={useMemo(() => ({ dump: data, path }), [data, path])}>
    {children}
  </Context.Provider>
);
