import { FC, PropsWithChildren } from "react";
import { combine } from "../utils";
import { Surface } from "./surface";

export const TableCell: FC<
  PropsWithChildren<{
    sorting?: "asc" | "desc";
    onClick?: (e: unknown) => void;
    isTitle?: boolean;
    isActive?: boolean;
  }>
> = ({ onClick, sorting, isTitle, isActive, children }) => {
  return (
    <Surface
      as="td"
      useGroup
      shadow="btn-small"
      color="blackDark"
      hover={onClick && { color: "orangeDark", shadow: "btn-large" }}
      active={
        onClick || isActive
          ? { color: "orangeLight", shadow: "inset-1" }
          : undefined
      }
      isActive={isActive}
      className={combine(
        "text-white px-2 py-0.5",
        [!!onClick, "group-hover:text-black cursor-pointer"],
        [isTitle, "font-bold"],
      )}
      onClick={onClick}
    >
      {sorting && (
        <span className="mr-1 text-orangeDark text-xs">
          {sorting === "asc" && "▼"}
          {sorting === "desc" && "▲"}
        </span>
      )}
      {children}
    </Surface>
  );
};
