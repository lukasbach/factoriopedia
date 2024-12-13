import { FC, memo } from "react";
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

const showAlways = () => true;

const makeSection = <T,>(
  title: string | undefined,
  compute: (
    entry: DumpType["entries"][string],
    data: DumpType,
  ) => T | false | null,
  Component: FC<
    Props & {
      entry: DumpType["entries"][string];
      result: T;
      data: DumpType;
    }
  >,
) =>
  memo((props: Props) => {
    const data = useFactorioData();
    const entry = useEntry(props.name, props.type);
    if (!entry) return null;
    const result = compute(entry, data);
    return !result ? null : (
      <ContentSection variant={props.variant} title={title}>
        <Component {...props} entry={entry} result={result} data={data} />
      </ContentSection>
    );
  });

const ItemInfo = makeSection(undefined, showAlways, ({ entry }) => (
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

const AlternativeRecipes = makeSection(
  "Alternative Recipes",
  (entry, data) =>
    Object.values(data.entries).filter(
      (e) =>
        e.merged.type === "recipe" &&
        e.recipe.name !== entry.merged.name &&
        e.recipe.results.some?.((r) => r.name === entry.merged.name),
    ),
  ({ result }) => <EntityGrid items={[result.map((r) => r.merged)]} />,
);

const MadeIn = makeSection(
  "Made In",
  (entry, data) =>
    entry.recipe?.category &&
    Object.values(data.entries).filter((e) =>
      e["assembling-machine"]?.crafting_categories?.includes(
        entry.recipe.category,
      ),
    ),
  ({ result }) => <EntityGrid items={[result.map((r) => r.merged)]} />,
);

const UsedIn = makeSection(
  "Used In",
  (entry, data) =>
    Object.values(data.entries).filter((e) =>
      e.recipe?.ingredients?.some?.(
        (ingredient) => ingredient.name === entry.merged.name,
      ),
    ),
  ({ result }) => <EntityGrid items={[result.map((r) => r.merged)]} />,
);

const Recipe = makeSection(
  "Ingredients",
  (entry) => entry.recipe,
  ({ entry }) => (
    <>
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
  ),
);

const AppearsOn = makeSection(
  "Appears on",
  (entry, data) =>
    Object.values(data.entries ?? {}).filter((e) =>
      Object.keys(
        e.planet?.map_gen_settings?.autoplace_controls ?? {},
      ).includes(entry.merged.name),
    ),
  ({ result }) => {
    // TODO doesnt work great
    return <EntityGrid items={[result.map((r) => r.merged)]} />;
  },
);

const EquipmentGridPlaceable = makeSection(
  "Placed in equipment grid",
  (entry) => entry.merged.shape,
  ({ result }) => {
    return (
      <ContentSectionStat label="Dimensions">
        {result.width}x{result.height}
      </ContentSectionStat>
    );
  },
);

const Electricity = makeSection(
  "Electricity",
  (entry) =>
    entry.merged.energy_source?.type === "electric"
      ? entry.merged.energy_source
      : false,
  ({ result, entry }) => {
    return (
      <>
        <ContentSectionStat label="Energy capacity" quality>
          {result.buffer_capacity}
        </ContentSectionStat>
        <ContentSectionStat label="Produces energy" quality>
          {entry.merged.production}
        </ContentSectionStat>
        <ContentSectionStat label="Uses energy">
          {entry.merged.power_input}
        </ContentSectionStat>
        <ContentSectionStat label="Max. output" quality>
          {result.output_flow_limit}
        </ContentSectionStat>
      </>
    );
  },
);

const Dummy = makeSection(
  "",
  () => true,
  ({ entry }) => {
    const { entries } = useFactorioData();
    return null;
  },
);

const Debug = makeSection(
  "Debug Data",
  () => true,
  ({ entry }) => {
    return (
      <pre
        className="text-xs max-h-[400px] overflow-auto"
        style={{ maxWidth: "400px" }}
      >
        {JSON.stringify(entry, null, 2)}
      </pre>
    );
  },
);

const Main = makeSection(
  undefined,
  () => true,
  ({ entry }) => {
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
  },
);

export const EntitySection = {
  Main,
  Debug,
  Recipe,
  AlternativeRecipes,
  MadeIn,
  UsedIn,
  AppearsOn,
  EquipmentGridPlaceable,
  Electricity,
};
