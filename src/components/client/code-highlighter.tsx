"use client";

import { useEffect, useRef } from "react";

/**
 * Lazily highlights code with Shiki on the client. Renders a plain fallback
 * first so the page works without JavaScript or before hydration.
 */
export function CodeHighlighter({
  lang,
  text,
}: {
  lang?: string;
  text: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const language = (lang ?? "text").toUpperCase();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let cancelled = false;

    (async () => {
      try {
        const { createHighlighterCoreSync, createJavaScriptRegexEngine } =
          await import("shiki");
        const { bundledLanguages } = await import("shiki/langs");
        const githubDark = (await import("shiki/themes/github-dark.mjs"))
          .default;
        const githubLight = (await import("shiki/themes/github-light.mjs"))
          .default;
        if (cancelled) return;

        const highlighter = createHighlighterCoreSync({
          engine: createJavaScriptRegexEngine({ forgiving: true }),
          themes: [githubDark, githubLight],
          langs: [],
        });

        const language =
          lang && lang in bundledLanguages ? lang : ("text" as const);
        if (!highlighter.getLoadedLanguages().includes(language)) {
          const loader =
            bundledLanguages[language as keyof typeof bundledLanguages];
          if (loader) await highlighter.loadLanguage(await loader());
        }
        if (cancelled) return;

        const html = highlighter.codeToHtml(text, {
          lang: language,
          themes: { light: "github-light", dark: "github-dark" },
        });

        const target = node.querySelector("pre");
        if (target && !cancelled) {
          target.outerHTML = html;
        }
      } catch {
        // Keep the plain fallback markup.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [lang, text]);

  return (
    <div className="code-card">
      <div className="language-tip">
        <span aria-hidden="true">{language}</span>
      </div>
      <div
        ref={ref}
        className="overflow-auto"
        style={{ scrollbarGutter: "stable" }}
      >
        <pre className="shiki">
          <code>{text}</code>
        </pre>
      </div>
    </div>
  );
}
