import type { Meta } from "@storybook/react";
import { EntityTooltip } from "./entity-tooltip";
import { useResolveJointItemEntries } from "../hooks/use-resolve-joint-item-entries";
import { Surface } from "../components/surface";
import { FactorioImage } from "../components/factorio-image";
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
        types: ["planet", "space-location"],
      }),
    ).map((subgroup) => (
      <div className="flex flex-wrap gap-0.5">
        {subgroup.map((item) => (
          <EntityTooltip type={item.type} name={item.name}>
            <Surface
              key={item.name}
              shadow="btn-small"
              color="blackLight"
              hover={{ color: "orangeLight" }}
              active={{ color: "orangeDark" }}
              className="inline-block p-0.5 flex items-center justify-center rounded"
            >
              <FactorioImage
                image={item.name}
                category="space-location"
                width={30}
              />
            </Surface>
          </EntityTooltip>
        ))}
      </div>
    ))}
  </div>
);
