import type { Meta } from "@storybook/react";
import { tooltip } from "../components/tooltip";
import { Surface } from "../components/surface";
import { FactorioImage } from "../parts/factorio-image";
import { TooltipSection } from "../components/tooltip-section";
import { TooltipRoot } from "../components/tooltip-root";

const meta = {
  title: "Components/Tooltip",
} satisfies Meta;

export default meta;

export const BasicToolTip = () => (
  <>
    <Surface
      shadow="btn-small"
      color="blackLight"
      hover={{ color: "orangeLight" }}
      active={{ color: "orangeDark" }}
      className="inline-block w-8 h-8 flex items-center justify-center rounded"
      {...tooltip(
        "Iron Plate",
        <>
          <TooltipSection topmost>
            sa jslkdaf jslkafö safjdk öaslf klasdf jlas fdlköa föaklsdkf asdf
            sadf
          </TooltipSection>
          <TooltipSection>
            sa jslkdaf jslkafö safjdk öaslf klasdf jlas fdlköa föaklsdkf asdf
            sadf
          </TooltipSection>
          <TooltipSection>
            sa jslkdaf jslkafö safjdk öaslf klasdf jlas fdlköa föaklsdkf asdf
            sadf
          </TooltipSection>
        </>,
      )}
    >
      <FactorioImage image="iron-plate" width={24} />
    </Surface>
    <TooltipRoot />
  </>
);
