import { z } from "zod";

const BaseType = z.object({
  type: z.string(),
  name: z.string(),
  icon: z.string().nullish(),
  localised_name: z.any().array().nullish(),
  hidden: z.boolean().nullish(),
  enabled: z.boolean().nullish(),
  order: z.string().nullish(),
  subgroup: z.string().nullish(),
});

const ItemType = BaseType.extend({
  type: z.literal("item"),
  stack_size: z.number(),
  fuel_value: z.string().nullish(),
  fuel_category: z.string().nullish(),
  place_result: z.string().nullish(),
  default_import_location: z.string().nullish(),
  weight: z.number().nullish(),
});

const RecipeType = BaseType.extend({
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

const QualityType = BaseType.extend({
  type: z.literal("quality"),
  level: z.number(),
  color: z.any(),
  next: z.string().nullish(),
});

const SpaceLocationType = BaseType.extend({
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

export const FactorioType = z.discriminatedUnion("type", [
  ItemType,
  RecipeType,
  QualityType,
  SpaceLocationType,
]);
