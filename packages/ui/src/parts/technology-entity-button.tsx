import { FC, useMemo } from "react";
import {
  StaticFactorioDataProvider,
  useFactorioData,
  useFactorioDataPath,
} from "./data-provider";
import { TechnologyButton } from "../components/technology-button";
import { FactorioImage } from "./factorio-image";
import { tooltip } from "../components/tooltip";
import { useLocaleName } from "./locale-name";
import { TooltipSection } from "../components/tooltip-section";
import { EntityButton } from "./entity-button";
import { useLocaleDescription } from "./locale-description";
import { ContentSectionStat } from "../components/content-section";

export const TechnologyEntityButton: FC<{
  name: string;
  onClick?: () => void;
}> = ({ name, onClick }) => {
  const { entries } = useFactorioData();
  const tech = entries[name]?.technology;
  const description = useLocaleDescription(name);
  const unlocks = useMemo(
    () =>
      tech.effects
        ?.filter((effect) => effect.type === "unlock-recipe")
        .map((effect) => effect.recipe),
    [tech.effects],
  );
  return (
    <div
      {...tooltip(
        useLocaleName(name),
        <StaticFactorioDataProvider
          data={useFactorioData()}
          path={useFactorioDataPath()}
        >
          {description && <TooltipSection>{description}</TooltipSection>}
          {tech.unit?.ingredients?.length > 0 && (
            <TooltipSection>
              {tech.unit?.ingredients.map?.(([ingredient, amount]) => (
                <EntityButton
                  subtext={amount}
                  name={ingredient}
                  type="recipe"
                />
              ))}
              x{tech.unit.count ?? tech.unit.count_formula}
            </TooltipSection>
          )}
          {unlocks?.length > 0 && (
            <TooltipSection>
              <ContentSectionStat label="Unlocks">
                {unlocks.map((unlock) => (
                  <EntityButton name={unlock} type="technology" />
                ))}
              </ContentSectionStat>
            </TooltipSection>
          )}
        </StaticFactorioDataProvider>,
      )}
    >
      <TechnologyButton
        onClick={onClick}
        subtext={
          tech.unit &&
          tech.unit.ingredients?.map(([ingredient]) => (
            <FactorioImage image={ingredient} width={18} />
          ))
        }
      >
        <FactorioImage image={name} spritesheet="technology" width={80} />
      </TechnologyButton>
    </div>
  );
};
