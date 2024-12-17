import type { Meta } from "@storybook/react";
import { EntityButton } from "../parts/entity-button";
import { useFactorioData, useFactorioDataPath } from "../parts/data-provider";
import { useEntriesOfType } from "../hooks/use-entries-of-type";
import { useEntry } from "../hooks/use-entry";
import { useResolveJointItemEntries } from "../hooks/use-resolve-joint-item-entries";
import { Surface } from "../components/surface";

const meta = {
  title: "Parts/Data Hooks",
  component: EntityButton,
} satisfies Meta<typeof EntityButton>;

export default meta;

export const LoadingFactorioData = () => (
  <Surface
    as="pre"
    color="blackDark"
    shadow="deepinset"
    className="text-white p-2"
  >
    {JSON.stringify(
      useFactorioData().entries["fusion-reactor"].recipe.ingredients,
      null,
      2,
    )}
  </Surface>
);

export const LoadingFactorioDataPath = () => (
  <Surface
    as="pre"
    color="blackDark"
    shadow="deepinset"
    className="text-white p-2"
  >
    {useFactorioDataPath()}
  </Surface>
);

export const UseEntriesOfType = () => (
  <Surface
    as="pre"
    color="blackDark"
    shadow="deepinset"
    className="text-white p-2"
  >
    {useEntriesOfType("recipe", (e) => e.merged.name.includes("speed"))
      .map((e) => e.merged.name)
      .join(" ")}
  </Surface>
);

export const UseEntry = () => (
  <Surface
    as="pre"
    color="blackDark"
    shadow="deepinset"
    className="text-white p-2"
  >
    {JSON.stringify(
      useEntry("speed-module-3", "recipe")?.recipe.ingredients,
      null,
      2,
    )}
  </Surface>
);

export const UseResolvedJointItemEntries = () => (
  <Surface
    as="pre"
    color="blackDark"
    shadow="deepinset"
    className="text-white p-2"
  >
    {useResolveJointItemEntries({ group: "logistics", types: ["item"] })
      .reduce((acc, cur) => acc.concat(cur), [])
      .map((e) => e.name)
      .join(" ")}
  </Surface>
);
