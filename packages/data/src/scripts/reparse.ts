/* eslint-disable no-continue */
import fs from "fs-extra";
import path from "node:path";
import * as url from "node:url";
import { glob } from "glob";
import Spritesmith from "spritesmith";
import deepmerge from "deepmerge";
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

const entries: Record<string, any> = {};
const types: Record<string, string[]> = {};
let locales: Record<string, any> = {};
let spriteMap: Record<string, any> = {};
const spriteMapSizes: Record<string, any> = {};

for (const [type, typeContent] of Object.entries(data)) {
  types[type] ??= [];
  for (const [name, entity] of Object.entries(typeContent as any)) {
    entries[name] = deepmerge(entries[name] || {}, entity as any);
    entries[name].types = [...(entries[name].types || []), type];
    types[type].push(name);
  }
}

for (const locale of await glob(
  path.posix.join(scriptOutputFolder, "*-locale.json"),
)) {
  locales = deepmerge(locales, await fs.readJson(locale));
}

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

for (const spriteList of sprites) {
  const groupName = path.dirname(spriteList);
  const src = await glob(path.posix.join(scriptOutputFolder, spriteList));
  const spriteResult = await new Promise<Spritesmith.SpritesmithResult>(
    (resolve, reject) => {
      Spritesmith.run(
        {
          src,
        },
        (err, result) => (err ? reject(err) : resolve(result)),
      );
    },
  );

  await fs.writeFile(
    path.join(targetFolder, `${groupName}.png`),
    spriteResult.image,
  );
  spriteMap = {
    ...spriteMap,
    ...Object.fromEntries(
      Object.entries(spriteResult.coordinates).map(
        ([name, { x, y, width, height }]) => {
          return [
            path.basename(name),
            { x, y, width, height, image: groupName },
          ];
        },
        {} as Record<string, any>,
      ),
    ),
  };
  spriteMapSizes[groupName] = {
    width: spriteResult.properties.width,
    height: spriteResult.properties.height,
  };
}

const outData = {
  entries,
  types,
  locales,
  spriteMap,
  spriteMapSizes,
};
// TODO DumpType.parse
await fs.writeJson(
  path.join(targetFolder, "data.json"),
  DumpType.parse(outData),
  {
    spaces: 2,
  },
);
