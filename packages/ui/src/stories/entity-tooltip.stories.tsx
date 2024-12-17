import type { Meta } from "@storybook/react";
import { EntityTooltip } from "../parts/entity-tooltip";
import { useResolveJointItemEntries } from "../hooks/use-resolve-joint-item-entries";
import { Surface } from "../components/surface";
import { FactorioImage } from "../parts/factorio-image";
import { TooltipRoot } from "../components/tooltip-root";

const meta = {
  title: "Parts/Entity Tooltip",
  component: EntityTooltip,
} satisfies Meta<typeof EntityTooltip>;

export default meta;

export const ItemsTooltips = () => (
  <div>
    <TooltipRoot />
    {Object.values(
      useResolveJointItemEntries({
        group: "space",
      }),
    ).map((subgroup) => (
      <div className="flex flex-wrap gap-0.5">
        {subgroup.map(({ entry }) => (
          <EntityTooltip name={entry.merged.name} type={entry.merged.type}>
            <Surface
              key={entry.merged.name}
              shadow="btn-small"
              color="blackLight"
              hover={{ color: "orangeLight" }}
              active={{ color: "orangeDark" }}
              className="inline-block p-0.5 flex items-center justify-center rounded"
            >
              <FactorioImage image={entry.merged.name} width={30} />
            </Surface>
          </EntityTooltip>
        ))}
      </div>
    ))}
  </div>
);
