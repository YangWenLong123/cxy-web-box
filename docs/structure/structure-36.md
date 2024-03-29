## 目录

- [√ 定义全局变量](#global)
- [√ 配置路径别名 alias](#alias)
- [√ 配置代理 Proxy](#proxy)
- [√ 使用 TSX/JSX](#jsx)
- [√ SFC 支持 name 属性](#sfc)
- [√ ESlint 错误显示在浏览器中](#eslint)
- [√ 提供 externals](#externals)
- [√ 提供全局 less、scss 变量](#variables)
- [√ 按需加载 ElementPlus、Ant Design Vue](#unplugin)
- [√ 生成雪碧图](#sprite)
- [√ CDN 加载类库](#cdn)
- [√ 打包分析](#visualizer)
- [√ esbuild error](#esbuild)


## <span id="global">定义全局变量</span>

##### 使用 define 定义全局变量

&emsp;&emsp;通常情况下，在页面中会用到一些常量，而这些常量可能后期又会发生变更，那么这类常量就不能在代码中使用硬编码处理。

&emsp;&emsp;最基础的做法是在构建时生成全局常量，使用时引用全局常量。

> vite.config.ts

```js
export default defineConfig({
  define: {
    INITIAL_COUNT: 10,
  },
})
```

&emsp;&emsp;在代码中使用：

```vue
const count = ref(INITIAL_COUNT);
```

##### [使用 env 文件定义环境变量](https://cn.vitejs.dev/guide/env-and-mode.html)

&emsp;&emsp;Vite 使用[dotenv](https://github.com/motdotla/dotenv)可以加载自定义的环境变量。

&emsp;&emsp;以下开发的 dev、stage、prod 三种环境为例。将新建四种 env 文件

```sh
.env         # 存放不同环境共用的环境变量，定义的变量将被各环境共享
.env.dev     # 开发环境
.env.stage   # 测试环境
.env.prod    # 正式环境
```

> .env

```
VITE_TOKEN_NAME = 'token'
```

> .env.dev

```
NODE_ENV = development

VITE_BASE_URL = http://wwww.demo.com/api

VITE_BASE_PATH = /
```

> .env.stage

```sh
NODE_ENV = production

VITE_BASE_URL = http://wwww.stage.com/api

VITE_BASE_PATH = /stage
```

> .env.prod

```sh
NODE_ENV = production

VITE_BASE_URL = http://wwww.prod.com/api

VITE_BASE_PATH = /prod
```

&emsp;&emsp;vite 的--mode 选项，会读取指定的值匹配的环境变量，如运行 vite --mode dev 时，.env 和.env.dev 两个环境变量文件将被加载。

> package.json

```json
"scripts": {
  "dev": "vite --mode dev",
  "stage": "vue-tsc --noEmit && vite build --mode stage",
  "prod": "vue-tsc --noEmit && vite build --mode prod",
},
```

> vite.config.ts

```ts
import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ mode }: ConfigEnv): UserConfig => {
  let plugins = [vue()]

  return {
    plugins,
  }
}
```

&emsp;&emsp;在 vite.config.ts 中可以使用 process.env 上挂载的变量。项目中，Vite 会在一个特殊的 import.meta.env 对象上暴露环境变量。默认以"VITE\_"开头的变量，将被挂载在 import.meta.env 对象上。

&emsp;&emsp;在 src/env.d.ts 中添加以下信息,可实现环境变量代码自动提示：

```ts
interface ImportMetaEnv {
  VITE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```


## <span id="alias"> 配置路径别名 alias</span>

> vite.config.ts

```ts
import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import path from 'path'

const nodeResolve = (dir) => path.resolve(__dirname, '.', dir)

export default ({ mode }: ConfigEnv): UserConfig => {
  const resolve = {
    alias: {
      '@': nodeResolve('src'),
      '~': nodeResolve('public'),
    },
  }

  return {
    resolve,
  }
}
```

&emsp;&emsp;使用 typescript 开发，如果出现找不到模块“path”或其相应的类型声明。则需要安装@types/node

```sh
npx pnpm i -D @types/node
```

&emsp;&emsp;修改 tsconfig.json 配置：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "importHelpers": true,
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

&emsp;&emsp;这样就可以使用'@'来替代相对路径对组件进行引用：

```ts
<script lang="ts">import HelloWorld from '@/components/HelloWorld.vue'</script>
```

&emsp;&emsp;也可以使用以下方式配置 alias：

```ts
import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import path from 'path'

const nodeResolve = (dir) => path.resolve(__dirname, '.', dir)

export default ({ mode }: ConfigEnv): UserConfig => {
  return {
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: `${nodeResolve('src')}/`,
        },
        {
          find: /@comps\//,
          replacement: `${nodeResolve('src/components')}/`,
        },
      ],
    },
  }
}
```

## <span id="proxy"> 配置代理 Proxy</span>

&emsp;&emsp;Vitejs 的开发服务器选项[https://cn.vitejs.dev/config/#server-host](https://cn.vitejs.dev/config/#server-host)

```js
export default ({ mode }: ConfigEnv): UserConfig => {
  const server = {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://192.168.1.163:8081/',
        changeOrigin: true,
        rewrite: (url) => url.replace(/^\/api/, ''),
      },
    },
  }

  return {
    server,
  }
}
```

- target

&emsp;&emsp;实际的后端 api 地址。如请求/api/getUserInfo 会转发到http://192.168.1.163:8081/api/getUserInfo。

- changeOrigin

&emsp;&emsp;是否改写 origin。设为 true，则请求 header 中 origin 将会与 target 配置项的域名一致。

- rewrite

&emsp;&emsp;重写转发的请求链接。

## <span id="jsx">使用 TSX/JSX</span>

&emsp;&emsp;[@vitejs/plugin-vue-jsx](https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx)通过 HMR 提供 Vue 3 JSX 和 TSX 支持。

```sh
npx pnpm i @vitejs/plugin-vue-jsx
```

> vite.config.ts

```ts
import vueJsx from '@vitejs/plugin-vue-jsx'

export default ({ mode }: ConfigEnv): UserConfig => {
  let plugins = [vueJsx()]

  return {
    plugins,
  }
}
```

&emsp;&emsp;修改 tsconfig.json 配置，使.tsx 中支持 JSX

```json
{
  "compilerOptions": {
    "jsx": "preserve" // .tsx中支持JSX
  }
}
```


## <span id="sfc">SFC 支持 name 属性</span>

&emsp;&emsp;[vite-plugin-vue-setup-extend](https://github.com/anncwb/vite-plugin-vue-setup-extend)支持&lt;script setup&gt;新增 name 属性

```sh
npx pnpm i -D vite-plugin-vue-setup-extend
```

> vite.config.ts

```ts
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

export default ({ mode }: ConfigEnv): UserConfig => {
  let plugins = [vueSetupExtend()]

  return {
    plugins,
  }
}
```

## <span id="eslint">ESlint 错误显示在浏览器中</span>

&emsp;&emsp;[vite-plugin-eslint](https://github.com/gxmari007/vite-plugin-eslint)

```sh
npx pnpm i -D vite-plugin-eslint
```

> vite.config.ts

```ts
import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

export default ({ mode }: ConfigEnv): UserConfig => {
  const IS_PROD = ['prod', 'production'].includes(mode)

  let plugins = []

  if (!IS_PROD) {
    plugins = [
      ...plugins,
      eslintPlugin({
        cache: false,
        include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'],
      }),
    ]
  }

  return {
    plugins,
  }
}
```

## <span id="externals">提供 externals</span>

&emsp;&emsp;[vite-plugin-externals](https://github.com/crcong/vite-plugin-externals):为 Vite 提供 commonjs 外部支持

```sh
npx pnpm i -D vite-plugin-externals
```

> vite.config.ts

```ts
import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import { viteExternalsPlugin } from 'vite-plugin-externals'

export default ({ mode }: ConfigEnv): UserConfig => {
  const IS_PROD = ['prod', 'production'].includes(mode)

  let plugins = []

  if (IS_PROD) {
    plugins = [
      ...plugins,
      viteExternalsPlugin({
        vue: 'Vue',
        react: 'React',
        'react-dom': 'ReactDOM',
        // value support chain, tranform to window['React']['lazy']
        lazy: ['React', 'lazy'],
      }),
    ]
  }

  return {
    plugins,
  }
}
```

## <span id="variables"> 提供全局 less、scss 变量</span>

##### 提供全局 less 变量

- 直接提供变量

```ts
export default ({ mode }: ConfigEnv): UserConfig => {
  const css = {
    preprocessorOptions: {
      less: {
        additionalData: `@injectedColor: red;`,
        javascriptEnabled: true,
      },
    },
  }
  return {
    css,
  }
}
```

- 通过导入 less 文件提供变量

```ts
export default ({ mode }: ConfigEnv): UserConfig => {
  const css = {
    preprocessorOptions: {
      less: {
        additionalData: '@import "@/assets/less/variables.less";',
        javascriptEnabled: true,
      },
    },
  }

  return {
    css,
  }
}
```

##### 提供全局 scss 变量

- 直接提供变量

```ts
export default ({ mode }: ConfigEnv): UserConfig => {
  const css = {
    preprocessorOptions: {
      less: {
        additionalData: `$injectedColor: orange;`,
        javascriptEnabled: true,
      },
    },
  }
  return {
    css,
  }
}
```

- 通过导入 scss 文件提供变量

```ts
export default ({ mode }: ConfigEnv): UserConfig => {
  const css = {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/variables.scss";`,
        javascriptEnabled: true,
      },
    },
  }

  return {
    css,
  }
}
```

## <span id="unplugin">按需加载 ElementPlus、Ant Design Vue</span>

&emsp;&emsp;[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)

##### 按需引入 ElementPlus

&emsp;&emsp;[unplugin-element-plus](https://github.com/element-plus/unplugin-element-plus)为 Element Plus 按需引入样式。

```sh
npx pnpm i -D unplugin-vue-components unplugin-element-plus
```

> vite.config.ts

```ts
import { UserConfig, ConfigEnv, loadEnv } from 'vite'

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

export default ({ mode }: ConfigEnv): UserConfig => {
  let plugins = [
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({}),
  ]

  return {
    plugins,
  }
}
```

##### 按需引入 Ant Design Vue

```sh
npx pnpm i -D unplugin-vue-components
```

> vite.config.ts

```ts
import { UserConfig, ConfigEnv, loadEnv } from 'vite'

import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default ({ mode }: ConfigEnv): UserConfig => {
  let plugins = [
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ]
  return {
    plugins,
  }
}
```

## <span id="sprite">生成雪碧图</span>

&emsp;&emsp;[vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons)

```sh
npx pnpm i -D vite-plugin-svg-icons
```

> vite.config.ts

```ts
import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import viteSvgIcons from 'vite-plugin-svg-icons'

import path from 'path'

const nodeResolve = (dir) => path.resolve(__dirname, dir)

export default ({ mode }: ConfigEnv): UserConfig => {
  let plugins = [
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [nodeResolve('icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
      // 是否压缩
      svgoOptions: true,
    }),
  ]

  return {
    plugins,
  }
}
```

&emsp;&emsp;使用方式见[https://github.com/anncwb/vite-plugin-svg-icons/blob/main/README.zh_CN.md](https://github.com/anncwb/vite-plugin-svg-icons/blob/main/README.zh_CN.md)

## <span id="cdn">CDN 加载类库</span>

&emsp;&emsp;[vite-plugin-cdn-import](https://github.com/MMF-FE/vite-plugin-cdn-import)

```sh
npx pnpm i -D vite-plugin-cdn-import
```

> vite.config.ts

```ts
import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import importToCDN from 'vite-plugin-cdn-import'

export default ({ mode }: ConfigEnv): UserConfig => {
  const IS_PROD = ['prod', 'production'].includes(mode)

  let plugins = []

  if (IS_PROD) {
    plugins = [
      ...plugins,
      importToCDN({
        modules: [
          {
            name: 'cesium',
            var: 'Cesium',
            path: `https://cesium.com/downloads/cesiumjs/releases/1.88/Build/Cesium/Cesium.js`,
          },
          {
            name: 'widgets',
            path: `https://cesium.com/downloads/cesiumjs/releases/1.88/Build/Cesium/Widgets/widgets.css`,
          },
        ],
      }),
    ]
  }

  return {
    plugins,
  }
}
```

## <span id="visualizer">打包分析</span>

&emsp;&emsp;[rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)

```sh
npx pnpm i -D rollup-plugin-visualizer
```

> vite.config.ts

```ts
import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default ({ mode }: ConfigEnv): UserConfig => {
  const IS_PROD = ['prod', 'production'].includes(mode)

  let plugins = []

  if (IS_PROD) {
    plugins = [...plugins, visualizer()]
  }

  return {
    plugins,
  }
}
```

## <span id="esbuild">esbuild error</span>

```sh
Error: spawn D:\github\vite-config\node_modules\esbuild\esbuild.exe ENOENT
    at Process.ChildProcess._handle.onexit (node:internal/child_process:282:19)
    at onErrorNT (node:internal/child_process:480:16)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)
Emitted 'error' event on ChildProcess instance at:
    at Process.ChildProcess._handle.onexit (node:internal/child_process:288:12)
    at onErrorNT (node:internal/child_process:480:16)
    at processTicksAndRejections (node:internal/process/task_queues:83:21) {
```

```sh
node ./node_modules/esbuild/install.js
```

