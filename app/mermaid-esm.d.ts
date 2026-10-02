/**
 * mermaid's package exports map points `.` at `mermaid.core.mjs`, whose
 * dependency graph includes CommonJS-only packages (fastdom,
 * @braintree/sanitize-url). The fully bundled `mermaid.esm.mjs` inlines all of
 * them and is the only browser-compatible entry for the asset server.
 */
declare module 'mermaid/dist/mermaid.esm.mjs' {
    import type Mermaid from 'mermaid'
    const mermaid: typeof Mermaid
    export default mermaid
}
