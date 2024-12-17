import type { Meta } from "@storybook/react";
import { useState } from "react";
import { Surface } from "./surface";
import { FactorioImage } from "./factorio-image";
import { useResolveJointItemEntries } from "../hooks/use-resolve-joint-item-entries";
import { useEntriesOfType } from "../hooks/use-entries-of-type";

const meta = {
  title: "Components/Surface",
  component: Surface,
} satisfies Meta<typeof Surface>;

export default meta;

const shadows = [
  "btn-small",
  "orangeglow",
  "deepinset",
  "btn-large",
  "topglow-1",
  "topglow-2",
  "inset-1",
];
const colors = [
  "blackDark",
  "blackMedium",
  "blackLight",
  "grayLight",
  "orangeDark",
  "orangeLight",
];

export const AllSurfaces = () => (
  <>
    {colors.map((color) => (
      <div className="flex">
        {shadows.map((shadow) => (
          <Surface
            key={`${color}-${shadow}`}
            shadow={shadow as any}
            color={color as any}
            className="w-64 p-1 px-2 m-3 text-white"
          >
            color = {color}
            <br />
            shadow = {shadow}
          </Surface>
        ))}
      </div>
    ))}
  </>
);

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
        key={group.merged.name}
        shadow="btn-large"
        color="grayLight"
        hover={{ color: "orangeDark", shadow: "orangeglow" }}
        active={{ color: "orangeLight", shadow: "deepinset" }}
        className="inline-block p-3 flex items-center justify-center"
      >
        <FactorioImage image={group.merged.name} width={64} />
      </Surface>
    ))}
  </div>
);

export const ItemsInGroup = () => (
  <div>
    {useResolveJointItemEntries({
      group: "intermediate-products",
      types: ["item", "tool", "recipe"],
    }).map((subgroup) => (
      <div className="flex flex-wrap gap-0.5">
        {subgroup.map(({ entry }) => (
          <Surface
            key={entry.merged.name}
            shadow="btn-small"
            color="blackLight"
            hover={{ color: "orangeLight" }}
            active={{ color: "orangeDark" }}
            className="inline-block p-0.5 flex items-center justify-center rounded"
            title={entry.merged.name}
          >
            <FactorioImage image={entry.merged.name} width={30} />
          </Surface>
        ))}
      </div>
    ))}
  </div>
);

export const ClickableBoxes = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Surface
      as="button"
      className="cursor-pointer flex text-white hover:text-black text-xs p-1 items-center justify-between w-[64px] h-[48px] p"
      active={{
        color: "orangeDark",
        shadow: "deepinset",
      }}
      hover={{ color: "orangeLight", shadow: "orangeglow" }}
      shadow="btn-large"
      color="blackLight"
      isActive={isActive}
      onClick={() => setIsActive(!isActive)}
    >
      <div className="flex-grow">
        <FactorioImage image="fusion-reactor" width={20} />
      </div>
      <div className="text-right">
        <div>123</div>
        <div>600%</div>
      </div>
    </Surface>
  );
};
