import { FC, useMemo } from "react";
import { tooltip } from "./tooltip";
import { ContentSectionStat } from "./content-section";
import { TooltipSection } from "./tooltip-section";

export const QualityTiering: FC<{
  value: string;
  tiering?: [number, number, number, number, number];
}> = ({ value, tiering = [1, 1.3, 1.6, 1.9, 2.5] }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/naming-convention
  const [_, baseStr, unit] = useMemo(
    () => /^([\d.]+)(.*)$/.exec(value) ?? [value, ""],
    [value],
  );
  const base = Number.parseFloat(baseStr);
  return (
    <span
      {...tooltip(
        "Scales with Quality",
        <>
          <TooltipSection>
            <ContentSectionStat label="Normal">
              {Math.floor(base * tiering[0])} {unit}
            </ContentSectionStat>
            <ContentSectionStat label="Uncommon">
              {Math.floor(base * tiering[1])} {unit}
            </ContentSectionStat>
            <ContentSectionStat label="Rare">
              {Math.floor(base * tiering[2])} {unit}
            </ContentSectionStat>
            <ContentSectionStat label="Epic">
              {Math.floor(base * tiering[3])} {unit}
            </ContentSectionStat>
            <ContentSectionStat label="Legendary">
              {Math.floor(base * tiering[4])} {unit}
            </ContentSectionStat>
          </TooltipSection>
          <TooltipSection>
            Quality values are currently extrapolated from the base value and
            might not be accurate.
          </TooltipSection>
        </>,
      )}
    >
      {base} {unit} <span className="text-textBlue">⧫</span>
    </span>
  );
};
