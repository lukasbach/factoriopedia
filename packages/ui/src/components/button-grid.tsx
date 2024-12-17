import { FC, PropsWithChildren, useRef } from "react";
import { useDebouncedState, useResizeObserver } from "@react-hookz/web";
import { Surface } from "./surface";

export const ButtonGrid: FC<
  PropsWithChildren<{
    itemWidth: number;
    itemHeight: number;
    gridWidth?: number;
    gridHeight?: number;
  }>
> = ({ children, gridWidth, gridHeight, itemWidth, itemHeight }) => {
  const [measures, setMeasures] = useDebouncedState<
    { width: number; height: number } | undefined
  >(undefined, 200, 1000);
  const ref = useRef<HTMLDivElement | null>(null);
  useResizeObserver<HTMLDivElement>(ref, (entry) => {
    setMeasures({
      width: entry.contentRect.width,
      height: entry.contentRect.height,
    });
  });
  const actualGridWidth =
    gridWidth ?? Math.ceil((measures?.width ?? 1) / itemWidth);
  const actualGridHeight =
    gridHeight ?? Math.ceil((measures?.height ?? 1) / itemHeight);
  return (
    <div
      className="h-full"
      style={{
        width: gridWidth ? `${gridWidth * itemWidth + 4}px` : "",
        height: gridHeight ? `${gridHeight * itemHeight}px` : "",
      }}
    >
      <Surface
        color="blackDark"
        shadow="inset-1"
        className="rounded flex flex-wrap h-full relative overflow-y-scroll"
      >
        <div
          className="relative flex flex-wrap content-start z-[2] w-full"
          ref={ref}
        >
          {children}
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-wrap z-[1] content-start overflow-hidden">
          {Array.from({ length: actualGridWidth * actualGridHeight }).map(
            (_, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={{ width: itemWidth, height: itemHeight }}
                className={itemWidth > 40 ? "p-3" : "p-1"}
              >
                <div className="shadow-grid-backdrop w-full h-full" />
              </div>
            ),
          )}
        </div>
      </Surface>
    </div>
  );
};
