import { FC } from "react";
import { DumpType } from "@factorioui/data";
import { EntityTooltip } from "./entity-tooltip";
import { Surface } from "../components/surface";
import { FactorioImage } from "../components/factorio-image";

export const EntityButton: FC<{
  type: keyof DumpType["entries"];
  name: string;
  onClick?: () => void;
  isActive?: boolean;
}> = ({ type, name, onClick, isActive }) => {
  return (
    <EntityTooltip type={type} name={name}>
      <Surface<HTMLButtonElement>
        key={name}
        as={onClick ? "button" : "div"}
        onClick={onClick}
        isActive={isActive}
        shadow="btn-small"
        color="blackLight"
        hover={onClick ? { color: "orangeLight" } : {}}
        active={onClick ? { color: "orangeDark" } : {}}
        className="p-0.5 m-0.5 inline-flex items-center justify-center rounded"
      >
        <FactorioImage
          image={name}
          category={type}
          categoryFallback={["item", "recipe", "space-location"]}
          width={30}
        />
      </Surface>
    </EntityTooltip>
  );
};
