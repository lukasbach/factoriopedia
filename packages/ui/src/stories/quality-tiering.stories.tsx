import type { Meta } from "@storybook/react";
import { Surface } from "../components/surface";
import {
  ContentSection,
  ContentSectionStat,
} from "../components/content-section";
import { QualityTiering } from "../components/quality-tiering";
import { TooltipRoot } from "../components/tooltip-root";

const meta = {
  title: "Components/Quality Tiering",
  component: ContentSection,
} satisfies Meta<typeof ContentSection>;

export default meta;

export const QualityTieringExample = () => (
  <Surface shadow="topglow-2" color="blackLight" className="p-2">
    <ContentSection title="Title of section">
      <ContentSectionStat label="Just value">
        <QualityTiering value="1000" />
      </ContentSectionStat>
      <ContentSectionStat label="Value with unit">
        <QualityTiering value="1000kwH" />
      </ContentSectionStat>
      <ContentSectionStat label="Value with custom tiering">
        <QualityTiering value="1000" tiering={[1, 2, 3, 4, 5]} />
      </ContentSectionStat>
    </ContentSection>
    <TooltipRoot />
  </Surface>
);
