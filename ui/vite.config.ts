import { defineConfig } from 'saus'
import reactCss from 'vite-react-css'
import tsconfigPaths from 'vite-tsconfig-paths'
import unocssPreset from 'unocss-preset-alloc'
import unocss from 'unocss/vite'

export default defineConfig(env => ({
  saus: {
    render: 'render.tsx',
    routes: 'state/routes.ts',
  },
  base: '',
  plugins: [
    tsconfigPaths({
      projects: ['./'],
    }),
    reactCss(),
    unocss({
      mode: env.mode == 'production' ? 'dist-chunk' : 'global',
      presets: [unocssPreset()],
    }),
  ],
}))
