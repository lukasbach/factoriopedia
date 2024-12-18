import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  EntityGrid,
  EntitySection,
  FactorioImage,
  GroupTabs,
  LocaleName,
  Surface,
  useResolveJointItemEntries,
} from "@factorioui/components";
import {
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@factorioui/components/lib/components/tabs";
import { TwoColumnContainer } from "../components/two-column-container";
import { TabbedContentPane } from "../components/tabbed-content-pane";

const PediaSearchSchema = z.object({
  group: z.string().catch("logistics"),
});

export const Route = createFileRoute("/pedia/$type/$name")({
  component: Page,
  validateSearch: PediaSearchSchema,
});

function Page() {
  const { name, type } = Route.useParams();
  const { group } = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <TwoColumnContainer
      left={
        <>
          <div>
            <GroupTabs
              gridWidth={6}
              selectedGroup={group}
              onSelectGroup={(group) =>
                navigate({ params: { name, type }, search: { group } })
              }
            />
          </div>

          <Surface
            color="blackLight"
            shadow="topglow-1"
            className="p-2 grow flex items-center align-middle justify-center overflow-auto"
          >
            <EntityGrid
              gridWidth={12}
              // gridHeight={14}
              activeItem={{ name, type }}
              onClick={({ name, type }) =>
                navigate({ params: { name, type }, search: { group } })
              }
              items={useResolveJointItemEntries({
                group,
              }).map((subgroup) =>
                subgroup.map(({ name, type }) => ({
                  name,
                  type,
                })),
              )}
            />
          </Surface>
        </>
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
                <TabsTrigger value="pedia">Entity</TabsTrigger>
                <TabsTrigger value="raw">Raw Data</TabsTrigger>
              </TabsList>
            }
          >
            <TabsContent value="pedia">
              <EntitySection.Main name={name} type={type} />
              <EntitySection.CanCraft name={name} type={type} />
              <EntitySection.EquipmentGridPlaceable name={name} type={type} />
              <EntitySection.Electricity name={name} type={type} />
              <EntitySection.Recipe name={name} type={type} variant="flat" />
              <EntitySection.CanCraftItemList
                name={name}
                type={type}
                variant="flat"
              />
              <EntitySection.AlternativeRecipes
                name={name}
                type={type}
                variant="flat"
              />
              <EntitySection.MadeIn name={name} type={type} variant="flat" />
              <EntitySection.UsedIn name={name} type={type} variant="flat" />
              <EntitySection.AppearsOn name={name} type={type} variant="flat" />
            </TabsContent>
            <TabsContent value="raw">
              <EntitySection.Debug name={name} type={type} />
            </TabsContent>
          </TabbedContentPane>
        </TabsRoot>
      }
    />
  );
}
