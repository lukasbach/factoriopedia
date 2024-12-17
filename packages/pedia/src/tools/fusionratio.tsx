import { FC, useEffect, useMemo, useState } from "react";
import {
  FactorioImage,
  Ingredient,
  Surface,
  TooltipSection,
  tooltip,
} from "@factorioui/components";
import { Tool } from "../routes/tool.$tool";

const itemWidth = 64;
const itemHeight = 48;

const floor = (n: number) => Math.floor(n * 100) / 100;

const getAt = (checks: boolean[], width: number, x: number, y: number) => {
  if (x < 0 || x >= width || y < 0 || y >= Math.floor(checks.length / width)) {
    return false;
  }
  return checks[y * width + x];
};

const getNeighborCount = (checks: boolean[], width: number, i: number) => {
  const x = i % width;
  const y = Math.floor(i / width);
  let count = 0;
  if (x % 2 === 0) {
    if (getAt(checks, width, x - 1, y)) count++;
    if (getAt(checks, width, x - 1, y + 1)) count++;
    if (getAt(checks, width, x, y - 1)) count++;
    if (getAt(checks, width, x, y + 1)) count++;
    if (getAt(checks, width, x + 1, y)) count++;
    if (getAt(checks, width, x + 1, y + 1)) count++;
  } else {
    if (getAt(checks, width, x - 1, y - 1)) count++;
    if (getAt(checks, width, x - 1, y)) count++;
    if (getAt(checks, width, x, y - 1)) count++;
    if (getAt(checks, width, x, y + 1)) count++;
    if (getAt(checks, width, x + 1, y - 1)) count++;
    if (getAt(checks, width, x + 1, y)) count++;
  }
  return count;
};

const ToolRender: FC = () => {
  const [width] = useState(10);
  const [height] = useState(6);
  const [checks, setChecks] = useState(() => Array(width * height).fill(false));
  const neighborCounts = useMemo(
    () => checks.map((_, i) => getNeighborCount(checks, width, i)),
    [checks, width],
  );
  const totalReactors = useMemo(() => checks.filter((c) => c).length, [checks]);
  const totalGenerators = useMemo(
    () =>
      checks
        .map((c, i) => (c ? getNeighborCount(checks, width, i) + 1 : 0))
        .reduce((acc, val) => acc + val, 0) * 2,
    [checks, width],
  );
  const avgEfficiency = useMemo(
    () =>
      totalReactors === 0
        ? 0
        : checks
            .map((check, i) =>
              check ? 1 + getNeighborCount(checks, width, i) : 0,
            )
            .reduce((acc, val) => acc + val, 0) / totalReactors,
    [checks, totalReactors, width],
  );

  useEffect(() => {
    const newChecks = Array(width * height).fill(false);
    for (let i = 0; i < Math.min(checks.length, newChecks.length); i++) {
      newChecks[i] = checks[i];
    }
    setChecks(newChecks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  return (
    <>
      <div
        className="relative w-full overflow-auto"
        style={{ height: `${itemHeight * (height + 0.6)}px` }}
      >
        {checks.map((checked, i) => (
          <Surface
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            as="button"
            className="absolute cursor-pointer flex text-black text-xs p-1 items-center justify-between"
            style={{
              width: `${itemWidth}px`,
              height: `${itemHeight}px`,
              top: `${Math.floor(i / width) * itemHeight + (i % 2 === 0 ? itemHeight / 2 : 0)}px`,
              left: `${(i % width) * itemWidth}px`,
            }}
            active={{
              color: neighborCounts[i] === 6 ? "blackMedium" : "orangeDark",
              shadow: "deepinset",
            }}
            hover={{ color: "orangeLight", shadow: "orangeglow" }}
            shadow="btn-large"
            color="blackLight"
            isActive={checked}
            onClick={() => {
              const newChecks = [...checks];
              newChecks[i] = !newChecks[i];
              setChecks(newChecks);
            }}
            {...tooltip(
              checked
                ? `Reactor at ${i % width}.${Math.floor(i / width)}`
                : "Click to add reactor here",
              checked ? (
                <>
                  <TooltipSection>
                    Will run at{" "}
                    <span className="font-bold text-textBlue">
                      {(1 + neighborCounts[i]) * 100}%
                    </span>{" "}
                    efficiency, requiring{" "}
                    <span className="font-bold text-textYellow">
                      {(1 + neighborCounts[i]) * 2} generator
                    </span>
                  </TooltipSection>
                  <TooltipSection>
                    <span className="font-bold text-textBlue">
                      {neighborCounts[i]} neighbor
                      {neighborCounts[i] === 1 ? "" : "s"}
                    </span>
                  </TooltipSection>
                </>
              ) : (
                <div />
              ),
            )}
          >
            <div className="flex-grow">
              <FactorioImage image="fusion-reactor" width={20} />
            </div>
            {checked && (
              <div className="text-right">
                <div>{floor((1 + neighborCounts[i]) * 2)}</div>
                <div>{floor((1 + neighborCounts[i]) * 100)}%</div>
              </div>
            )}
            {/* false && (
              <div className="text-right">
                <div>
                  {i % width}.{Math.floor(i / width)}
                </div>
                <div>N{neighborCounts[i]}</div>
              </div>
            ) */}
          </Surface>
        ))}
      </div>
      <p>
        The top count in each cell determines how many reactors that generator
        needs. Your setup will generate{" "}
        <span className="font-bold text-textBlue">
          {floor(totalGenerators * 0.05)}GW
        </span>
        , or{" "}
        <span className="font-bold text-textYellow">
          {floor(totalGenerators * 0.125)}GW
        </span>{" "}
        for legendary buildings. Your reactors have a average efficiency of{" "}
        <span className="font-bold text-textBlue">
          {floor(avgEfficiency * 100)}%
        </span>
      </p>
      <p className="mt-2">You will need:</p>
      <Ingredient name="fusion-reactor" count={totalReactors} />
      <Ingredient name="fusion-generator" count={totalGenerators} />
      <Ingredient
        name="fluoroketone-cold"
        type="fluid"
        count={`${totalReactors * 4}/s`}
        label="Fluoroketone for basic setup"
      />
      <Ingredient
        name="fluoroketone-cold"
        type="fluid"
        count={`${totalReactors * 10}/s`}
        label="Fluoroketone for legendary setup"
      />
    </>
  );
};

export const fusionratio: Omit<Tool, "id"> = {
  title: "Fusion Ratio Calculator",
  icon: ["item", "fusion-generator"],
  render: ToolRender,
};
