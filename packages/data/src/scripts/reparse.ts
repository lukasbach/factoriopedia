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

const entries: Record<string, any> = {};
const locales: Record<string, any> = {};
const spriteMap: Record<string, any> = {};
const spriteMapSizes: Record<string, any> = {};

for (const type of [...FactorioType._def.optionsMap.keys()] as string[]) {
  entries[type] = data[type];
}

for (const locale of await glob(
  path.posix.join(scriptOutputFolder, "*-locale.json"),
)) {
  const localeData = await fs.readJson(locale);
  const localeName = path.basename(locale).replace(/-locale.json$/, "");
  locales[localeName] = localeData;
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

const outData = {
  entries,
  locales,
  spriteMap,
  spriteMapSizes,
};

const parse = DumpType.safeParse(outData);

if (!parse.success) {
  parse.error.errors.forEach((e) => console.error(e));
  console.warn("Failed to parse data, writing anyway");
}

await fs.writeJson(path.join(targetFolder, "data.json"), outData, {
  spaces: 2,
});
