import { FC } from "react";
import { BaseType, ItemType, RecipeType } from "@factorioui/data";
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
  <T extends BaseType>(
    type: T["type"] | undefined,
    Component: FC<Props & { entity: T }>,
  ) =>
  (props: Props) => {
    const { entries } = useFactorioData();
    const Componentx = Component as FC<Props>;
    if (!type) return <Componentx {...props} />;
    const entry = (entries as any)[type]?.[props.name];
    if (!entry) return null;
    return <Component {...props} entity={entry} />;
  };

const ItemInfo = makeSection<ItemType>("item", ({ entity }) => {
  return (
    <>
      <ContentSectionStat label="Stack size">
        {entity.stack_size}
      </ContentSectionStat>
      <ContentSectionStat label="Rocket capacity">
        {entity.weight ? 1000000 / entity.weight : "?"}
      </ContentSectionStat>
    </>
  );
});

const Main = makeSection(undefined, ({ variant, name }) => {
  return (
    <ContentSection variant={variant}>
      <LocaleDescription type="item" name={name} />
      <hr />
      <ItemInfo name={name} />
    </ContentSection>
  );
});

const Recipe = makeSection<RecipeType>("recipe", ({ entity }) => {
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
