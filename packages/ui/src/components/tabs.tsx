import { FC } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as React from "react";

export const TabsRoot: FC<
  Tabs.TabsProps & React.RefAttributes<HTMLDivElement>
> = (props) => {
  return <Tabs.Root {...props} />;
};

export const TabsList: FC<
  Tabs.TabsListProps & React.RefAttributes<HTMLDivElement>
> = (props) => {
  return <Tabs.TabsList {...props} />;
};

export const TabsTrigger: FC<
  Tabs.TabsTriggerProps & React.RefAttributes<HTMLDivElement>
> = (props) => {
  return (
    <Tabs.Trigger
      className={[
        "bg-grayLight  data-[state=active]:bg-blackLight data-[state=active]:translate-y-[4px] px-4 pt-2 pb-2 mr-0.5",
        "rounded-tl rounded-tr font-bold shadow-topglow-1 text-black data-[state=active]:text-textBeige text-sm",
      ].join(" ")}
      {...props}
      ref={undefined}
    />
  );
};

export const TabsContent: FC<
  Tabs.TabsContentProps & React.RefAttributes<HTMLDivElement>
> = (props) => {
  return <Tabs.Content {...props} />;
};
