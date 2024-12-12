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

const PediaSearchSchema = z.object({
  group: z.string().optional(),
});

export const Route = createFileRoute("/pedia/$name")({
  component: Page,
  validateSearch: PediaSearchSchema,
});

function Page() {
  const { name } = Route.useParams();
  const { group } = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <>
      <Surface color="blackDark" shadow="inset-1">
        <div>
          <GroupTabs
            gridWidth={6}
            selectedGroup={group}
            onSelectGroup={(group) =>
              navigate({ params: { name }, search: { group } })
            }
          />
        </div>

        <Surface
          color="blackLight"
          shadow="topglow-1"
          className="p-2 flex items-center align-middle justify-center"
        >
          <EntityGrid
            gridWidth={12}
            gridHeight={14}
            activeItem={name}
            onClick={(name) =>
              navigate({ params: { name }, search: { group } })
            }
            items={Object.values(
              useResolveJointItemEntries({
                group,
                types: ["item", "tool", "recipe"],
              }),
            ).map((subgroup) => subgroup.map((item) => item.name))}
          />
        </Surface>
      </Surface>
      <Surface color="blackDark" shadow="inset-1" className="grow ">
        <TabsRoot defaultValue="pedia" className="h-full flex flex-col">
          <Surface shadow="deepinset">
            <div className="py-2 px-2 text-textBeige font-bold flex items-center gap-2">
              <FactorioImage image={name} width={24} />
              <LocaleName name={name} />
            </div>
            <TabsList className="ml-2">
              <TabsTrigger value="pedia">Entity</TabsTrigger>
              <TabsTrigger value="raw">Raw Data</TabsTrigger>
            </TabsList>
          </Surface>
          <Surface
            color="blackLight"
            shadow="inset-1"
            className="grow overflow-auto p-2"
          >
            <TabsContent value="pedia">
              <EntitySection.Main name={name} />
              <EntitySection.Recipe name={name} />
              {/* <EntitySection.Debug name={name} /> */}
            </TabsContent>
            <TabsContent value="raw">
              <EntitySection.Debug name={name} />
            </TabsContent>
          </Surface>
        </TabsRoot>
      </Surface>
    </>
  );
}
