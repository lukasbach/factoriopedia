import { FC, useMemo } from "react";
import { useFactorioData, useFactorioDataPath } from "./data-provider";

export const FactorioImage: FC<{
  image: string;
  spritesheet?: string;
  width?: number;
}> = ({ image, width, spritesheet }) => {
  const dataPath = useFactorioDataPath();
  const data = useFactorioData();

  let resolvedSpritesheet = useMemo(() => {
    if (spritesheet) return spritesheet;
    return Object.entries(data.spriteMap).find(
      ([key, images]) => `${image}.png` in images,
    )?.[0];
  }, []);

  if (!resolvedSpritesheet) {
    resolvedSpritesheet = "virtual-signal";
    image = "signal-deny";
  }

  const imageKey = `${resolvedSpritesheet}.png`;
  const imageData = data.spriteMap[resolvedSpritesheet][`${image}.png`];
  const spritesheetSize = data.spriteMapSizes[resolvedSpritesheet];

  const url = `${dataPath}${dataPath === "/" ? "" : "/"}${imageKey}`;
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
