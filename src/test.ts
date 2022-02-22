import { defineTestFramework, UserConfig } from 'saus/core'
import { serveTestUI } from './plugins/ui.prod'
import { serveDevUI } from './plugins/ui.dev'

export interface TestArgs {
  /**
   * The UI is served under this URL prefix.
   * @default "/.test/"
   */
  base: string
  /**
   * Build the `@saus/test` UI on-demand from source files.
   * @default false
   */
  dev?: boolean
}

export default (options: Partial<TestArgs> = {}, config: UserConfig) => {
  const args: TestArgs = { base: '/.test/', ...options }

  const base = args.base.replace(/^\/(.+?)\/$/, '/$1/')
  args.base = (config.base ?? '/').replace(/\/?$/, base)

  return defineTestFramework({
    plugins: [(args.dev ? serveDevUI : serveTestUI)(args)],
  })
}
