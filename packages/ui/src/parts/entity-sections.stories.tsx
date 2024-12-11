import type { Meta } from "@storybook/react";
import { EntitySection } from "./entity-sections";
import { useFactorioData } from "../components/data-provider";

const meta = {
  title: "Parts/Entity Sections",
} satisfies Meta;

export default meta;

export const ItemEntitySections = () => {
  const { entries } = useFactorioData();
  return (
    <div>
      <EntitySection.Main name="fusion-reactor" />
      <EntitySection.Recipe name="fusion-reactor" />
      <EntitySection.Debug name="fusion-reactor" />
    </div>
  );
};
