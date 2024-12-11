import { FC, PropsWithChildren, ReactNode } from "react";
import { ITooltip, Tooltip as ReactTooltip } from "react-tooltip";

export const Tooltip: FC<
  PropsWithChildren<{ header?: ReactNode | string } & ITooltip>
> = ({ header, ...props }) => {
  return (
    <ReactTooltip
      float
      offset={24}
      noArrow
      className="!p-0 max-w-64"
      place="bottom-end"
      delayShow={300}
      {...props}
    >
      <div className="min-w-8">
        {header && (
          <div className="bg-textBeige text-black shadow-inset-1 min-w-32 p-0.5 px-2 font-bold mb-[1px]">
            {header}
          </div>
        )}
        {props.children}
      </div>
    </ReactTooltip>
  );
};
