import { ConfigEnv, defineConfig } from 'vite'

export default defineConfig((_: ConfigEnv) => ({
  assetsInclude: ['**/*.srt', '**/*.xml'],
  build: {
    assetsDir: 'assets',
    outDir: '../../docs',
    emptyOutDir: true
  }
}))
