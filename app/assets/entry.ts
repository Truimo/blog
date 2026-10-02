import { run } from 'remix/component'

run({
  async loadModule(moduleUrl, exportName) {
    let mod = await import(moduleUrl)
    return mod[exportName]
  },
})
