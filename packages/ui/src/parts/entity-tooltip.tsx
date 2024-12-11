import { FC, PropsWithChildren, useId } from "react";
import { DumpType } from "@factorioui/data";
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

export const EntityTooltip: FC<
  PropsWithChildren<{ type: keyof DumpType["entries"]; name: string }>
> = ({ type, name, children }) => {
  const { entries, locales } = useFactorioData();
  const entry = entries[type][name];
  const id = useId();

  return (
    <span
      {...tooltip(
        useLocaleName(type, name),
        <>
          <TooltipSection>{useLocaleDescription(type, name)}</TooltipSection>
          {entry.type === "planet" && (
            <TooltipSection>
              <TooltipStat label="Day night cycle">
                {(entry.surface_properties?.["day-night-cycle"] ?? 1) / 60 / 60}{" "}
                minutes
              </TooltipStat>
              <TooltipStat label="Solar power in atmosphere">
                {entry.solar_power_in_space} kW
              </TooltipStat>
              <TooltipStat label="Gravity">
                {entry.gravity_pull} m/s²
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
