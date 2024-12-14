import type { Meta } from "@storybook/react";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "./table";
import { Surface } from "./surface";
import { TableCell } from "./table-cell";

const meta = {
  title: "Components/Table",
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;

export const IndividualTableCells = () => (
  <Surface className="flex flex-col">
    <div className="flex">
      <TableCell onClick={() => {}} isTitle>
        Cell 1
      </TableCell>
      <TableCell onClick={() => {}} isTitle sorting="desc">
        Cell 1
      </TableCell>
      <TableCell isTitle sorting="asc">
        Cell 1
      </TableCell>
    </div>
    <div className="flex group">
      <TableCell isActive>Cell 1</TableCell>
      <TableCell isActive>Cell 1</TableCell>
      <TableCell isActive>Cell 1</TableCell>
    </div>
    <div className="flex group">
      <TableCell onClick={() => {}}>Cell 1</TableCell>
      <TableCell onClick={() => {}}>Cell 1</TableCell>
      <TableCell onClick={() => {}}>Cell 1</TableCell>
    </div>
  </Surface>
);

const columns: ColumnDef<{ a: string; b: string }>[] = [
  {
    accessorKey: "a",
    cell: (info) => info.getValue(),
    header: () => <span>First Cell</span>,
  },
  {
    accessorKey: "b",
    cell: (info) => info.getValue(),
    header: () => <span>Second Cell</span>,
  },
] as const;

export const TanstackTable = () => (
  <Table
    columns={columns}
    data={[
      { a: "Lorem ipsum", b: "doloret amet" },
      { a: "consectetur", b: "adipiscing elit" },
      { a: "sed do", b: "eiusmod tempor" },
      { a: "incididunt", b: "ut labore" },
      { a: "et dolore", b: "magna aliqua" },
      { a: "Ut enim", b: "ad minim" },
      { a: "veniam", b: "quis nostrud" },
      { a: "exercitation", b: "ullamco laboris" },
      { a: "nisi ut", b: "aliquip ex" },
      { a: "ea commodo", b: "consequat" },
    ]}
    onClickCell={console.log}
  />
);
