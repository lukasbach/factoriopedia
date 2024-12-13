import { FC } from "react";
import { DumpType } from "@factorioui/data";
import {
  ContentSection,
  ContentSectionStat,
  ContentSectionVariant,
} from "../components/content-section";
import { LocaleDescription } from "./locale-description";
import { Ingredient } from "./ingredient";
import { useEntry } from "../hooks/use-entry";
import { useFactorioData } from "../components/data-provider";
import { EntityGrid } from "./entity-grid";
import { EntityButton } from "./entity-button";

type Props = {
  variant?: ContentSectionVariant;
  name: string;
  type: string;
};

const makeSection =
  (
    title: string | undefined,
    Component: FC<Props & { entry: DumpType["entries"][string] }>,
  ) =>
  (props: Props) => {
    const entry = useEntry(props.name, props.type);
    if (!entry) return null;
    const result = <Component {...props} entry={entry} />;
    return !result.type({ ...props, entry }) ? null : (
      <ContentSection variant={props.variant} title={title}>
        <Component {...props} entry={entry} />
      </ContentSection>
    );
  };

const ItemInfo = makeSection(undefined, ({ entry }) => (
  <>
    <ContentSectionStat label="Type">
      {entry.types.join(", ")}
    </ContentSectionStat>
    <ContentSectionStat label="Base health" quality>
      {entry.merged.max_health}
    </ContentSectionStat>
    <ContentSectionStat label="Stack size">
      {entry.merged.stack_size}
    </ContentSectionStat>
    <ContentSectionStat label="Rocket capacity">
      {entry.merged.weight
        ? 1000000 / entry.merged.weight
        : entry.merged.stack_size}
    </ContentSectionStat>
    <ContentSectionStat label="Inventory Size" quality>
      {entry.merged.inventory_size}
    </ContentSectionStat>
    <ContentSectionStat
      label="Can filter items"
      skip={!entry.merged.filter_count}
    >
      {entry.merged.filter_count} filters
    </ContentSectionStat>
    <ContentSectionStat
      label="Can filter items"
      skip={!entry.merged.filter_count}
    >
      {entry.merged.filter_count} filters
    </ContentSectionStat>
    <ContentSectionStat
      label="Heating Energy"
      skip={!entry.merged.heating_energy}
    >
      {entry.merged.heating_energy}
    </ContentSectionStat>
  </>
));

const AlternativeRecipes = makeSection("Alternative Recipes", ({ entry }) => {
  const { entries } = useFactorioData();
  const recipes = Object.values(entries).filter(
    (e) =>
      e.merged.type === "recipe" &&
      e.recipe.name !== entry.merged.name &&
      e.recipe.results.some?.((r) => r.name === entry.merged.name),
  );
  if (!recipes.length) {
    return null;
  }
  return <EntityGrid items={[recipes.map((r) => r.merged)]} />;
});

const Recipe = makeSection("", ({ entry }) => {
  if (!entry.recipe) return null;
  return (
    <>
      <p className="mb-2 font-bold">Ingredients</p>
      {entry.recipe.ingredients?.map((ingredient) => (
        <Ingredient
          key={ingredient.name}
          name={ingredient.name}
          count={ingredient.amount}
        />
      ))}
      <hr className="border-blackDark my-2 ml-12" />
      <div className="ml-12">
        <span className="font-bold">{entry.merged.energy_required}s</span>{" "}
        Crafting time
      </div>
      <ContentSectionStat
        label={entry.recipe.results?.length > 1 ? "Results" : "Result"}
      >
        {entry.recipe.results?.map((result) => (
          <EntityButton
            key={result.name}
            name={result.name}
            type={result.type}
            subtext={`${result.amount * (result.probability ?? 1)}`}
            dark
          />
        ))}
      </ContentSectionStat>
    </>
  );
});

const Debug = makeSection("Debug Data", ({ entry }) => {
  return (
    <pre
      className="text-xs max-h-[400px] overflow-auto"
      style={{ maxWidth: "400px" }}
    >
      {JSON.stringify(entry, null, 2)}
    </pre>
  );
});

const Main = makeSection(undefined, ({ entry }) => {
  return (
    <>
      <LocaleDescription name={entry.merged.name} />
      <hr className="border-blackLight my-2" />
      <ItemInfo
        name={entry.merged.name}
        type={entry.merged.type}
        variant="inside"
      />
    </>
  );
});

export const EntitySection = { Main, Debug, Recipe, AlternativeRecipes };
