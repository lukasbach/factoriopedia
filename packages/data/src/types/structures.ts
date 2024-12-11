import { z } from "zod";

export const BaseType = z.object({
  type: z.string(),
  name: z.string(),
  icon: z.string().nullish(),
  localised_name: z.any().array().nullish(),
  hidden: z.boolean().nullish(),
  enabled: z.boolean().nullish(),
  order: z.string().nullish(),
  subgroup: z.string().nullish(),
  default_import_location: z.string().nullish(),
  energy_source: z
    .object({
      type: z.string(),
    })
    .nullish(),
  power_input: z.string().nullish(),
  max_fluid_usage: z.number().nullish(),
  burner: z
    .object({
      type: z.string(),
      fuel_categories: z.string().array(),
      effectivity: z.number(),
      fuel_inventory_size: z.number(),
      emissions_per_minute: z.object({
        pollution: z.number(),
      }),
    })
    .nullish(),
});

export const ItemType = BaseType.extend({
  type: z.literal("item"),
  stack_size: z.number(),
  weight: z.number().nullish(),
  fuel_value: z.string().nullish(),
  fuel_category: z.string().nullish(),
  place_result: z.string().nullish(),
  default_import_location: z.string().nullish(),
});

export const RecipeType = BaseType.extend({
  type: z.literal("recipe"),
  ingredients: z
    .array(
      z.object({
        type: z.string(),
        name: z.string(),
        amount: z.number(),
      }),
    )
    .catch([])
    .nullish(),
  energy_required: z.number().nullish(),
  results: z
    .array(
      z.object({
        type: z.string(),
        name: z.string(),
        amount: z.number(),
      }),
    )
    .catch([])
    .nullish(),
  category: z.string().nullish(),
  unlock_results: z.boolean().nullish(),
});

export const QualityType = BaseType.extend({
  type: z.literal("quality"),
  level: z.number(),
  color: z.any(),
  next: z.string().nullish(),
});

export const SpaceLocationType = BaseType.extend({
  type: z.literal("space-location"),
  gravity_pull: z.number().nullish(),
  distance: z.number().nullish(),
  asteroid_spawn_definitions: z
    .array(
      z.object({
        asteroid: z.string(),
        probability: z.number(),
        speed: z.number(),
        type: z.string().nullish(),
      }),
    )
    .nullish(),
});

export const ItemGroupType = BaseType.extend({
  type: z.literal("item-group"),
});

export const ItemSubgroupType = BaseType.extend({
  type: z.literal("item-subgroup"),
  group: z.string(),
  order: z.string(),
});

export const ToolType = BaseType.extend({
  type: z.literal("tool"),
  order: z.string(),
  stack_size: z.number(),
  weight: z.number(),
});

export const PlanetType = BaseType.extend({
  type: z.literal("planet"),
  gravity_pull: z.number(),
  distance: z.number(),
  magnitude: z.number(),
  solar_power_in_space: z.number(),
  surface_properties: z.object({
    "day-night-cycle": z.number().nullish(),
    gravity: z.number().nullish(),
    "magnetic-field": z.number().nullish(),
    pressure: z.number().nullish(),
    "solar-power": z.number().nullish(),
  }),
  asteroid_spawn_influence: z.number(),
  asteroid_spawn_definitions: z.array(
    z.object({
      asteroid: z.string(),
      probability: z.number(),
      speed: z.number(),
      type: z.string().nullish(),
    }),
  ),
});

export const CapsuleType = BaseType.extend({
  type: z.literal("capsule"),
  stack_size: z.number(),
  weight: z.number(),
  capsule_action: z.object({
    attack_parameters: z.object({
      ammo_category: z.string(),
      cooldown: z.number(),
      projectile_creation_distance: z.number(),
    }),
  }),
});

export const RepairToolType = BaseType.extend({
  type: z.literal("repair-tool"),
  durability: z.number(),
});

export const ModuleType = BaseType.extend({
  type: z.literal("module"),
  tier: z.number(),
  effect: z.object({
    quality: z.number().nullish(),
    speed: z.number().nullish(),
    consumption: z.number().nullish(),
    pollution: z.number().nullish(),
  }),
});

export const GunType = BaseType.extend({
  type: z.literal("gun"),
  attack_parameters: z.object({
    type: z.string(),
    ammo_category: z.string(),
    cooldown: z.number(),
    movement_slow_down_factor: z.number(),
    projectile_creation_distance: z.number(),
    range: z.number(),
  }),
});

export const AmmoType = BaseType.extend({
  type: z.literal("ammo"),
  ammo_category: z.string(),
  magazine_size: z.number(),
});

export const FusionGeneratorType = BaseType.extend({
  type: z.literal("fusion-generator"),
});

export const FusionReactorType = BaseType.extend({
  type: z.literal("fusion-reactor"),
});

export const FactorioType = z.discriminatedUnion("type", [
  ItemType,
  RecipeType,
  QualityType,
  SpaceLocationType,
  ItemGroupType,
  ItemSubgroupType,
  ToolType,
  PlanetType,
  CapsuleType,
  RepairToolType,
  ModuleType,
  GunType,
  AmmoType,
  FusionGeneratorType,
  FusionReactorType,
]);

export type FactorioType = z.infer<typeof FactorioType>;
export type BaseType = z.infer<typeof BaseType>;
export type ItemType = z.infer<typeof ItemType>;
export type RecipeType = z.infer<typeof RecipeType>;
export type QualityType = z.infer<typeof QualityType>;
export type SpaceLocationType = z.infer<typeof SpaceLocationType>;
export type ItemGroupType = z.infer<typeof ItemGroupType>;
export type ItemSubgroupType = z.infer<typeof ItemSubgroupType>;
export type ToolType = z.infer<typeof ToolType>;
export type PlanetType = z.infer<typeof PlanetType>;
export type CapsuleType = z.infer<typeof CapsuleType>;
export type RepairToolType = z.infer<typeof RepairToolType>;
export type ModuleType = z.infer<typeof ModuleType>;
export type GunType = z.infer<typeof GunType>;
export type AmmoType = z.infer<typeof AmmoType>;
