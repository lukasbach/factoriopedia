import { createFileRoute } from "@tanstack/react-router";
import {
  EntitySection,
  FactorioImage,
  LocaleName,
  useEntriesOfType,
} from "@factorioui/components";
import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@factorioui/components/lib/components/tabs";
import { ButtonGrid } from "@factorioui/components/src";
import { TechnologyEntityButton } from "@factorioui/components/lib/parts/technology-entity-button";
import { TwoColumnContainer } from "../components/two-column-container";
import { TabbedContentPane } from "../components/tabbed-content-pane";

export const Route = createFileRoute("/technology/$name")({
  component: Page,
});

function Page() {
  const { name } = Route.useParams();
  const navigate = Route.useNavigate();
  return (
    <TwoColumnContainer
      left={
        <ButtonGrid itemWidth={120} itemHeight={180} gridWidth={4}>
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
            <TabsContent value="pedia">asd</TabsContent>
            <TabsContent value="raw">
              <EntitySection.Debug name={name} type="technology" />
            </TabsContent>
          </TabbedContentPane>
        </TabsRoot>
      }
    />
  );
}
