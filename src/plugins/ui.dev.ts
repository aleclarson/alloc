import { createServer, vite } from 'saus'
import { dataToEsm } from 'saus/core'
import path from 'path'
import type { TestArgs } from '../test'
import { clientConfigId } from '../clientConfig'
import { getClientConfig } from './ui.prod'

export function serveDevUI(args: TestArgs): vite.Plugin {
  return {
    name: 'test:dev-ui',
    enforce: 'pre',
    async configureServer(server) {
      const uiServer = await createServer({
        root: path.resolve(__dirname, '../ui'),
        mode: 'development',
        base: args.base,
        server: {
          middlewareMode: true,
        },
        plugins: [defineClientConfig(args, server)],
      })

      // Wait for any errors to be resolved.
      await new Promise<void>(resolve => {
        uiServer.events.on('listening', resolve)
      })

      server.middlewares.use(uiServer)
    },
  }
}

function defineClientConfig(
  args: TestArgs,
  server: vite.ViteDevServer
): vite.Plugin {
  return {
    name: 'test:client-config',
    enforce: 'pre',
    resolveId(id) {
      if (id === clientConfigId) {
        return id
      }
    },
    load(id) {
      if (id === clientConfigId) {
        return dataToEsm(getClientConfig(args, server))
      }
    },
  }
}
