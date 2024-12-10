import type { Meta, StoryObj } from "@storybook/react";
import { Surface } from "./surface";

const meta = {
  title: "Components/Surface",
  component: Surface,
} satisfies Meta<typeof Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InsetSurface = () => (
  <Surface inset color="dark">
    xx
  </Surface>
);
