/* eslint-disable no-continue */
import fs from "fs-extra";
import path from "node:path";
import * as url from "node:url";
import { glob } from "glob";
import Spritesmith from "spritesmith";
import deepmerge from "deepmerge";
import { DumpType, FactorioType } from "../types/dump";
import { ignoredTypes } from "./ignored-types";
import { ignoredProperties } from "./ignored-properties";

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

// TODO subgroup map

const dump: DumpType = {
  entries: {},
  locales: { names: {}, descriptions: {} },
  spriteMap: {},
  spriteMapSizes: {},
  typeMap: {},
  subgroupMap: {},
  groupMap: {},
};

for (const [type, typeContent] of Object.entries(data)) {
  if (ignoredTypes.includes(type)) continue;
  dump.typeMap[type] ??= [];
  for (const [name, entity] of Object.entries<any>(typeContent as any)) {
    for (const ignorePattern of ignoredProperties) {
      for (const property of Object.keys(entity)) {
        if (ignorePattern.test(property)) {
          delete entity[property];
        }
      }
    }

    dump.entries[name] ??= {} as any;
    // dump.entries[name].merged = deepmerge(
    //   dump.entries[name].merged || {},
    //   entity as any,
    // );
    dump.entries[name].types ??= [];
    dump.entries[name].types.push(type);
    dump.entries[name][type] = entity as FactorioType;
    dump.typeMap[type].push(name);

    if ("subgroup" in entity) {
      dump.subgroupMap[entity.subgroup] ??= [];
      dump.subgroupMap[entity.subgroup].push({ name, type });
    }
    if (entity.type === "item-subgroup") {
      dump.groupMap[entity.group] ??= [];
      dump.groupMap[entity.group].push(name);
    }
  }
}

for (const locale of await glob(
  path.posix.join(scriptOutputFolder, "*-locale.json"),
)) {
  dump.locales = deepmerge(dump.locales, await fs.readJson(locale));
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
  dump.spriteMap[groupName] = Object.fromEntries(
    Object.entries(spriteResult.coordinates).map(
      ([name, { x, y, width, height }]) => {
        return [path.basename(name), { x, y, width, height }];
      },
      {} as Record<string, any>,
    ),
  );
  dump.spriteMapSizes[groupName] = {
    width: spriteResult.properties.width,
    height: spriteResult.properties.height,
  };
}

await fs.writeJson(path.join(targetFolder, "data.json"), dump, {
  spaces: 2,
});
