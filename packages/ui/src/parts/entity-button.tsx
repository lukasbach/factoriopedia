import { FC, PropsWithChildren, createContext, useContext } from "react";
import { EntityTooltip } from "./entity-tooltip";
import { Surface } from "../components/surface";
import { FactorioImage } from "../components/factorio-image";

const EntityButtonActionContext = createContext<
  ((name: string, type: string) => void) | undefined
>(undefined);

export const EntityButtonActionProvider: FC<
  PropsWithChildren<{
    onClick: (name: string, type: string) => void;
  }>
> = ({ children, onClick }) => (
  <EntityButtonActionContext.Provider value={onClick}>
    {children}
  </EntityButtonActionContext.Provider>
);

export const EntityButton: FC<{
  name: string;
  type: string;
  onClick?: () => void;
  isActive?: boolean;
  dark?: boolean;
}> = ({ name, type, onClick, isActive, dark }) => {
  const onClickContext = useContext(EntityButtonActionContext);
  const handler =
    onClick ?? (onClickContext ? () => onClickContext(name, type) : undefined);
  return (
    <EntityTooltip name={name} type={type}>
      <Surface<HTMLButtonElement>
        key={name}
        as={handler ? "button" : "div"}
        onClick={handler}
        isActive={isActive}
        shadow={dark ? "btn-large" : "btn-small"}
        color={dark ? "blackMedium" : "blackLight"}
        hover={handler ? { color: "orangeLight" } : {}}
        active={handler ? { color: "orangeDark" } : {}}
        className="p-0.5 m-0.5 inline-flex items-center justify-center rounded"
      >
        <FactorioImage image={name} spritesheet={type} width={30} />
      </Surface>
    </EntityTooltip>
  );
};
