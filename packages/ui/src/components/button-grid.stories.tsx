import type { Meta } from "@storybook/react";
import { FactorioImage } from "./factorio-image";
import { ButtonGrid } from "./button-grid";
import { Surface } from "./surface";

const meta = {
  title: "Components/Button Grid",
  component: ButtonGrid,
} satisfies Meta<typeof ButtonGrid>;

export default meta;

export const BasicButtonGrid = () => (
  <Surface color="blackLight" shadow="topglow-2" className="h-64 p-2">
    <ButtonGrid gridWidth={8} itemWidth={24} itemHeight={24}>
      <FactorioImage image="iron-plate" width={24} />
      <FactorioImage image="iron-plate" width={24} />
    </ButtonGrid>
  </Surface>
);

export const LargeButtonGrid = () => (
  <Surface color="blackLight" shadow="topglow-2" className="h-64 p-2">
    <ButtonGrid gridWidth={3} itemWidth={96} itemHeight={110}>
      <Surface
        shadow="btn-large"
        color="grayLight"
        hover={{ color: "orangeDark", shadow: "orangeglow" }}
        active={{ color: "orangeLight", shadow: "deepinset" }}
        className="inline-block p-3 flex w-[96px] h-[110px] items-center justify-center"
      >
        <FactorioImage image="production" width={64} category="item-group" />
      </Surface>
      <Surface
        shadow="btn-large"
        color="grayLight"
        hover={{ color: "orangeDark", shadow: "orangeglow" }}
        active={{ color: "orangeLight", shadow: "deepinset" }}
        className="inline-block p-3 flex w-[96px] h-[110px] items-center justify-center"
      >
        <FactorioImage image="production" width={64} category="item-group" />
      </Surface>
    </ButtonGrid>
  </Surface>
);

export const GridWithoutHeight = () => (
  <Surface color="blackLight" shadow="topglow-2" className="p-2">
    <ButtonGrid gridWidth={3} itemWidth={96} itemHeight={110}>
      <Surface
        shadow="btn-large"
        color="grayLight"
        hover={{ color: "orangeDark", shadow: "orangeglow" }}
        active={{ color: "orangeLight", shadow: "deepinset" }}
        className="inline-block p-3 flex w-[96px] h-[110px] items-center justify-center"
      >
        <FactorioImage image="production" width={64} category="item-group" />
      </Surface>
      <Surface
        shadow="btn-large"
        color="grayLight"
        hover={{ color: "orangeDark", shadow: "orangeglow" }}
        active={{ color: "orangeLight", shadow: "deepinset" }}
        className="inline-block p-3 flex w-[96px] h-[110px] items-center justify-center"
      >
        <FactorioImage image="production" width={64} category="item-group" />
      </Surface>
    </ButtonGrid>
  </Surface>
);
