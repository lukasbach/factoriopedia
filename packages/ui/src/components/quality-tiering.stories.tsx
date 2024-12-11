import type { Meta } from "@storybook/react";
import { Surface } from "./surface";
import { ContentSection, ContentSectionStat } from "./content-section";
import { QualityTiering } from "./quality-tiering";
import { TooltipRoot } from "./tooltip-root";

const meta = {
  title: "Components/Quality Tiering",
  component: ContentSection,
} satisfies Meta<typeof ContentSection>;

export default meta;

export const QualityTieringExample = () => (
  <Surface shadow="topglow-2" color="blackLight" className="p-2">
    <ContentSection title="Title of section">
      <ContentSectionStat label="Just value">
        <QualityTiering base={1000} />
      </ContentSectionStat>
      <ContentSectionStat label="Value with unit">
        <QualityTiering base={1000} unit="kwH" />
      </ContentSectionStat>
      <ContentSectionStat label="Value with custom tiering">
        <QualityTiering base={1000} tiering={[1, 2, 3, 4, 5]} />
      </ContentSectionStat>
    </ContentSection>
    <TooltipRoot />
  </Surface>
);
