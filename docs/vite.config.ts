import { resolve } from 'path'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { getDocsContributors } from '../scripts/contributors'
import { getChangeLog } from '../scripts/changelog'
import { MarkdownTransform } from './.vitepress/plugins/markdownTransform'
import { ChangeLog } from './.vitepress/plugins/changelog'
import { Contributors } from './.vitepress/plugins/contributors'

export default defineConfig(async () => {
  const [changeLog, contributions] = await Promise.all([
    getChangeLog(process.env.CI ? 1000 : 100),
    getDocsContributors(),
  ])

  return {
    server: {
      hmr: {
        overlay: false,
      },
      fs: {
        allow: [
          resolve(__dirname, '..'),
        ],
      },
    },
    plugins: [
      // custom
      Contributors(contributions),
      MarkdownTransform(),
      ChangeLog(changeLog),
      // plugins
      Components({
        dirs: resolve(__dirname, '.vitepress/theme/components'),
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          IconsResolver({
            componentPrefix: '',
          }),
        ],
        dts: './.vitepress/components.d.ts',
        transformer: 'vue3',
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        defaultStyle: 'display: inline-block',
      }),
      UnoCSS(),
    ],
  }
})
