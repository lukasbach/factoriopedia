import { FC } from "react";
import { FactorioType } from "@factorioui/data";
import {
  ContentSection,
  ContentSectionStat,
  ContentSectionVariant,
} from "../components/content-section";
import { LocaleDescription } from "./locale-description";
import { useFactorioData } from "../components/data-provider";

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

const ItemInfo = makeSection("item", ({ entity }) => {
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
      <hr />
      <ItemInfo name={name} />
    </ContentSection>
  );
});

const Recipe = makeSection("recipe", ({ entity }) => {
  return (
    <ContentSection variant="flat">
      <p>Ingredients</p>
      {entity.ingredients?.map((ingredient) => (
        <ContentSectionStat label={`${ingredient.amount} ${ingredient.name}`} />
      ))}
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
