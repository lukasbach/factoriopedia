import { FC, HTMLProps, PropsWithChildren } from "react";
import { combine } from "../utils";

type SurfaceProperties = {
  inset?: boolean;
  color?: "dark" | "medium" | "light";
};

export const Surface: FC<
  PropsWithChildren<
    {
      hover?: SurfaceProperties;
      active?: SurfaceProperties;
      isActive?: boolean;
    } & SurfaceProperties &
      HTMLProps<HTMLDivElement>
  >
> = ({ inset, color, hover, active, isActive, ...props }) => {
  const currentProps = isActive ? active : { inset, color };
  return (
    <div
      className={combine(
        props.className ?? "",
        [currentProps.inset, `shadow-inset-1`],
        [currentProps.color === "dark", `bg-bgDark`],
      )}
      {...props}
    />
  );
};
