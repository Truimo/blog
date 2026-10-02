import type { ModuleLoader } from 'remix/assets'

/**
 * mermaid's ESM bundles contain top-level free references to CommonJS
 * globals (`typeof exports == "object" && exports && !exports.nodeType` from
 * inlined lodash-es source). These branches are dead code in the browser but
 * the asset server's static CommonJS check rejects any module with free
 * `exports`/`module`/`require` references.
 *
 * Declaring them as local variables at the top of the module makes the check
 * pass without changing runtime behavior: `typeof exports` still evaluates to
 * `'undefined'`, so the same guards short-circuit to false.
 */

const MERMAID_DIST_SCRIPT = /\/node_modules\/\.pnpm\/mermaid@\d[^/]*\/node_modules\/mermaid\/dist\/(?:mermaid\.esm(?:\.min)?\.mjs|chunks\/mermaid\.esm(?:\.min)?\/[^/]+\.mjs)$/

const FREE_CJS_GLOBALS = /\b(?:exports|module|require)\b/

type ModuleSource = string | ArrayBuffer | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | BigUint64Array | BigInt64Array | Float32Array | Float64Array | Float16Array

export const mermaidCjsGlobalsLoader: ModuleLoader = (url, context, nextLoad) => {
    const result = nextLoad(url, context)

    if (MERMAID_DIST_SCRIPT.test(new URL(url).pathname)) {
        const source = moduleLoadSourceToString(result.source)
        if (FREE_CJS_GLOBALS.test(source)) {
            return {
                format: 'module',
                shortCircuit: true,
                source: `var exports, module, require;\n${source}`,
            }
        }
    }

    return result
}

function moduleLoadSourceToString(source: ModuleSource | undefined): string {
    if (source === undefined) return ''
    if (typeof source === 'string') return source
    return new TextDecoder().decode(source instanceof ArrayBuffer ? new Uint8Array(source) : source)
}
