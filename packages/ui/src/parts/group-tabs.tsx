import { FC } from "react";
import { useItemGroups } from "../hooks/use-item-groups";
import { Surface } from "../components/surface";
import { FactorioImage } from "../components/factorio-image";
import { ButtonGrid } from "../components/button-grid";

export const GroupTabs: FC<{
  gridWidth: number;
  selectedGroup: string | undefined;
  onSelectGroup: (group: string) => void;
}> = ({ gridWidth, onSelectGroup, selectedGroup }) => {
  const groups = useItemGroups();
  return (
    <ButtonGrid gridWidth={gridWidth} itemWidth={80} itemHeight={96}>
      {groups.map((group) => (
        <Surface<HTMLButtonElement>
          as="button"
          key={group.name}
          shadow="btn-large"
          color="grayLight"
          hover={{ color: "orangeDark", shadow: "orangeglow" }}
          active={{ color: "orangeLight", shadow: "deepinset" }}
          className="p-3 flex w-[80px] h-[96px] items-center justify-center"
          isActive={selectedGroup === group.name}
          onClick={() => onSelectGroup(group.name)}
        >
          <FactorioImage image={group.name} width={64} category="item-group" />
        </Surface>
      ))}
    </ButtonGrid>
  );
};
