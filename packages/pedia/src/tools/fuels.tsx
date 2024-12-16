import { FC } from "react";
import {
  FactorioImage,
  LocaleName,
  Table,
  useEntriesOfType,
} from "@factorioui/components";
import { createColumnHelper } from "@tanstack/react-table";
import { Tool } from "../routes/tool.$tool.tsx";

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
  // columnHelper.accessor("merged.fuel_category", {
  //   header: () => "Fuel Category",
  // }),
  columnHelper.accessor("merged.fuel_value", {
    header: () => "Fuel Value",
  }),
  columnHelper.accessor("merged.fuel_acceleration_multiplier", {
    header: () => "Acc.",
    cell: (info) => (info.getValue() ? `x${info.getValue()}` : "-"),
  }),
  columnHelper.accessor("merged.fuel_top_speed_multiplier", {
    header: () => "Top Speed",
    cell: (info) => (info.getValue() ? `x${info.getValue()}` : "-"),
  }),
];

const ToolRender: FC = () => {
  const data = useEntriesOfType("item", (entry) => entry.merged.fuel_value);
  return <Table data={data} columns={columns} />;
};

export const fuels: Omit<Tool, "id"> = {
  title: "Fuel Values",
  icon: ["item", "rocket-fuel"],
  render: ToolRender,
};
