import { createFileRoute } from "@tanstack/react-router";

import { FactorioImage, Table } from "@factorioui/components";
import { createColumnHelper } from "@tanstack/react-table";
import { FC } from "react";
import { TwoColumnContainer } from "../components/two-column-container";
import { TabbedContentPane } from "../components/tabbed-content-pane";
import * as tools from "../tools";

export const Route = createFileRoute("/tool/$tool")({
  component: Page,
});

export type Tool = {
  title: string;
  id: string;
  icon: [string, string];
  render: FC;
};

const toolList = Object.entries(tools).map(([id, tool]) => ({ ...tool, id }));

const columnHelper = createColumnHelper<Tool>();
const columns = [
  columnHelper.accessor("icon", {
    id: "icon",
    header: () => "",
    size: 32,
    cell: (info) => (
      <FactorioImage
        width={32}
        image={info.getValue()[1]}
        spritesheet={info.getValue()[0]}
      />
    ),
  }),
  columnHelper.accessor("title", {
    header: () => "Tool title",
  }),
];

function Page() {
  const params = Route.useParams();
  const navigate = Route.useNavigate();
  const tool = (tools as any)[params.tool] as Tool;
  const ToolComp =
    tool?.render || (() => <div>Select a tool on the left.</div>);
  return (
    <TwoColumnContainer
      left={
        <div className="min-w-[300px]">
          <Table
            columns={columns}
            onClickCell={(row) => {
              navigate({
                to: "/tool/$tool",
                params: { tool: row.original.id },
              });
            }}
            isRowActive={(row) => row.original.id === params.tool}
            data={toolList}
          />
        </div>
      }
      right={
        <TabbedContentPane
          title={
            <>
              <FactorioImage
                image={tool?.icon[1]}
                spritesheet={tool?.icon[0]}
                width={24}
              />
              {tool?.title}
            </>
          }
          tabsList={null}
        >
          <ToolComp />
        </TabbedContentPane>
      }
    />
  );
}
