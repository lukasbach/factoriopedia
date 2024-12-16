import {
  Cell,
  ColumnDef,
  Row,
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
  isRowActive,
}: {
  columns: ColumnDef<T, any>[];
  data: T[];
  onClickCell?: (row: Row<T>, cell: Cell<T, unknown>) => void;
  isRowActive?: (row: Row<T>) => boolean;
}) {
  const table = useReactTable<T>({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table
      // className="w-full"
      style={{ tableLayout: "fixed", width: "-webkit-fill-available" }}
    >
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="group">
            {headerGroup.headers.map((header) => {
              return (
                <TableCell
                  key={header.id}
                  style={{
                    minWidth: `${header.getSize()}px`,
                    maxWidth: `${header.getSize()}px`,
                    width: `${header.getSize()}px`,
                  }}
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
          const isActive = isRowActive?.(row);
          return (
            <tr key={row.id} className="group">
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell
                    key={cell.id}
                    isActive={isActive}
                    onClick={
                      onClickCell ? () => onClickCell(row, cell) : undefined
                    }
                    style={{
                      minWidth: `${cell.column.getSize()}px`,
                      maxWidth: `${cell.column.getSize()}px`,
                      width: `${cell.column.getSize()}px`,
                    }}
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
