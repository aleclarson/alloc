import getServerAddress from 'get-server-address'
import {
  connect,
  createModuleCache,
  Plugin,
  serveClientModules,
  servePages,
  vite,
} from 'saus/core'
import { ClientConfig, clientConfigId } from '../clientConfig'
import type { TestArgs } from '../test'

export function serveTestUI(args: TestArgs): Plugin {
  return {
    name: 'test:ui',
    enforce: 'pre',
    configureServer(server) {
      console.time('load ui')
      const { default: renderPage, ssrDefine } =
        require('./ui') as typeof import('saus/bundle')
      console.timeEnd('load ui')

      ssrDefine(clientConfigId, exports => {
        exports.default = getClientConfig(args, server)
      })

      const moduleCache = createModuleCache(args.base)
      const serveClientModule = serveClientModules(moduleCache)
      const handleRequest = connect()
        .use(serveClientModule)
        .use(servePages(renderPage, moduleCache))

      server.middlewares.use((req, res, next) => {
        const originalUrl = req.url!
        if (!originalUrl.startsWith(args.base)) {
          // return serveClientModule(req as any, res, next)
          return next()
        }
        req.url = originalUrl.slice(args.base.length - 1)
        handleRequest(req, res, () => {
          req.url = originalUrl
          next()
        })
      })
    },
  }
}

export function getClientConfig(
  args: TestArgs,
  server: vite.ViteDevServer
): ClientConfig {
  const serverConfig = server.config.server
  const hmrConfig = typeof serverConfig.hmr == 'object' ? serverConfig.hmr : {}

  return {
    basePath: args.base,
    serverHost: getServerAddress(server.httpServer!),
    hmrPort: hmrConfig.port || 24678,
  }
}
