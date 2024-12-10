import { FC } from "react";
import { useFactorioData, useFactorioDataPath } from "./data-provider";

export const FactorioImage: FC<{
  category?: string;
  image: string;
  width?: number;
}> = ({ image, category, width }) => {
  const dataPath = useFactorioDataPath();
  const data = useFactorioData();
  const imageData = data.spriteMap[category ?? "item"]?.[`${image}.png`];
  const spritesheetSize = data.spriteMapSizes[category ?? "item"];

  if (!imageData || !spritesheetSize) {
    throw new Error(`Image data not found for ${category ?? "item"}.${image}`);
  }

  const url = `${dataPath}${dataPath === "/" ? "" : "/"}${category ?? "item"}.png`;
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
