import { UserConfig } from 'saus/core'
import { TestArgs } from './test'

export default (options?: Partial<TestArgs>) => (config: UserConfig) =>
  import('./test').then(module => module.default(options, config))
