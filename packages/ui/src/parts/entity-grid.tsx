import { FC } from "react";
import { DumpType } from "@factorioui/data";
import { ButtonGrid } from "../components/button-grid";
import { EntityButton } from "./entity-button";

export const EntityGrid: FC<{
  items: { type: keyof DumpType["entries"]; name: string }[][];
  activeItem?: { type: keyof DumpType["entries"]; name: string };
  onClick?: (type: keyof DumpType["entries"], name: string) => void;
  gridWidth?: number;
  gridHeight?: number;
}> = ({ items, activeItem, onClick, gridHeight, gridWidth }) => {
  return (
    <ButtonGrid
      gridWidth={gridWidth}
      gridHeight={gridHeight}
      itemWidth={38}
      itemHeight={38}
    >
      {items.map((group) => (
        <div className="flex flex-wrap">
          {group.map((item) => (
            <div key={item.name}>
              <EntityButton
                type={item.type}
                name={item.name}
                onClick={() => onClick?.(item.type, item.name)}
                isActive={
                  activeItem?.type === item.type &&
                  activeItem?.name === item.name
                }
              />
            </div>
          ))}
        </div>
      ))}
    </ButtonGrid>
  );
};
