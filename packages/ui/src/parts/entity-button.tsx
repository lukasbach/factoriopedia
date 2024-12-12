import { FC } from "react";
import { EntityTooltip } from "./entity-tooltip";
import { Surface } from "../components/surface";
import { FactorioImage } from "../components/factorio-image";

export const EntityButton: FC<{
  name: string;
  type: string;
  onClick?: () => void;
  isActive?: boolean;
  dark?: boolean;
}> = ({ name, type, onClick, isActive, dark }) => {
  return (
    <EntityTooltip name={name} type={type}>
      <Surface<HTMLButtonElement>
        key={name}
        as={onClick ? "button" : "div"}
        onClick={onClick}
        isActive={isActive}
        shadow={dark ? "btn-large" : "btn-small"}
        color={dark ? "blackMedium" : "blackLight"}
        hover={onClick ? { color: "orangeLight" } : {}}
        active={onClick ? { color: "orangeDark" } : {}}
        className="p-0.5 m-0.5 inline-flex items-center justify-center rounded"
      >
        <FactorioImage image={name} spritesheet={type} width={30} />
      </Surface>
    </EntityTooltip>
  );
};
