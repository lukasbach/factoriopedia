import { FC } from "react";
import { BaseType, DumpType, FactorioType } from "@factorioui/data";
import {
  ContentSection,
  ContentSectionVariant,
} from "../components/content-section";
import { LocaleDescription } from "./locale-description";

type Props = {
  variant?: ContentSectionVariant;
  type: string;
  name: string;
};

const makeSection =
  <T extends BaseType>(
    type: T["type"] | undefined,
    Component: FC<
      Props & { entity: Record<keyof DumpType["entries"], FactorioType> }
    >,
  ) =>
  (props: Props) => {
    if (type && type !== props.entity.type) return null;
    const Componentx = Component as FC<Props>;
    return <Componentx {...props} />;
  };

const Main = makeSection("", ({ variant, entity }) => {
  return (
    <ContentSection variant={variant}>
      <LocaleDescription type={entity.type} name={entity.name} />
      <hr />
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

export const EntitySection = { Main, Debug };
