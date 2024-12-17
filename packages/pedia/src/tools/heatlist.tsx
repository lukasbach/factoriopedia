import { FC } from "react";
import {
  FactorioImage,
  LocaleName,
  Table,
  useEntriesOfType,
} from "@factorioui/components";
import { createColumnHelper } from "@tanstack/react-table";
import { Tool } from "../routes/tool.$tool";

const columnHelper = createColumnHelper<any>();
const columns = [
  columnHelper.accessor("merged.name", {
    header: () => "",
    size: 28,
    cell: (info) => (
      <FactorioImage width={24} image={info.getValue()} spritesheet="item" />
    ),
  }),
  columnHelper.accessor("merged.name", {
    header: () => "Item",
    cell: (info) => <LocaleName name={info.getValue()} />,
  }),
  columnHelper.accessor("merged.heating_energy", {
    header: () => "Heating Energy",
  }),
];

const ToolRender: FC = () => {
  const data = useEntriesOfType("item", (entry) => entry.merged.heating_energy);
  return <Table data={data} columns={columns} />;
};

export const heatlist: Omit<Tool, "id"> = {
  title: "Heating Energy of items",
  icon: ["item", "heating-tower"],
  render: ToolRender,
};
