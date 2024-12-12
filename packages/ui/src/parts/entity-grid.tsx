import { FC } from "react";
import { ButtonGrid } from "../components/button-grid";
import { EntityButton } from "./entity-button";

export const EntityGrid: FC<{
  items: string[][];
  activeItem?: string;
  onClick?: (name: string) => void;
  gridWidth?: number;
  gridHeight?: number;
}> = ({ items, activeItem, onClick, gridHeight, gridWidth }) => {
  return (
    <ButtonGrid
      gridWidth={gridWidth}
      gridHeight={gridHeight}
      itemWidth={38}
      itemHeight={40}
    >
      {items.map((group) => (
        <div className="flex flex-wrap w-full">
          {group.map((item) => (
            <div key={item}>
              <EntityButton
                name={item}
                onClick={() => onClick?.(item)}
                isActive={activeItem === item}
              />
            </div>
          ))}
        </div>
      ))}
    </ButtonGrid>
  );
};
