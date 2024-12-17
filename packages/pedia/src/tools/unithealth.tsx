import { FC, useMemo } from "react";
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
    size: 48,
    cell: (info) => (
      <FactorioImage width={24} image={info.getValue()} spritesheet="item" />
    ),
  }),
  columnHelper.accessor("merged.name", {
    header: () => "Unit",
    size: 150,
    cell: (info) => <LocaleName name={info.getValue()} />,
  }),
  columnHelper.accessor("merged.max_health", {
    header: () => "Max Health",
    cell: (info) => Math.floor(Number.parseFloat(info.getValue()) * 100) / 100,
  }),
  columnHelper.accessor("merged.healing_per_tick", {
    header: () => "Healing",
    cell: (info) =>
      `${Math.floor(Number.parseFloat(info.getValue()) * 100 * 60) / 100}/s`,
  }),
];

const ToolRender: FC = () => {
  const units = useEntriesOfType("unit");
  const spiderUnits = useEntriesOfType("spider-unit");
  const segmentedUnits = useEntriesOfType("segmented-unit");
  const turrets = useEntriesOfType("turret");
  const data = useMemo(
    () => [...units, ...spiderUnits, ...segmentedUnits, ...turrets],
    [units, spiderUnits, segmentedUnits, turrets],
  );
  return <Table data={data} columns={columns} />;
};

export const unithealth: Omit<Tool, "id"> = {
  title: "Unit Healths",
  icon: ["unit", "small-biter"],
  render: ToolRender,
};
