import { FC } from "react";
import { useFactorioData, useFactorioDataPath } from "./data-provider";

const resolveCategory = (
  category: string,
  fallback: string[],
  map: Record<string, Record<string, any>>,
  item: string,
) => {
  const arr = [category, ...fallback];
  return arr[arr.findIndex((key) => item in (map[key] ?? {}))];
};

export const FactorioImage: FC<{
  image: string;
  width?: number;
}> = ({ image, width }) => {
  const dataPath = useFactorioDataPath();
  const data = useFactorioData();
  const imageKey = `${image}.png`;
  const resolvedCategory = resolveCategory(
    "item",
    [
      "recipe",
      "space-location",
      "space-connection",
      "fluid",
      "asteroid-chunk",
      "item-group",
    ],
    data.spriteMap,
    imageKey,
  );
  const imageData = data.spriteMap[resolvedCategory]?.[imageKey];
  const spritesheetSize = data.spriteMapSizes[resolvedCategory];

  if (!imageData || !spritesheetSize) {
    return null; // TODO
    // throw new Error(`Image data not found for ${resolvedCategory}.${image}`);
  }

  const url = `${dataPath}${dataPath === "/" ? "" : "/"}${resolvedCategory}.png`;
  const scale = !width ? 1 : width / imageData.width;

  return (
    <div
      style={{
        display: "inline-block",
        backgroundImage: `url(${url})`,
        width: scale * imageData.width,
        height: scale * imageData.height,
        backgroundSize: `${scale * spritesheetSize.width}px ${scale * spritesheetSize.height}px`,
        backgroundPosition: `-${scale * imageData.x}px -${scale * imageData.y}px`,

        // backgroundPosition: `-${imageData.x}px -${imageData.y}px`,
      }}
      aria-label={image}
    />
  );
};
