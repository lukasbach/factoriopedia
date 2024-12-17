import type { Meta } from "@storybook/react";
import { EntityButton } from "../parts/entity-button";
import { TooltipRoot } from "../components/tooltip-root";

const meta = {
  title: "Components/Entity Button",
  component: EntityButton,
} satisfies Meta<typeof EntityButton>;

export default meta;

export const Sample = () => (
  <>
    <EntityButton type="item" name="fusion-reactor" onClick={console.log} />
    <TooltipRoot />
  </>
);
