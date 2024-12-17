import { FC, PropsWithChildren } from "react";
import { tooltip } from "../components/tooltip";
import { TooltipSection } from "../components/tooltip-section";
import {
  StaticFactorioDataProvider,
  useFactorioData,
  useFactorioDataPath,
} from "./data-provider";
import { useLocaleName } from "./locale-name";
import { useLocaleDescription } from "./locale-description";
import { EntityButton } from "./entity-button";

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
  PropsWithChildren<{ name: string; type: string }>
> = ({ name, type, children }) => {
  const { entries } = useFactorioData();
  const description = useLocaleDescription(name);
  const entry = entries[name][type];

  return (
    <span
      {...tooltip(
        useLocaleName(name),
        <StaticFactorioDataProvider
          data={useFactorioData()}
          path={useFactorioDataPath()}
        >
          {description && <TooltipSection>{description}</TooltipSection>}
          <TooltipSection>
            <span className="font-bold text-textBlue">{type}</span> -{" "}
            <span className="font-bold text-textYellow">{name}</span>
          </TooltipSection>
          {"recipe" in entries[name] && (
            <TooltipSection>
              {entries[name].recipe.ingredients?.map?.((ingredient) => (
                <EntityButton
                  subtext={ingredient.amount}
                  name={ingredient.name}
                  type={ingredient.type}
                />
              ))}
              <TooltipStat label="Produces">
                {entries[name].recipe.results?.map?.((result) => (
                  <EntityButton
                    subtext={`${result.amount * (result.probability ?? 1)}`}
                    name={result.name}
                    type={result.type}
                  />
                ))}
              </TooltipStat>
            </TooltipSection>
          )}
          {"planet" in entries[name] && (
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
        </StaticFactorioDataProvider>,
      )}
    >
      {children}
    </span>
  );
};
