import type { ColumnBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints.js";
import type { ReactNode } from "react";
import { BlockWrapper } from "@/components/notion/blocks/layout";

export function ColumnList({
  columnCount,
  children,
}: {
  columnCount: number;
  children?: ReactNode;
}) {
  return (
    <BlockWrapper>
      <div
        className="grid grid-cols-1 gap-x-3 md:grid-cols-[repeat(var(--col-count),minmax(0,1fr))]"
        style={{ "--col-count": String(columnCount) } as React.CSSProperties}
      >
        {children}
      </div>
    </BlockWrapper>
  );
}

export function Column({
  block,
  children,
}: {
  block: ColumnBlockObjectResponse;
  children?: ReactNode;
}) {
  const ratio = block.column.width_ratio;
  if (typeof ratio === "number" && ratio > 0 && ratio !== 1) {
    return (
      <section style={{ flex: `0 0 ${ratio * 100}%` } as React.CSSProperties}>
        {children}
      </section>
    );
  }
  return <section>{children}</section>;
}
