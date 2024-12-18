import { Tooltip as ReactTooltip } from "react-tooltip";

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    (navigator as any).maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}

export const TooltipRoot = () =>
  isTouchDevice() ? null : (
    <ReactTooltip
      float
      offset={24}
      noArrow
      className="!p-0 max-w-64 z-[1000]"
      place="bottom-start"
      id="factorio-ui-tooltip"
      delayShow={300}
    />
  );
