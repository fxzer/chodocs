import type { Plugin } from 'vite'
import type { ContributorInfo } from '../metadata'

const ID = '/virtual-contributors'

export function Contributors(data: Record<string, ContributorInfo[]>): Plugin {
  return {
    name: 'chodocs-contributors',
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
