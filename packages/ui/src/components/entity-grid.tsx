import { FC, PropsWithChildren } from "react";
import { useMeasure } from "@react-hookz/web";
import { Surface } from "./surface";

export const EntityGrid: FC<
  PropsWithChildren<{
    itemWidth: number;
    itemHeight: number;
    gridWidth?: number;
    gridHeight?: number;
  }>
> = ({ children, gridWidth, gridHeight, itemWidth, itemHeight }) => {
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const actualGridWidth =
    gridWidth ?? Math.floor((measures?.width ?? 1) / itemWidth);
  const actualGridHeight =
    gridHeight ?? Math.floor((measures?.height ?? 1) / itemHeight);
  return (
    <div
      ref={ref}
      className="h-full"
      style={{
        width: gridWidth ? `${gridWidth * itemWidth}px` : "100%",
        height: gridHeight ? `${gridHeight * itemHeight}px` : "100%",
      }}
    >
      <Surface
        color="blackDark"
        shadow="inset-1"
        className="rounded flex flex-wrap h-full relative"
      >
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-wrap">
          {Array.from({ length: actualGridWidth * actualGridHeight }).map(
            (_, index) => (
              <div
                key={index}
                style={{ width: itemWidth, height: itemHeight }}
                className={itemWidth > 40 ? "p-3" : "p-1"}
              >
                <div className="shadow-grid-backdrop w-full h-full" />
              </div>
            ),
          )}
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-wrap">
          {children}
        </div>
      </Surface>
    </div>
  );
};
