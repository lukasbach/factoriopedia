import type { Meta } from "@storybook/react";
import { EntitySection } from "../parts/entity-sections";
import { useFactorioData } from "../components/data-provider";

const meta = {
  title: "Parts/Entity Sections",
} satisfies Meta;

export default meta;

export const ItemEntitySections = () => {
  const { entries } = useFactorioData();
  return (
    <div>
      <EntitySection.Main name="fusion-reactor" type="item" />
      <EntitySection.Recipe name="fusion-reactor" type="item" />
      <EntitySection.Debug name="fusion-reactor" type="item" />
    </div>
  );
};
