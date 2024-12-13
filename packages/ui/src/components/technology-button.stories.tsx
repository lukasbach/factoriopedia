import type { Meta } from "@storybook/react";
import { TechnologyButton } from "./technology-button";
import { FactorioImage } from "./factorio-image";

const meta = {
  title: "Components/Technology Button",
  component: TechnologyButton,
} satisfies Meta<typeof TechnologyButton>;

export default meta;

export const BasicTechnologyButton = () => (
  <TechnologyButton
    right="1-8"
    subtext={
      <>
        <FactorioImage image="chemical-science-pack" width={18} />
        <FactorioImage image="chemical-science-pack" width={18} />
        <FactorioImage image="chemical-science-pack" width={18} />
      </>
    }
  >
    <FactorioImage
      image="uranium-processing"
      spritesheet="technology"
      width={100}
    />
  </TechnologyButton>
);
