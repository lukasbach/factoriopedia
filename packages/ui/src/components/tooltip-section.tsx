import { FC, PropsWithChildren } from "react";

export const TooltipSection: FC<PropsWithChildren<{ topmost?: boolean }>> = ({
  topmost,
  children,
}) => {
  return (
    <div
      className={`${topmost ? "shadow-topglow-1" : "shadow-topglow-2"} px-2 py-1`}
    >
      {children}
    </div>
  );
};
