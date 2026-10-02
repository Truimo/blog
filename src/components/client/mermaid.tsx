"use client";

import { useEffect, useRef } from "react";

const mermaidBgStyle: React.CSSProperties = {
  backgroundImage: "radial-gradient(circle, #e4e4e48c 2px, #0000 0)",
  backgroundSize: "30px 30px",
};

/**
 * Renders a Mermaid diagram on the client. The raw code is rendered first as a
 * fallback and replaced with the rendered SVG once mermaid loads.
 */
export function Mermaid({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let cancelled = false;

    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "default";
        mermaid.initialize({
          startOnLoad: false,
          theme,
          look: "handDrawn",
        });
        const { svg } = await mermaid.render(
          `mermaid-${Math.random().toString(36).slice(2)}`,
          code,
        );
        if (cancelled) return;
        node.innerHTML = svg;
      } catch {
        if (!cancelled) node.textContent = code;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [code]);

  return (
    <div ref={ref} style={mermaidBgStyle}>
      {code}
    </div>
  );
}
