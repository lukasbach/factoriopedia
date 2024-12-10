import type { Meta, StoryObj } from "@storybook/react";
import { Surface } from "./surface";
import { FactorioImage } from "./factorio-image";
import { useItemsInCategory } from "../hooks/use-items-in-category";

const meta = {
  title: "Components/Surface",
  component: Surface,
} satisfies Meta<typeof Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InsetSurface = () => (
  <Surface
    shadow="btn1"
    color="dark"
    className="inline-block w-8 h-8 flex items-center justify-center"
  >
    <FactorioImage image="iron-plate" width={24} />
  </Surface>
);

export const DataHooks = () => {
  console.log(useItemsInCategory("production"));
  return <div>Hello</div>;
};
