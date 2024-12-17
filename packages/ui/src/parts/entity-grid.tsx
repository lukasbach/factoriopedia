import { FC } from "react";
import { ButtonGrid } from "../components/button-grid";
import { EntityButton } from "./entity-button";

export type EntityIdentifier = { name: string; type: string };

export const EntityGrid: FC<{
  items: EntityIdentifier[][];
  subtexts?: string[][];
  activeItem?: EntityIdentifier;
  onClick?: (item: EntityIdentifier) => void;
  gridWidth?: number;
  gridHeight?: number;
}> = ({ items, activeItem, onClick, gridHeight, gridWidth, subtexts }) => {
  return (
    <ButtonGrid
      gridWidth={gridWidth}
      gridHeight={gridHeight}
      itemWidth={38}
      itemHeight={40}
    >
      {items.map((group, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="flex flex-wrap w-full" key={idx}>
          {group.map((item, idy) => (
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
                subtext={subtexts?.[idx]?.[idy]}
              />
            </div>
          ))}
        </div>
      ))}
    </ButtonGrid>
  );
};
