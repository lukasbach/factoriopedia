import { FC } from "react";
import { Surface } from "../components/surface";
import { FactorioImage } from "../components/factorio-image";
import { ButtonGrid } from "../components/button-grid";
import { useEntriesOfType } from "../hooks/use-entries-of-type";

export const GroupTabs: FC<{
  gridWidth: number;
  selectedGroup: string | undefined;
  onSelectGroup: (group: string) => void;
}> = ({ gridWidth, onSelectGroup, selectedGroup }) => {
  const groups = useEntriesOfType("item-group");
  return (
    <ButtonGrid gridWidth={gridWidth} itemWidth={80} itemHeight={96}>
      {groups.map((group) => (
        <Surface<HTMLButtonElement>
          as="button"
          key={group.merged.name}
          shadow="btn-large"
          color="grayLight"
          hover={{ color: "orangeDark", shadow: "orangeglow" }}
          active={{ color: "orangeLight", shadow: "deepinset" }}
          className="flex w-[80px] h-[96px] items-center justify-center"
          isActive={selectedGroup === group.merged.name}
          onClick={() => onSelectGroup(group.merged.name)}
        >
          <FactorioImage image={group.merged.name} width={64} />
        </Surface>
      ))}
    </ButtonGrid>
  );
};
