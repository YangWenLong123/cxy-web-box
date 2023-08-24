## 介绍

Vue.js（读音 /vjuː/, 类似于 view）是一套构建用户界面的JavaScript框架。Vue.js的目标是通过尽可能简单的API实现响应的数据绑定和组合的视图组件。Vue.js自底向上逐层应用，使得开发者可以作为库去实现一些功能，也可以作为框架构建大型应用。

Vue3是Vue.js的最新版本，它带来了许多新特性和优化，包括更好的性能、更小的包大小、更好的TypeScript支持、新的组合式API等。

Vue3是Vue.js的最新版本，它带来了许多新特性和优化，包括更好的性能、更小的包大小、更好的TypeScript支持、新的组合式API等。

## 项目创建

已安装 16.0 或更高版本的 [Node.js](https://nodejs.org/en)

```bash
npm create vue@latest
```

这一指令将会安装并执行 [create-vue](https://github.com/vuejs/create-vue)，它是 Vue 官方的项目脚手架工具。你将会看到一些诸如 TypeScript 和测试支持之类的可选功能提示：

```bash
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```

如果不确定是否要开启某个功能，你可以直接按下回车键选择 No。在项目被创建后，通过以下步骤安装依赖并启动开发服务器：

```bash
cd your-project-name
npm install
npm run dev
```

现在应该已经运行起来了你的第一个 Vue 项目！请注意，生成的项目中的示例组件使用的是[组合式 API](https://cn.vuejs.org/guide/introduction.html#api-styles) 和 script setup，而[非选项式 API](https://cn.vuejs.org/guide/introduction.html#api-styles)。下面是一些补充提示：

推荐的 IDE 配置是 [Visual Studio Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 扩展。如果使用其他编辑器，参考 [IDE 支持章节](https://cn.vuejs.org/guide/scaling-up/tooling.html#ide-support)。


当你准备将应用发布到生产环境时，请运行：

```bash
npm run build
```