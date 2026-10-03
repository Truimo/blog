import type { TableRowBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints.js";
import type { ReactNode } from "react";
import { RichText } from "@/components/notion/rich-text";

export function Table({ children }: { children?: ReactNode }) {
  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-separator text-sm">
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function TableRow({
  block,
  isHeaderRow,
  isRowHeaderColumn,
}: {
  block: TableRowBlockObjectResponse;
  isHeaderRow?: boolean;
  isRowHeaderColumn?: boolean;
}) {
  return (
    <tr>
      {block.table_row.cells.map((cell, idx) => {
        const isHeader = isHeaderRow || (isRowHeaderColumn && idx === 0);
        const className = isHeader
          ? "border border-separator bg-surface p-2 text-left font-semibold md:p-3"
          : "border border-separator p-2 md:p-3";
        return isHeader ? (
          <th
            // biome-ignore lint/suspicious/noArrayIndexKey: stable ordered cells
            key={idx}
            scope={isRowHeaderColumn && idx === 0 ? "row" : "col"}
            className={className}
          >
            <RichText rich_text={cell} />
          </th>
        ) : (
          <td
            // biome-ignore lint/suspicious/noArrayIndexKey: stable ordered cells
            key={idx}
            className={className}
          >
            <RichText rich_text={cell} />
          </td>
        );
      })}
    </tr>
  );
}
