import type { Meta } from "@storybook/react";
import { EntitySection } from "./entity-sections";
import { useFactorioData } from "../components/data-provider";

const meta = {
  title: "Parts/Entity Sections",
} satisfies Meta;

export default meta;

export const ItemEntitySections = () => {
  const { entries } = useFactorioData();
  const entity = entries["fusion-reactor"]["fusion-reactor"];
  return (
    <div>
      <EntitySection.Main entity={entity} />
      <EntitySection.Debug entity={entity} />
    </div>
  );
};
