import type { Meta } from "@storybook/react";
import { Surface } from "./surface";
import { FactorioImage } from "./factorio-image";
import { useItemGroups } from "../hooks/use-item-groups";
import { useGroupEntries } from "../hooks/use-group-entries";

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
    {useItemGroups().map((group) => (
      <Surface
        key={group.name}
        shadow="btn-large"
        color="grayLight"
        hover={{ color: "orangeDark", shadow: "orangeglow" }}
        active={{ color: "orangeLight", shadow: "deepinset" }}
        className="inline-block p-3 flex items-center justify-center"
      >
        <FactorioImage image={group.name} width={64} category="item-group" />
      </Surface>
    ))}
  </div>
);

export const ItemsInGroup = () => (
  <div>
    {console.log(useGroupEntries("intermediate-products"))}
    {useGroupEntries("intermediate-products").map((subgroup) => (
      <div className="flex flex-wrap gap-0.5">
        {subgroup.entries.map((item) => (
          <Surface
            key={item.name}
            shadow="btn-small"
            color="blackLight"
            hover={{ color: "orangeLight" }}
            active={{ color: "orangeDark" }}
            className="inline-block p-0.5 flex items-center justify-center rounded"
            title={item.locale}
          >
            <FactorioImage
              image={item.name}
              category="recipe"
              categoryFallback={["item"]}
              width={30}
            />
          </Surface>
        ))}
      </div>
    ))}
  </div>
);
