import { FC, PropsWithChildren, useId } from "react";
import { tooltip } from "../components/tooltip";
import { TooltipSection } from "../components/tooltip-section";
import { useFactorioData } from "../components/data-provider";
import { useLocaleName } from "./locale-name";
import { useLocaleDescription } from "./locale-description";

const TooltipStat = ({
  label,
  children,
}: PropsWithChildren<{ label: string }>) => (
  <p>
    <span className="text-textBeige font-bold">{label}:</span>{" "}
    <span>{children}</span>
  </p>
);

export const EntityTooltip: FC<PropsWithChildren<{ name: string }>> = ({
  name,
  children,
}) => {
  const { entries } = useFactorioData();
  const entry = entries[name];
  const id = useId();

  return (
    <span
      {...tooltip(
        useLocaleName(name),
        <>
          <TooltipSection>{useLocaleDescription(name)}</TooltipSection>
          {entry.types.includes("planet") && (
            <TooltipSection>
              <TooltipStat label="Day night cycle">
                {(entry.surface_properties?.["day-night-cycle"] ?? 1) / 60 / 60}{" "}
                minutes
              </TooltipStat>
              <TooltipStat label="Solar power in atmosphere">
                {entry.merged.solar_power_in_space} kW
              </TooltipStat>
              <TooltipStat label="Gravity">
                {entry.merged.gravity_pull} m/s²
              </TooltipStat>
              <TooltipStat label="Pressure">
                {entry.surface_properties?.pressure ?? 1000} hPa
              </TooltipStat>
            </TooltipSection>
          )}
        </>,
      )}
    >
      {children}
    </span>
  );
};
