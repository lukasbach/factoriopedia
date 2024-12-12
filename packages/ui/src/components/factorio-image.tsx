import { FC } from "react";
import { useFactorioData, useFactorioDataPath } from "./data-provider";

export const FactorioImage: FC<{
  image: string;
  width?: number;
}> = ({ image, width }) => {
  const dataPath = useFactorioDataPath();
  const data = useFactorioData();
  const imageKey = `${image}.png`;
  const imageData = data.spriteMap[imageKey];
  const spritesheetSize = data.spriteMapSizes[imageData.image];

  if (!imageData || !spritesheetSize) {
    throw new Error(`Image data not found for ${image}`);
  }

  const url = `${dataPath}${dataPath === "/" ? "" : "/"}${imageData.image}.png`;
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
      }}
      aria-label={image}
    />
  );
};
