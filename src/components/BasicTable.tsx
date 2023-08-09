import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import mData from "../MOCK_DATA.json";
import { useMemo } from "react";

export default function BasicTable() {
  const data = useMemo(() => mData, []);
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    // {
    //   header: "First Name",
    //   accessorKey: "first_name",
    // },
    // {
    //   header: "Last Name",
    //   accessorKey: "last_name",
    // },
    {
      header: "Name",
      accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: (info) => (
        <a
          href={`mailto:${info.getValue()}`}
          target="_blank"
          style={{ color: "#888" }}
        >
          {info.getValue()}
        </a>
      ),
    },
    {
      header: "Gender",
      accessorKey: "gender",
    },
    {
      header: "IP Address",
      accessorKey: "ip_address",
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div>
      <table
        style={{
          margin: "0 auto",
          textAlign: "left",
          borderSpacing: "0px",
          color: "white",
        }}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            style={{ borderRadius: "5px", background: "#888", padding: "10px" }}
          >
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{
                  outline: "none",
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ padding: "10px" }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ paddingTop: "10px" }}>
        <button
          style={{
            padding: "5px",
            margin: "2px",
            background: "none",
            border: "1px solid black",
            borderRadius: "3px",
            cursor: "pointer",
          }}
          onClick={() => table.setPageIndex(0)}
        >
          First Page
        </button>
        <button
          style={{
            padding: "5px",
            margin: "2px",
            background: "none",
            border: "1px solid black",
            borderRadius: "3px",
            cursor: "pointer",
          }}
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous Page
        </button>
        <button
          style={{
            padding: "5px",
            margin: "2px",
            background: "none",
            border: "1px solid black",
            borderRadius: "3px",
            cursor: "pointer",
          }}
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next Page
        </button>
        <button
          style={{
            padding: "5px",
            margin: "2px",
            background: "none",
            border: "1px solid black",
            borderRadius: "3px",
            cursor: "pointer",
          }}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last Page
        </button>
      </div>
    </div>
  );
}
