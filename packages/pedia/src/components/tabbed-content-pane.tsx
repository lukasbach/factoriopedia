import { FC, PropsWithChildren, ReactNode } from "react";
import { Surface } from "@factorioui/components";

export const TabbedContentPane: FC<
  PropsWithChildren<{ title: ReactNode; tabsList: ReactNode }>
> = ({ tabsList, title, children }) => {
  return (
    <div className="h-full flex flex-col">
      <Surface shadow="deepinset">
        <div className="py-2 px-2 text-textBeige font-bold flex items-center gap-2">
          {title}
        </div>
        {tabsList}
      </Surface>
      <Surface
        color="blackLight"
        shadow="inset-1"
        className="grow p-2 overflow-auto"
      >
        {children}
      </Surface>
    </div>
  );
};
