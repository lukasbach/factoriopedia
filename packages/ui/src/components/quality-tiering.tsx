import { FC } from "react";
import { tooltip } from "./tooltip";
import { ContentSectionStat } from "./content-section";
import { TooltipSection } from "./tooltip-section";

export const QualityTiering: FC<{
  base: number;
  unit?: string;
  tiering?: [number, number, number, number, number];
}> = ({ unit, base, tiering = [1, 1.3, 1.6, 1.9, 2.5] }) => {
  return (
    <span
      {...tooltip(
        "Scales with Quality",
        <TooltipSection>
          <ContentSectionStat label="Normal">
            {base * tiering[0]} {unit}
          </ContentSectionStat>
          <ContentSectionStat label="Uncommon">
            {base * tiering[1]} {unit}
          </ContentSectionStat>
          <ContentSectionStat label="Rare">
            {base * tiering[2]} {unit}
          </ContentSectionStat>
          <ContentSectionStat label="Epic">
            {base * tiering[3]} {unit}
          </ContentSectionStat>
          <ContentSectionStat label="Legendary">
            {base * tiering[4]} {unit}
          </ContentSectionStat>
        </TooltipSection>,
      )}
    >
      {base} {unit} <span className="text-textBlue">⧫</span>
    </span>
  );
};
