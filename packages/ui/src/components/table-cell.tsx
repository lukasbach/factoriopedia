import { FC, HTMLAttributes, PropsWithChildren } from "react";
import { combine } from "../utils";
import { Surface } from "./surface";

export const TableCell: FC<
  PropsWithChildren<
    {
      sorting?: "asc" | "desc";
      onClick?: (e: unknown) => void;
      isTitle?: boolean;
      isActive?: boolean;
    } & HTMLAttributes<HTMLTableDataCellElement>
  >
> = ({ onClick, sorting, isTitle, isActive, children, ...props }) => {
  return (
    <Surface<HTMLTableDataCellElement>
      as={isTitle ? "th" : "td"}
      useGroup
      shadow="btn-small"
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
        [isActive, "!text-black"],
      )}
      onClick={onClick}
      {...props}
      color="blackDark"
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
