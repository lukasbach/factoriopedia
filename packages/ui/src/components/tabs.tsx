import { FC, PropsWithChildren } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as React from "react";
import { combine } from "../utils";

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

export const TabsTriggerVisual: FC<
  PropsWithChildren<React.HTMLProps<HTMLAnchorElement> & { active?: boolean }>
> = ({ active, ...props }) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a
    className={combine(
      "px-4 pt-2 pb-2 mr-0.5",
      "rounded-tl rounded-tr font-bold shadow-topglow-1 text-sm",
      [active, "bg-blackLight translate-y-[4px] text-textBeige"],
      [
        !active,
        "bg-grayLight text-black hover:bg-orangeDark hover:shadow-orangeglow",
      ],
    )}
    {...props}
  />
);

export const TabsTrigger: FC<
  Tabs.TabsTriggerProps & React.RefAttributes<HTMLDivElement>
> = (props) => {
  return (
    <Tabs.Trigger
      className={combine(
        "bg-grayLight  data-[state=active]:bg-blackLight data-[state=active]:translate-y-[4px] px-4 pt-2 pb-2 mr-0.5",
        "rounded-tl rounded-tr font-bold shadow-topglow-1 text-black data-[state=active]:text-textBeige text-sm",
        "hover:bg-orangeDark data-[state=inactive]:hover:shadow-orangeglow",
      )}
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
