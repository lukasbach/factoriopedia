import { z } from "zod";
import {
  AmmoType,
  CapsuleType,
  GunType,
  ItemGroupType,
  ItemSubgroupType,
  ItemType,
  ModuleType,
  PlanetType,
  QualityType,
  RecipeType,
  RepairToolType,
  SpaceLocationType,
  ToolType,
} from "./structures";

export const DumpType = z.object({
  // entries: z.record(z.record(FactorioType)),
  entries: z.object({
    item: z.record(ItemType),
    recipe: z.record(RecipeType),
    quality: z.record(QualityType),
    "space-location": z.record(SpaceLocationType),
    "item-group": z.record(ItemGroupType),
    "item-subgroup": z.record(ItemSubgroupType),
    tool: z.record(ToolType),
    planet: z.record(PlanetType),
    capsule: z.record(CapsuleType),
    "repair-pack": z.record(RepairToolType),
    module: z.record(ModuleType),
    gun: z.record(GunType),
    ammo: z.record(AmmoType),
  }),
  locales: z.record(
    z.object({
      names: z.record(z.string()),
      descriptions: z.record(z.string()).nullish(),
    }),
  ),
  spriteMap: z.record(
    z.record(
      z.object({
        x: z.number(),
        y: z.number(),
        width: z.number(),
        height: z.number(),
      }),
    ),
  ),
  spriteMapSizes: z.record(
    z.object({
      width: z.number(),
      height: z.number(),
    }),
  ),
});

export type DumpType = z.infer<typeof DumpType>;
