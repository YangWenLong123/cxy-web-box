## 环境变量
对于环境变量，我们可以理解为在不同环境下，也就是在不同的域名下，去加载不同的变量。

常用的环境变量配置有以下几种

```js
  .env.development    //开发环境,一般运行npm run dev时加载
  .env.test           //测试环境,一般在npm run build:test时加载
  .env.staging        //模拟生成环境,一般在npm run build:staging时加载
  .env.production     //生成环境,一般在npm run build:production时加载
```

需要在package.json文件加载

```json
  "scripts": {
    "dev": "vue-cli-service serve --mode development",
    "test": "vue-cli-service serve --mode test",
    "build:dev": "vue-cli-service build --mode development",
    "build:test": "vue-cli-service build --mode test",
    "build:staging": "vue-cli-service build --mode staging",
    "build:production": "vue-cli-service build --mode production",
  },
```

## vue
我们一般通过.env文件配置环境变量,读取VUE_APP开头的前缀

```css
VUE_APP_ENV = development  #开发环境
VUE_APP_API_BASEURL = http://127.0.0.1:8000/api  #接口地址
VUE_APP_PORT = 3000  #端口
VUE_APP_PROXY = true #是否开启代理
```

## webpack环境变量
```js
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          VUE_APP_API_URL: JSON.stringify(process.env.VUE_APP_API_URL),
          VUE_APP_STATIC_PATH: JSON.stringify(process.env.VUE_APP_STATIC_PATH)
        }
      })
    ]
  }
}
```

## vite环境变量
Vite环境变量和模式
官方文档：https://cn.vitejs.dev/guide/env-and-mode.html

1、Vite 在一个特殊的 `import.meta.env` 对象上暴露环境变量。

2、Vite 使用 dotenv 从你的 环境目录 中的下列文件加载额外的环境变量：

```css
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

3、为了防止意外地将一些环境变量泄漏到客户端，只有以 VITE_ 为前缀的变量才会暴露给经过 vite 处理的代码。

环境变量配置实践
通过以上几个知识点的了解，我们就可以在项目的根目录分别创建一个.env.production和.env.development文件，分别用来存放打包时环境变量配置和开发时环境变量配置！

开发时环境变量为以下几个

```
VITE_ENV = development  #开发环境
VITE_APP_TITLE = Vue3Blog(DEV)  #接口地址
VITE_APP_API_BASEURL = http://127.0.0.1:8000/api  #本地端口
VITE_APP_PORT = 3000  #端口
VITE_APP_PROXY = true #是否开启代理
```