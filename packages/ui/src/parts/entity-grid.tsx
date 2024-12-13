import { FC } from "react";
import { ButtonGrid } from "../components/button-grid";
import { EntityButton } from "./entity-button";

export type EntityIdentifier = { name: string; type: string };

export const EntityGrid: FC<{
  items: EntityIdentifier[][];
  activeItem?: EntityIdentifier;
  onClick?: (item: EntityIdentifier) => void;
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
      {items.map((group, idx) => (
        <div className="flex flex-wrap w-full" key={idx}>
          {group.map((item) => (
            <div key={`${item.type}-${item.name}`}>
              <EntityButton
                name={item.name}
                type={item.type}
                onClick={onClick ? () => onClick?.(item) : undefined}
                isActive={
                  activeItem &&
                  activeItem.name === item.name &&
                  activeItem.type === item.type
                }
              />
            </div>
          ))}
        </div>
      ))}
    </ButtonGrid>
  );
};
