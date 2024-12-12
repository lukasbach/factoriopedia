import type { Meta } from "@storybook/react";
import { Surface } from "./surface";
import { ContentSection, ContentSectionStat } from "./content-section";
import { EntityButton } from "../parts/entity-button";

const meta = {
  title: "Components/Content Section",
  component: ContentSection,
} satisfies Meta<typeof ContentSection>;

export default meta;

export const Sections = () => (
  <Surface shadow="topglow-2" color="blackLight" className="p-2">
    <ContentSection title="Title of section">Content</ContentSection>
    <ContentSection>Content</ContentSection>
    <ContentSection>Content</ContentSection>
  </Surface>
);

export const Variants = () => (
  <Surface shadow="topglow-2" color="blackLight" className="p-2">
    <ContentSection title="Title of section">Dark Block</ContentSection>
    <ContentSection>Dark Block</ContentSection>
    <ContentSection title="Title of section" variant="flat">
      Dark Block
    </ContentSection>
    <ContentSection variant="flat">Dark Block</ContentSection>
  </Surface>
);

export const Stats = () => (
  <Surface shadow="topglow-2" color="blackLight" className="p-2">
    <ContentSection title="Title of section">
      <ContentSectionStat label="Label">Value</ContentSectionStat>
      <ContentSectionStat label="Label">Value</ContentSectionStat>
      <ContentSectionStat label="Label">
        <EntityButton name="fulgora" />
        <EntityButton name="vulcanus" />
      </ContentSectionStat>
    </ContentSection>
  </Surface>
);
