import { z } from "zod";
import { FactorioType } from "./structures";

export const DumpType = z.object({
  entries: z.record(FactorioType),
  types: z.record(z.string().array()),
  locales: z.object({
    names: z.record(z.string()),
    descriptions: z.record(z.string()).nullish(),
  }),
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
