import { FC, HTMLProps, PropsWithChildren } from "react";
import { combine } from "../utils";

type SurfaceProperties = {
  shadow?: "btn1";
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
> = ({ shadow, color, hover, active, isActive, ...props }) => {
  const currentProps = isActive && active ? active : { shadow, color };
  return (
    <div
      {...props}
      className={combine(
        props.className ?? "",
        [currentProps.shadow === "btn1", `shadow-btn1`],
        [currentProps.color === "dark", `bg-bgDark`],
      )}
    />
  );
};
