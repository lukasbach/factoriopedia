import { FC, PropsWithChildren, useId } from "react";
import { DumpType } from "@factorioui/data";
import { Tooltip } from "../components/tooltip";
import { TooltipSection } from "../components/tooltip-section";
import { useFactorioData } from "../components/data-provider";
import { LocaleDescription } from "./locale-description";
import { LocaleName } from "./locale-name";

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
  console.log(entry);

  return (
    <>
      <div data-tooltip-id={id}>{children}</div>
      <Tooltip id={id} header={<LocaleName type={type} name={name} />}>
        <TooltipSection topmost>
          <LocaleDescription type={type} name={name} />
        </TooltipSection>
        {entry.type === "planet" && (
          <TooltipSection>
            <TooltipStat label="Day night cycle">
              {(entry.surface_properties?.["day-night-cycle"] ?? 1) / 60 / 60}{" "}
              minutes
            </TooltipStat>
            <TooltipStat label="Solar power in atmosphere">
              {entry.solar_power_in_space} kW
            </TooltipStat>
            <TooltipStat label="Gravity">{entry.gravity_pull} m/s²</TooltipStat>
            <TooltipStat label="Pressure">
              {entry.surface_properties?.pressure ?? 1000} hPa
            </TooltipStat>
          </TooltipSection>
        )}
      </Tooltip>
    </>
  );
};
