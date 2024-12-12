import type { Meta } from "@storybook/react";
import { Surface } from "./surface";
import { FactorioImage } from "./factorio-image";
import { useResolveJointItemEntries } from "../hooks/use-resolve-joint-item-entries";
import { useEntriesOfType } from "../hooks/use-entries-of-type";

const meta = {
  title: "Components/Surface",
  component: Surface,
} satisfies Meta<typeof Surface>;

export default meta;

export const ItemPlates = () => (
  <div className="flex gap-1">
    <Surface
      shadow="btn-small"
      color="blackLight"
      hover={{ color: "orangeLight" }}
      active={{ color: "orangeDark" }}
      className="inline-block w-8 h-8 flex items-center justify-center rounded"
    >
      <FactorioImage image="iron-plate" width={24} />
    </Surface>
    <Surface
      shadow="btn-small"
      color="orangeLight"
      className="inline-block w-8 h-8 flex items-center justify-center rounded"
    >
      <FactorioImage image="iron-plate" width={24} />
    </Surface>
  </div>
);

export const GroupButtons = () => (
  <div className="flex">
    {useEntriesOfType("item-group").map((group) => (
      <Surface
        key={group.name}
        shadow="btn-large"
        color="grayLight"
        hover={{ color: "orangeDark", shadow: "orangeglow" }}
        active={{ color: "orangeLight", shadow: "deepinset" }}
        className="inline-block p-3 flex items-center justify-center"
      >
        <FactorioImage image={group.name} width={64} />
      </Surface>
    ))}
  </div>
);

export const ItemsInGroup = () => (
  <div>
    {Object.values(
      useResolveJointItemEntries({
        group: "intermediate-products",
        types: ["item", "tool", "recipe"],
      }),
    ).map((subgroup) => (
      <div className="flex flex-wrap gap-0.5">
        {subgroup.map((item) => (
          <Surface
            key={item.name}
            shadow="btn-small"
            color="blackLight"
            hover={{ color: "orangeLight" }}
            active={{ color: "orangeDark" }}
            className="inline-block p-0.5 flex items-center justify-center rounded"
            title={item.name}
          >
            <FactorioImage image={item.name} width={30} />
          </Surface>
        ))}
      </div>
    ))}
  </div>
);
