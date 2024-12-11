import { Tooltip as ReactTooltip } from "react-tooltip";

export const TooltipRoot = () => (
  <ReactTooltip
    float
    offset={24}
    noArrow
    className="!p-0 max-w-64 z-[1000]"
    place="bottom-end"
    id="factorio-ui-tooltip"
    delayShow={300}
  />
);
