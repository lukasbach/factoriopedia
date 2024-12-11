import { FC } from "react";
import { useItemGroups } from "../hooks/use-item-groups";
import { Surface } from "../components/surface";
import { FactorioImage } from "../components/factorio-image";
import { EntityGrid } from "../components/entity-grid";

export const GroupTabs: FC<{
  gridWidth: number;
  selectedGroup: string | undefined;
  onSelectGroup: (group: string) => void;
}> = ({ gridWidth, onSelectGroup, selectedGroup }) => {
  const groups = useItemGroups();
  return (
    <EntityGrid
      gridWidth={gridWidth}
      gridHeight={4}
      itemWidth={96}
      itemHeight={110}
    >
      {groups.map((group) => (
        <Surface<HTMLButtonElement>
          as="button"
          key={group.name}
          shadow="btn-large"
          color="grayLight"
          hover={{ color: "orangeDark", shadow: "orangeglow" }}
          active={{ color: "orangeLight", shadow: "deepinset" }}
          className="p-3 flex w-[96px] h-[110px] items-center justify-center"
          isActive={selectedGroup === group.name}
          onClick={() => onSelectGroup(group.name)}
        >
          <FactorioImage image={group.name} width={64} category="item-group" />
        </Surface>
      ))}
    </EntityGrid>
  );
};
