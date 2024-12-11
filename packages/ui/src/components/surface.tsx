import { FC, HTMLProps, PropsWithChildren } from "react";
import { combine } from "../utils";

type SurfaceProperties = {
  shadow?:
    | "btn-small"
    | "orangeglow"
    | "deepinset"
    | "btn-large"
    | "topglow-1"
    | "topglow-2"
    | "inset-1";
  color?:
    | "blackDark"
    | "blackMedium"
    | "blackLight"
    | "grayLight"
    | "orangeDark"
    | "orangeLight";
};

/*
  For tailwind generation:
  className="shadow-btn-small shadow-btn-large shadow-orangeglow shadow-deepinset"
  className="hover:shadow-btn-small hover:shadow-btn-large hover:shadow-orangeglow hover:shadow-deepinset"
  className="active:shadow-btn-small active:shadow-btn-large active:shadow-orangeglow active:shadow-deepinset"
  className="bg-blackDark bg-blackMedium bg-blackLight bg-grayLight bg-orangeDark bg-orangeLight"
  className="hover:bg-blackDark hover:bg-blackMedium hover:bg-blackLight hover:bg-grayLight hover:bg-orangeDark hover:bg-orangeLight"
  className="active:bg-blackDark active:bg-blackMedium active:bg-blackLight active:bg-grayLight active:bg-orangeDark active:bg-orangeLight"
 */

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
        [!!currentProps.shadow, `shadow-${currentProps.shadow}`],
        [!!currentProps.color, `bg-${currentProps.color}`],
        [!!hover?.color, `hover:bg-${hover?.color}`],
        [!!hover?.shadow, `hover:shadow-${hover?.shadow}`],
        [!!active?.color, `active:bg-${active?.color}`],
        [!!active?.shadow, `active:shadow-${active?.shadow}`],
      )}
    />
  );
};
