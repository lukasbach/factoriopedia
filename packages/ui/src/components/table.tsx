import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableCell } from "./table-cell";

export function Table<T>({
  columns,
  data,
  onClickCell,
}: {
  columns: ColumnDef<T>[];
  data: T[];
  onClickCell: (row: string, cell: string) => void;
}) {
  const table = useReactTable<T>({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // client-side sorting
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableCell
                  key={header.id}
                  isTitle
                  onClick={
                    header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                  sorting={header.column.getIsSorted() || undefined}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableCell>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id} className="group">
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell
                    key={cell.id}
                    onClick={
                      onClickCell
                        ? () => onClickCell(row.id, cell.id)
                        : undefined
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
