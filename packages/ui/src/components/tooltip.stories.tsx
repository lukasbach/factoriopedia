import type { Meta } from "@storybook/react";
import { Tooltip } from "./tooltip";
import { Surface } from "./surface";
import { FactorioImage } from "./factorio-image";
import { TooltipSection } from "./tooltip-section";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;

export const BasicToolTip = () => (
  <>
    <Surface
      id="anchor"
      shadow="btn-small"
      color="blackLight"
      hover={{ color: "orangeLight" }}
      active={{ color: "orangeDark" }}
      className="inline-block w-8 h-8 flex items-center justify-center rounded"
    >
      <FactorioImage image="iron-plate" width={24} />
    </Surface>
    <Tooltip anchorSelect="#anchor" header="Nauvis">
      <TooltipSection topmost>
        sa jslkdaf jslkafö safjdk öaslf klasdf jlas fdlköa föaklsdkf asdf sadf
      </TooltipSection>
      <TooltipSection>
        sa jslkdaf jslkafö safjdk öaslf klasdf jlas fdlköa föaklsdkf asdf sadf
      </TooltipSection>
      <TooltipSection>
        sa jslkdaf jslkafö safjdk öaslf klasdf jlas fdlköa föaklsdkf asdf sadf
      </TooltipSection>
    </Tooltip>
  </>
);
