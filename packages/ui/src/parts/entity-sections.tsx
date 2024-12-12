import { FC } from "react";
import { FactorioType } from "@factorioui/data";
import {
  ContentSection,
  ContentSectionStat,
  ContentSectionVariant,
} from "../components/content-section";
import { LocaleDescription } from "./locale-description";
import { useFactorioData } from "../components/data-provider";
import { Ingredient } from "./ingredient";

type Props = {
  variant?: ContentSectionVariant;
  name: string;
};

const makeSection =
  (type: string | undefined, Component: FC<Props & { entity: FactorioType }>) =>
  (props: Props) => {
    const { entries } = useFactorioData();
    const entry = entries[props.name];
    if (type && !entry.types.includes(type)) return null;
    if (!entry) return null;
    return <Component {...props} entity={entry} />;
  };

const ItemInfo = makeSection(undefined, ({ entity }) => {
  return (
    <>
      <ContentSectionStat label="Stack size">
        {entity.stack_size}
      </ContentSectionStat>
      <ContentSectionStat label="Rocket capacity">
        {entity.weight ? 1000000 / entity.weight : entity.stack_size}
      </ContentSectionStat>
    </>
  );
});

const Main = makeSection(undefined, ({ variant, name }) => {
  return (
    <ContentSection variant={variant}>
      <LocaleDescription name={name} />
      <hr className="border-blackLight my-2" />
      <ItemInfo name={name} />
    </ContentSection>
  );
});

const Recipe = makeSection("recipe", ({ entity }) => {
  return (
    <ContentSection variant="flat">
      <p className="mb-2 font-bold">Ingredients</p>
      {entity.ingredients?.map((ingredient) => (
        <Ingredient name={ingredient.name} count={ingredient.amount} />
      ))}
      <hr className="border-blackDark my-2 ml-12" />
      <div className="ml-12">
        <span className="font-bold">{entity.energy_required}s</span> Crafting
        time
      </div>
    </ContentSection>
  );
});

const Debug = makeSection("", ({ variant, entity }) => {
  return (
    <ContentSection variant={variant} title="Debug Data">
      <pre className="text-xs">{JSON.stringify(entity, null, 2)}</pre>
    </ContentSection>
  );
});

export const EntitySection = { Main, Debug, Recipe };
