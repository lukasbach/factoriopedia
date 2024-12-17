import type { Meta } from "@storybook/react";
import { Surface } from "../components/surface";
import { Ingredient } from "../parts/ingredient";

const meta = {
  title: "Parts/Ingredient",
  component: Ingredient,
} satisfies Meta<typeof Ingredient>;

export default meta;

export const Ingredients = () => (
  <Surface shadow="topglow-2" color="blackLight" className="p-2">
    <Ingredient name="iron-plate" count={10} />
    <Ingredient name="copper-plate" count={1} />
    <Ingredient name="copper-wire" count={2000} />
    <Ingredient
      name="copper-wire"
      count="100/s"
      label="Custom label and count"
    />
  </Surface>
);
