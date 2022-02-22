import { render } from '@saus/react'
import { App } from './App'
import config from './state/config'

render(({ default: Page }) => {
  const props = config.get()
  return (
    <App {...props}>
      <Page {...props} />
    </App>
  )
}).head(() => {
  const { basePath } = config.get()
  return (
    <head>
      {!import.meta.env.DEV && <base href={basePath} />}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/modern-normalize@1.1.0/modern-normalize.min.css"
      />
    </head>
  )
})
