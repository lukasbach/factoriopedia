export type FactorioType = {
  type: string;
  name: string;
  hidden: boolean;
  order: string;
  subgroup: string;
  [key: string]: any;
};

export type DumpType = {
  entries: Record<
    string,
    {
      merged: FactorioType;
      types: string[];
    } & { [type: string]: FactorioType }
  >;
  typeMap: Record<string, string[]>;
  subgroupMap: Record<string, { name: string; type: string }[]>;
  groupMap: Record<string, string[]>;
  locales: {
    names: Record<string, string>;
    descriptions: Record<string, string>;
  };
  spriteMap: Record<
    string,
    Record<string, { x: number; y: number; width: number; height: number }>
  >;
  spriteMapSizes: Record<string, { width: number; height: number }>;
};
