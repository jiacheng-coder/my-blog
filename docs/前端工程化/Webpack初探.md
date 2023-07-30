---
tag:
 - 前端工程化
---

# Webpack 初探

## 核心概念

### Entry：入口

**Entry** 指示 webpack 应该使用哪个模块，来作为构建其内部 [依赖图(dependency graph)](https://webpack.docschina.org/concepts/dependency-graph/) 的开始

`/** @type {import('webpack').Configuration} */

module.exports = { mode: 'development', entry: { main: { // 配置 chunk 名 filename: 'target_index.js', // 输出filename名 import: './src/index.js', // 指定入口文件 runtime: 'runTimeOne', // 配置当前chunk的运行时环境，默认情况下不同chunk的缓存是隔离开的 }, test: { filename: 'target_b.js', import: './src/b.js', // runtime: 'runTimeOne', // 和 main chunk 共享一个运行时环境 dependOn: 'main', // 指定要共享的运行时环境所在的chunk名，如果没有会报错 } }, output: { clean: true // 每次构建前清空输出文件夹下的内容 }, }`

### Output：出口

**output** 属性告诉 webpack 在哪里输出它所创建的 *bundle*，以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中。

为啥要有hash?？【出于复用缓存的考虑】

浏览器有一个缓存机制-—-＞如果浏览器刷新时请求的当前js的文件名没有产生变化，则浏览器不会请求该资源而是直接使用缓存

有一个插件 plugins 是用来帮我们组装 index.html 页面的，配置hash是为了让我们的文件变化能够实时的被浏览器感知到

`/** @type {import('webpack').Configuration} */

module.exports = { entry: { index: './src/index.js', search: './src/search.js', }, output: { filename: '[name].[contenthash:6].js', // [name]模板字符串 path: __dirname + '/dist', clean: true }, };`

### Loader：代码转换

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。**loader** 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 [模块](https://webpack.docschina.org/concepts/modules)，以供应用程序使用，以及被添加到依赖图中。

使用 loader 可以把 css 之类的

loader 帮 webpack 做了一部分的代码转换工作

之前我们在用脚手架vue-cli, create-react-app的时候不需要关注这些东西是因为这些脚手架在底层帮我们都将webpack配置好了

#### css-loader 模块化

webpack.config.js

`/** @type {import('webpack').Configuration} */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = { mode: "development", entry: { index: "./src/index.js", search: "./src/search.js", }, output: { filename: "[name].[contenthash:6].js", // [name]模板字符串 path: **dirname + "/dist", clean: true, }, plugins: [ // 添加插件实例 new MiniCssExtractPlugin({ filename: '[name].[contenthash].css', }), ], module: { rules: [ { test: /\.css$/i, use: [ MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { modules: { localIdentName: '[path][name]**[local]--[hash:base64:5]', }, }, }, ], }, ], }, };`

App.js

`import appStyle from './App.css'

function App() { const element = document.createElement('div') element.innerHTML = 'This is App' element.className = appStyle.wrapper return element } document.body.appendChild(App())`

Header.js

```
import headerStyle from './Header.css' function Header() {   const element = document.createElement('div')   element.innerHTML = 'This is Header'   element.className = headerStyle.wrapper   return element } document.body.appendChild(Header())
```

### Plugin：插件机制

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

#### 和 loader 的比较

webpack 的 loader 和 plugin 都是用于扩展 webpack 功能的工具，但它们在使用方式和处理过程中有一些区别。

**Loader（加载器）【模块转换阶段】**

1. loader 主要用于**对模块源代码进行转换**。它们在构建过程中将文件从输入（例如 .css、.scss、.jsx 等）转换为输出（通常是 JavaScript 模块）。
2. loader 是在 module.rules 配置中定义的，并且可以链式调用。链中的每个 loader 都会对资源进行转换，然后将结果传递给下一个 loader。
3. loader 可以同步或异步执行，但通常是同步的。

**Plugin（插件）【不仅仅是模块转换阶段】**

1. plugin 是用于执行**更广泛**的任务，如**优化、代码分割、资源管理**等。它们可以在整个**构建过程中的不同阶段**执行操作，而**不仅仅是在模块转换阶段**。
2. plugin 是在 plugins 配置中定义的，通过实例化插件并将其添加到 plugins 数组中来使用。
3. plugin 通过订阅 webpack 的事件钩子（hooks）来工作，这使得它们可以在构建过程的特定时刻执行操作。

**区别和联系**

1. 区别：loader 主要用于转换模块源代码，而 plugin 用于执行更广泛的任务。loader 在 module.rules 中定义，plugin 在 plugins 中定义。
2. 联系：loader 和 plugin 都是用于扩展 webpack 功能的工具，它们可以相互配合使用。例如，css-loader 和 style-loader 可以将 CSS 转换为 JavaScript 模块，然后 MiniCssExtractPlugin 插件可以将这些模块提取到单独的 CSS 文件中。

总之，loader 和 plugin 是 webpack 的两种扩展方式，它们在不同的场景和处理过程中发挥作用，但都是为了实现更丰富的构建功能。

## 深入devDepend && dependencies

### IIFE【立即执行函数】

只要加上运算符就能够进行隐式转换，将函数转换成函数表达式，成为立即执行函数

当一个函数变成函数表达式以后 丢掉自己原来的名字

```
+function () { 	console.log('12') }()
```

### 正文

只要不发包，这二者就随便放，大多数情况下确实如此。【合法但不合理】

我们还需要考虑SSR 服务端渲染【服务端渲染必须要时刻关注package. json即使你不发包】

很多人他会觉得如果将dependencies里的东西移到devDependencies里去会造成性能问题 除非是ssr才会造成这种情况

你在生产会用的依赖 比如react Lodash 你全部放到dependencies里去

在生产不会用到的依赖，比如ts webpack

构建生产代码 全部放到devDependencies里去

这是国内约定俗成的用法

这样的话你在ssr里也不会出错即使你会多安装一些依赖在ssr中【ssr里是会用到package.json在服务端装依赖的】，但是也比出错要好

在常规客户端渲染的情况下，二者无差异

package.json不会参与到webpack的构建工作中
