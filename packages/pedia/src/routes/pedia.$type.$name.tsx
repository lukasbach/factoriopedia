import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  EntityGrid,
  GroupTabs,
  Surface,
  useResolveJointItemEntries,
} from "@factorioui/components";

const PediaSearchSchema = z.object({
  group: z.string().optional(),
});

export const Route = createFileRoute("/pedia/$type/$name")({
  component: Page,
  validateSearch: PediaSearchSchema,
});

function Page() {
  const { type, name } = Route.useParams();
  const { group } = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <Surface
      color="blackMedium"
      shadow="topglow-2"
      className="w-[960px] rounded flex gap-2 p-2"
    >
      <Surface color="blackDark" shadow="inset-1">
        <div>
          <GroupTabs
            gridWidth={6}
            selectedGroup={group}
            onSelectGroup={(group) =>
              navigate({ params: { type, name }, search: { group } })
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
            activeItem={{ type, name } as any}
            onClick={(type, name) =>
              navigate({ params: { type, name }, search: { group } })
            }
            items={Object.values(
              useResolveJointItemEntries({
                group,
                types: ["item", "tool", "recipe"],
              }),
            ).map((subgroup) =>
              subgroup.map((item) => ({ type: item.type, name: item.name })),
            )}
          />
        </Surface>
      </Surface>
      <Surface color="blackDark" shadow="inset-1" className="grow">
        asd
      </Surface>
    </Surface>
  );
}
