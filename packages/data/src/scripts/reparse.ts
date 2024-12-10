/* eslint-disable no-continue */
import fs from "fs-extra";
import path from "node:path";
import * as url from "node:url";
import { glob } from "glob";
import Spritesmith from "spritesmith";
import { FactorioType } from "../types/structures.js";
import { DumpType } from "../types/dump";

const targetFolder = path.join(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "../../data",
);

const scriptOutputFolder = path.join(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "..",
  "..",
  "script-output",
);

await fs.ensureDir(targetFolder);

const data = await fs.readJson(
  path.join(scriptOutputFolder, "data-raw-dump.json"),
);

const entries: any[] = Object.entries(data).reduce(
  (acc: any, [category, items]: any) => {
    return acc.concat(
      Object.entries(items).map(([name, item]) => {
        return { category, name, item };
      }),
    );
  },
  [],
);

const targetItems: Record<string, any> = {};
const categoryMap: Record<string, string[]> = {};

for (const item of entries) {
  if (![...FactorioType._def.optionsMap.keys()].includes(item.category)) {
    continue;
  }

  categoryMap[item.category] ??= [];
  categoryMap[item.category].push(item.name);
  targetItems[item.name] = FactorioType.parse(item.item);
}

const locales: Record<string, any> = {};
for (const locale of await glob(
  path.posix.join(scriptOutputFolder, "*-locale.json"),
)) {
  const localeData = await fs.readJson(locale);
  const localeName = path.basename(locale).replace(/-locale.json$/, "");
  locales[localeName] = localeData;
}

await fs.writeJson(
  path.join(targetFolder, "data.json"),
  { items: targetItems, categories: categoryMap, locales },
  {
    // spaces: 2,
  },
);

const sprites = [
  "virtual-signal/*.png",
  "recipe/*.png",
  "space-connection/*.png",
  "space-location/*.png",
  "surface/*.png",
  "technology/*.png",
  "tile/*.png",
  "item/*.png",
  "item-group/*.png",
  "quality/*.png",
  "equipment/*.png",
  "fluid/*.png",
  "achievement/*.png",
  "ammo-category/*.png",
  "asteroid-chunk/*.png",
];

const spriteMap: Record<string, any> = {};
const spriteMapSizes: Record<string, any> = {};
for (const spriteList of sprites) {
  const groupName = path.dirname(spriteList);
  const spriteProm = Promise.withResolvers<Spritesmith.SpritesmithResult>();
  Spritesmith.run(
    {
      src: await glob(path.posix.join(scriptOutputFolder, spriteList)),
    },
    (err, result) =>
      err ? spriteProm.reject(err) : spriteProm.resolve(result),
  );

  const spriteResult = await spriteProm.promise;
  await fs.writeFile(
    path.join(targetFolder, `${groupName}.png`),
    spriteResult.image,
  );
  spriteMap[groupName] = Object.fromEntries(
    Object.entries(spriteResult.coordinates).map(
      ([name, { x, y, width, height }]) => {
        return [path.basename(name), { x, y, width, height }];
      },
      {} as Record<string, any>,
    ),
  );
  spriteMapSizes[groupName] = {
    width: spriteResult.properties.width,
    height: spriteResult.properties.height,
  };
}

await fs.writeJson(
  path.join(targetFolder, "data.json"),
  DumpType.parse({
    entries: targetItems,
    categories: categoryMap,
    locales,
    spriteMap,
    spriteMapSizes,
  }),
  {
    spaces: 2,
  },
);
