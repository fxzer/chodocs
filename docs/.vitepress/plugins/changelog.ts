import type { Plugin } from 'vite'
import type { CommitInfo } from '../metadata'

const ID = '/virtual-changelog'

export function ChangeLog(data: CommitInfo[]): Plugin {
  return {
    name: 'chodocs-changelog',
    resolveId(id) {
      return id === ID ? ID : null
    },
    load(id) {
      if (id !== ID)
        return null
      return `export default ${JSON.stringify(data)}`
    },
  }
}
