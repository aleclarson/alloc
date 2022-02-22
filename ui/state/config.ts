import { defineStateModule, unwrapDefault } from 'saus/client'
import { ClientConfig, clientConfigId } from '../../src/clientConfig'

export default defineStateModule(clientConfigId, async () => {
  return unwrapDefault<ClientConfig>(
    await import(/* @vite-ignore */ clientConfigId)
  )
})
