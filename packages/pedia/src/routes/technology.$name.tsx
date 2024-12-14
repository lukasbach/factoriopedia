import { createFileRoute } from "@tanstack/react-router";
import {
  ButtonGrid,
  EntitySection,
  FactorioImage,
  LocaleDescription,
  LocaleName,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  TechnologyEntityButton,
  useEntriesOfType,
  useFactorioData,
} from "@factorioui/components";
import { TwoColumnContainer } from "../components/two-column-container";
import { TabbedContentPane } from "../components/tabbed-content-pane";

export const Route = createFileRoute("/technology/$name")({
  component: Page,
});

function Page() {
  const { entries } = useFactorioData();
  const { name } = Route.useParams();
  const navigate = Route.useNavigate();
  const technology = entries[name]?.technology;
  if (!technology) return null;
  return (
    <TwoColumnContainer
      left={
        <ButtonGrid itemWidth={100} itemHeight={140} gridWidth={5}>
          <div className="flex flex-wrap w-full">
            {useEntriesOfType("technology").map((tech) => (
              <TechnologyEntityButton
                name={tech.technology.name}
                onClick={() =>
                  navigate({ params: { name: tech.technology.name } })
                }
              />
            ))}
          </div>
        </ButtonGrid>
      }
      right={
        <TabsRoot defaultValue="pedia" className="h-full">
          <TabbedContentPane
            title={
              <>
                <FactorioImage image={name} width={24} />
                <LocaleName name={name} />
              </>
            }
            tabsList={
              <TabsList className="ml-2">
                <TabsTrigger value="pedia">Technology</TabsTrigger>
                <TabsTrigger value="raw">Raw Data</TabsTrigger>
              </TabsList>
            }
          >
            <TabsContent value="pedia">
              <div className="flex gap-1 mb-2 min-h-[160px]">
                <TechnologyEntityButton
                  name={technology.name}
                  onClick={() =>
                    navigate({ params: { name: technology.name } })
                  }
                />
                <div className="grow">
                  <p className="mx-2 mb-2">
                    <LocaleDescription name={technology.name} />
                  </p>
                  <EntitySection.TechCost
                    type="technology"
                    name={technology.name}
                    variant="flat"
                  />
                  <EntitySection.TechResearchTrigger
                    type="technology"
                    name={technology.name}
                    variant="flat"
                  />
                </div>
              </div>

              <EntitySection.TechUnlocksRecipes
                type="technology"
                name={technology.name}
                variant="flat"
              />
              <EntitySection.TechPrerequisites
                type="technology"
                name={technology.name}
                variant="flat"
              />
              <EntitySection.TechPrerequisiteFor
                type="technology"
                name={technology.name}
                variant="flat"
              />
            </TabsContent>
            <TabsContent value="raw">
              <EntitySection.Debug name={name} type="technology" />
            </TabsContent>
          </TabbedContentPane>
        </TabsRoot>
      }
    />
  );
}
