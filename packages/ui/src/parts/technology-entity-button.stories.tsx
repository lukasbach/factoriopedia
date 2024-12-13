import type { Meta } from "@storybook/react";
import { TechnologyEntityButton } from "./technology-entity-button";
import { TooltipRoot } from "../components/tooltip-root";

const meta = {
  title: "Parts/Technology Entity Button",
  component: TechnologyEntityButton,
} satisfies Meta<typeof TechnologyEntityButton>;

export default meta;

export const BasicTechnologyButton = () => (
  <div className="flex gap-0.5">
    <TechnologyEntityButton name="logistic-science-pack" />
    <TechnologyEntityButton name="uranium-mining" />
    <TechnologyEntityButton name="uranium-processing" />
    <TechnologyEntityButton name="physical-projectile-damage-3" />
    <TechnologyEntityButton name="kovarex-enrichment-process" />
    <TooltipRoot />
  </div>
);
