import { z } from "zod";

export const FactorioType = z.object({
  types: z.string().array(),
  name: z.string(),
  hidden: z.boolean().nullish(),
  enabled: z.boolean().nullish(),
  order: z.string().nullish(),
  subgroup: z.string().nullish(),
  default_import_location: z.string().nullish(),
  energy_source: z
    .object({
      type: z.string(),
      emissions_per_minute: z.object({
        pollution: z.number(),
      }),
    })
    .nullish(),
  power_input: z.string().nullish(),
  energy_usage: z.string().nullish(),
  max_fluid_usage: z.number().nullish(),
  heating_energy: z.string().nullish(),
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
  stack_size: z.number().nullish(),
  weight: z.number().nullish(),
  fuel_value: z.string().nullish(),
  fuel_category: z.string().nullish(),
  place_result: z.string().nullish(),
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
  level: z.number().nullish(),
  color: z.any().nullish(),
  next: z.string().nullish(),
  gravity_pull: z.number().nullish(),
  distance: z.number().nullish(),
  asteroid_spawn_definitions: z
    .array(
      z.object({
        asteroid: z.string(),
        probability: z.number().nullish(),
        speed: z.number().nullish(),
        type: z.string().nullish(),
      }),
    )
    .nullish(),
  group: z.string().nullish(),
  magnitude: z.number().nullish(),
  solar_power_in_space: z.number().nullish(),
  surface_properties: z
    .object({
      "day-night-cycle": z.number().nullish(),
      gravity: z.number().nullish(),
      "magnetic-field": z.number().nullish(),
      pressure: z.number().nullish(),
      "solar-power": z.number().nullish(),
    })
    .nullish(),
  asteroid_spawn_influence: z.number().nullish(),
  capsule_action: z
    .object({
      attack_parameters: z
        .object({
          ammo_category: z.string(),
          cooldown: z.number(),
          projectile_creation_distance: z.number().nullish(),
        })
        .nullish(),
    })
    .nullish(),
  durability: z.number().nullish(),
  tier: z.number().nullish(),
  effect: z
    .union([
      z.string(),
      z.object({
        quality: z.number().nullish(),
        speed: z.number().nullish(),
        consumption: z.number().nullish(),
        pollution: z.number().nullish(),
      }),
    ])
    .nullish(),
  attack_parameters: z
    .object({
      type: z.string(),
      ammo_category: z.string().nullish(),
      cooldown: z.number().nullish(),
      movement_slow_down_factor: z.number().nullish(),
      projectile_creation_distance: z.number().nullish(),
      range: z.number().nullish(),
    })
    .nullish(),
  ammo_category: z.string().nullish(),
  magazine_size: z.number().nullish(),
  module_slots: z.number().nullish(),
  allowed_effects: z.string().array().nullish(),
  crafting_speed: z.number().nullish(),
});

export type FactorioType = z.infer<typeof FactorioType>;
