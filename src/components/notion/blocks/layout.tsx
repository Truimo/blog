import type { ReactNode } from "react";
import { colorClass } from "@/lib/colors";
import { clsxm } from "@/lib/utils";

export function BlockWrapper({
  children,
  className,
  color,
}: {
  children?: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <div className={clsxm("py-1 leading-normal", className, colorClass(color))}>
      {children}
    </div>
  );
}

export function InlineBlock({
  children,
  className,
  color,
}: {
  children?: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <p
      className={clsxm(
        "break-words py-1 leading-normal",
        className,
        colorClass(color),
      )}
    >
      {children}
    </p>
  );
}
