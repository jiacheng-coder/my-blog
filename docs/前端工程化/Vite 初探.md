---
tag:
 - 前端工程化
---

1. vite 的前世今生
2. vite的编译结果及其分析
3. vite的配置文件
4. vite中处理CSS，静态资源，TS
5. vite的插件以及常用用插件的使用
6. vite构建原理

# 前置

## 什么是构建工具

早期的开发者们，使用 HTML，CSS，JS 来进行网页的开发，当网站体量大了之后，这种传统的方式却带来了难以维护，样式不统一等等问题，由此产生了像 React，Vue 这样的 Framework，协助开发者开发。

在 CSS 的基础上，衍生出了 Less，Sass，PostCss 这样的处理器，POSTCSS 由于其衍生原因，在现在的工程化项目中往往被作为后处理器使用，用于将兼容新旧 CSS的特性，实际上 PostCss 是可以替代 Less，Sass 这种前处理器，成为 CSS 的最终解决方案的，不过由于他内部需要不断开发插件，兼容 Less，Sass 的新版本迭代，后期社区就放弃了这种一体化解决方案，着重处理新旧 CSS 的特性了。

最终的处理逻辑可以理解为如下的链路：

Less/Sass文件 -> Less/Sass 处理器 -> 具有新特性的 CSS文件 -> PostCss 处理器 -> 兼容老特性的 CSS

在 JS 的基础上，衍生出了 TS 这种具有类型系统的编程语言，可以简单理解为 JS 的超集（数学概念）。同时，JS 这门语言自身的特性也在不断发展，也需要做新特性的兼容，由此一个新项目还需要考虑 JS 的处理逻辑，最终处理链路如下：

TS 文件 -> 具有新特性的 JS 文件 -> 兼容老特性的 JS

除了 CSS 和 JS 这两种文件的转换处理，在实际项目的开发中，还需要考虑诸如：打包优化，分包策略，静态资源处理等等许多问题，这些问题如果由我们人为的去配置，会大大减缓我们的开发效率。

因此，就诞生了诸如 ESBuild，Webpack，Rollup，Vite 这样的打包构建工具，专门为我们负责项目的打包构建流程，对于新手小白，可以不考虑其中的特性，直接使用即可。对于有一定基础的开发者，这些打包工具也各自都提供了自定义的配置项，我们可以使用这些配置项对项目进行更加专门化的打包构建。

## Vite 解决的痛点

作为老版本的构建工具，Webpack 的特点是大而全，缺点是配置起来十分麻烦。

针对此，Vite 团队集成了大多数的常见配置，例如原生支持 CSS 和 TS 的编译，真正做到 out of box 开箱即用！这也是 Vue 团队一贯的作风——减少开发者的心智负担。对于这种作风的优劣，大家就见仁见智，这里就不过多评价了。

## Vite 的构成

Vite 在开发阶段使用 ESbuild，生产阶段使用 Rollup；

## NodeJS 学习

了解 fs 和  path 这两个 Node 库，是用来处理文件的

获取路径:

- path.resolve(__dirname, '')
- process.cwd()：获取当前的node执行目录

# 依赖预构建

## 起因

开发阶段 `Vite` 会对项目中使用的第三方依赖如 `react`、`react-dom`、`lodash-es` 等做`预构建`操作。

之所以要做`预构建`，是因为 `Vite` 是基于浏览器原生的 `ESM` 规范来实现 `dev server` 的，这就要求整个项目中涉及的所有源代码必须符合 `ESM` 规范。

而在实际开发过程中，业务代码我们可以严格按照 `ESM` 规范来编写，但第三方依赖就无法保证了，比如 `react`。这就需要我们通过 `Vite` 的`预构建`功能将非 `ESM` 规范的代码转换为符合 `ESM` 规范的代码。

另外，尽管有些第三方依赖已经符合 `ESM` 规范，但它是由多个子文件组成的，如 `lodash-es`。如果不做处理就直接使用，那么就会引发请求瀑布流，这对页面性能来说，简直就是一场灾难。同样的，我们可以通过 `Vite` 的`预构建`功能，将第三方依赖内部的多个文件合并为一个，减少 `http` 请求数量，优化页面加载性能。

综上，`预构建`，主要做了两件事情：

- 将非 `ESM` 规范的代码转换为符合 `ESM` 规范的代码；
- 将第三方依赖内部的多个文件合并为一个，减少 `http` 请求数量；

## 做法

1. 自动依赖搜寻
   - 如果没有找到现有的缓存，Vite 会扫描您的源代码，并自动寻找引入的依赖项（即 "bare import"，表示期望从 node_modules 中解析），并将这些依赖项作为预构建的入口点。预打包使用 esbuild 执行，因此通常速度非常快。
   - 在服务器已经启动后，如果遇到尚未在缓存中的新依赖项导入，则 Vite 将重新运行依赖项构建过程，并在需要时重新加载页面。

2. Monorepo 和 链接依赖
3. 自定义行为
   - optimizeDeps.include
   - optimizeDeps.exclude
4. 缓存
   - 文件系统缓存
   - 浏览器缓存

## 二次预构建

同样的，`Vite` 在`预构建`的时候也是基于类似的机制去找到项目中所有的第三方依赖的。和 `Webpack` 不同， `Vite` 另辟蹊径，借助了 `Esbuild` 比 `Webpack` 更快的打包能力，对整个项目做一个全量打包。打包的时候，通过分析`依赖关系`，得到项目中所有的源文件的 `url`，然后分离出第三方依赖。

这样，`Vite` 就可以对找到的第三方依赖做转化、合并操作了。

`预构建`功能非常棒，但在实际的项目中，并不能保证所有的第三方依赖都可以被找到。如果出现下面的这两种情况， `Esbuild` 也无能为力:

- `plugin` 在运行过程中，动态给源码注入了新的第三方依赖；
- `动态依赖`在代码运行时，才可以确定最终的 `url`；

## Vite3 的优化

`Vite3.0` 版本对第三方依赖的请求和业务代码的请求有不同的处理逻辑。当浏览器请求业务代码时，`dev server` 只要完成源代码转换并收集到依赖模块的 `url`，就会给浏览器发送 `response`。而第三方依赖请求则不同，`dev server` 会等首屏期间涉及的所有模块的依赖关系**全部**解析完毕以后，才会给浏览器发送 `response`。这就导致了，如果发现有未`预构建`的第三方依赖，第三方依赖的请求会一直被**阻塞**，直到`二次预构建`完成为止。

> 总结：
>
> `Vite3.0` 对`二次预构建`的优化，其实是以`消耗首屏性能`来优化 `reload 交互体验`。

遗憾的是，`Vite 3.0` 并没有解决`懒加载二次预构建`导致的 `reload` 的问题。这个问题，目前只能通过社区提供的 `vite-plugin-optimize-persist`、`vite-plugin-package-config` 来解决了。

可以理解为`vite-plugin-package-config` 和` vite-plugin-optimize-persist`其实是相当于在vite.config.js配置中配置了`includes`选项。

`dev server` 启动以后，内部有一个缓存来存取预构建的第三方依赖。而vite-plugin-optimize-persist 会监听这个缓存。当有新的第三方依赖需要预构建，并且修改缓存以后，vite-plugin-optimize-persist 会跟新 package.json 的 vite 字段。vite-plugin-package-config 负责在 dev server 启动时，初始化 vite.config，会把 package.json 中的 vite 配置项合并到 vite.config 中

# 对不同资源的处理

## CSS

```js
// vite.config.js

export default {
  // ...
  css: {
    preprocessorOptions: {
      // 配置SCSS
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      },
      // 配置LESS
      less: {
        javascriptEnabled: true
      }
    },
    // 是否将 CSS 提取至独立的文件中
    extract: true,
    // 是否为 CSS 开启 source map
    sourceMap: false,
    // 是否开启 CSS modules
    modules: false,
    // CSS 预处理器的选项
    loaderOptions: {
      // 所有的 CSS 都去掉空格
      css: {
        // 样式压缩
        minify: true,
        // CSS 插入到HTML中的位置
        insert: 'head'
      }
    }
  }
}
```

- localConvention： 修改生成的配置对象的key的展示形式(驼峰还是中划线形式）
- scopeBehaviour：配置当前的模块化行为是模块化还是全局化（有hash就是开启了模块化的一个标志，因为他可以保证产生不同的hash值来控制我们的样式类名不被覆盖）
- generateScopedName：生成的类名的规则（可以配置为函数，也可以配置成字符串规则)
- hashPrefix：生成hash会根据你的类名去进行生成，如果你想要你生成hash更加的独特一点，你可以配置hashPrefix

### preprocessoroptions篇

主要是用来配置css预处理的一些全局参数

### postcss配置
直接在css.postcss中进行配置，该属性直接配置的就是postcss的配置
postcss-preset-env：支持css变量和一些未来css语法 自动补全(autoprefixer)

## 静态资源

静态资源的定义：并不是只有图片，视频资源

出了动态API之外，99%的都是静态资源

Vite对静态资源的支持是 out of box 的

### resolve alias 原理
模拟vite.config.js里alias配置的原理

```js
type AliasConfig = {
  [key: string]: string;
};

/**
 * 模拟 Vite 配置文件中 alias 配置的原理
 * @param aliasConfig alias 配置对象
 * @param jsContent JavaScript 文件内容
 * @returns 转换后的 JavaScript 文件内容
 */
function simulateViteAlias(aliasConfig: AliasConfig, jsContent: string): string {
  // 遍历 aliasConfig 对象，替换 jsContent 中的对应别名
  Object.entries(aliasConfig).forEach(([alias, aliasValue]) => {
    // 使用正则表达式匹配并替换别名
    const aliasRegex = new RegExp(`import\\s+.*\\s+from\\s+['"]${alias}(/.*)?['"]`, 'g');
    jsContent = jsContent.replace(aliasRegex, (match, importPath) => {
      // 使用 path 模块处理路径
      const newPath = importPath ? path.join(aliasValue, importPath) : aliasValue;
      return match.replace(alias, newPath);
    });
  });

  return jsContent;
}
```

这个实现中，我们使用了 Object.entries 来遍历 aliasConfig 对象，并使用 path 模块处理路径。

### Vite在生产环境中，对静态资源的处理

当我们将工程进行打包以后，会发现找不到原来的资源，配置baseUrl可以解决这个问题

打包后的静态资源为什么要有hash？

-> 浏览器有一个缓存机制，静态资源名字只要不改，那么他就会直接用緩存的而不会重新请求

## Typescript

> 插件：vite-plugin-checker

1. 安装插件进行类型检查
2. 在 scripts 脚本中设置`tsc --noEmit && vite build`防止类型检查错误后仍然打包的情况
3. 配置tsconfig.js和.env和vite-env.d.ts文件

# 插件✨

>  Vite 会在**生命周期的不同阶段**，调用**不同的插件**，以达到**不同的目的**

## 插件概览

Vite 插件是基于 Rollup 插件 系统设计的，它们可以扩展 Vite 的功能，例如处理不同类型的文件、优化构建等。Vite 插件分为以下几个方面：

解析: Vite 插件可以自定义模块解析逻辑，例如处理别名或自定义文件扩展名。

```js
// vite.config.js
import path from 'path';

export default {
  plugins: [
    {
      name: 'resolve-alias',
      resolveId(source) {
        if (source === '@alias') {
          return path.resolve(__dirname, 'src/alias');
        }
        return null;
      },
    },
  ],
};
```

加载: Vite 插件可以自定义加载文件内容，例如处理图片、样式等。

```js
// vite.config.js
import fs from 'fs';

export default {
  plugins: [
    {
      name: 'load-image',
      load(id) {
        if (id.endsWith('.jpg')) {
          return `export default ${JSON.stringify(fs.readFileSync(id, 'base64'))}`;
        }
        return null;
      },
    },
  ],
};
```

转换: Vite 插件可以自定义转换文件内容，例如编译 TypeScript、处理 CSS 预处理器等。

```js
// vite.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  plugins: [
    typescript(),
  ],
};
优化: Vite 插件可以在构建阶段优化代码，例如压缩、拆分等。

// vite.config.js
import { terser } from 'rollup-plugin-terser';

export default {
  plugins: [
    terser(),
  ],
};

```

其他钩子: Vite 插件还提供了其他钩子，例如 buildStart、buildEnd、watchChange 等，用于在特定时机执行自定义操作。

```js
// vite.config.js
export default {
  plugins: [
    {
      name: 'custom-hooks',
      buildStart() {
        console.log('Build started');
      },
      buildEnd() {
        console.log('Build ended');
      },
      watchChange(id) {
        console.log(`File changed: ${id}`);
      },
    },
  ],
};
```

## Vite-alias

```js
// 函数：提供更多配置选择
const path = require('path');
const fs = require('fs')

const diffDirAndFile = (dirFileArr = [], basePath = '') => {
  const result = {
    dirs: [],
    files: []
  }
  dirFileArr.forEach(name => {
    const currentFileStat = fs.statSync(path.resolve(__dirname, basePath + '/' + name));
    // console.log("current file stat: ", name, currentFileStat.isDirectory());
    currentFileStat.isDirectory() ? result.dirs.push(name) : result.files.push(name)
  })
  return result
}

const getTotalSrcDir = (prefix) => {
  const result = fs.readdirSync(path.resolve(__dirname,'../src'))
  const diffResult = diffDirAndFile(result, '../src')
  const resolveAliasesConfig = {}
  diffResult.dirs.forEach(name => {
    resolveAliasesConfig[`${prefix}/${name}`] = path.resolve(__dirname,'../src' + '/' + name)
  })
  return resolveAliasesConfig
}

const ViteAliases = ({
  prefix = '@'
} = {}) => {
  return {
    config(config, env) {
      const resolveAliasesConfig = getTotalSrcDir(prefix)
      return {
        resolve: {
          alias: resolveAliasesConfig 
        }
      }
    }
  }
}

module.exports = {
  ViteAliases
}
```



## vite-plugin-html

webpack
webpack-html-plugin / clean-webpack-plugin (clean： true)
其实就是因为vite他内置了非常多的插件，然后我们作为普通的开发者不需要承担这么高的心智负担
vue react
 css-loader less-loader ts-loader
vite将很多核心插件全部内置了

## vite常用插件之vite-plugin-mock

mock数据：模拟数据
前后端一般是并行开发 用户列表
接口文档）
mock数据 去做你前端的工作

1. 简单方式：直接去写死一两个数据 方便调试
缺陷：
- 没法做海量数据测试
- 没法获得一些标准数据
- 没法去感知http的异常
- axios异常
2. mockis: 模拟海量数据的， vite-plugin-mock的依赖项就是mockis

## vite和esbuild、rollup的关系

Vite 是一个基于浏览器原生 ES 模块的开发服务器和构建工具。在 Vite 中，Rollup 和 esbuild 分别扮演了不同的角色。

在 Vite 中，Rollup 和 esbuild 分别扮演了不同的角色。

Rollup 的主要作用：

将多个模块文件打包成一个或多个输出文件，以便在生产环境中使用。
优化代码，例如：删除无用代码（Tree Shaking）、压缩代码等。
支持多种模块格式，如：CommonJS、AMD、ESM 等。
提供插件系统，可以通过插件扩展 Rollup 的功能。
在 Vite 中，Rollup 主要用于生产环境构建。Vite 使用 Rollup 进行最终的打包和优化，以生成高性能的生产代码。

```
// Rollup 配置示例
import { defineConfig } from 'vite'
import { terser } from 'rollup-plugin-terser'

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [terser()]
    }
  }
})
```
esbuild 的主要作用：

快速地将源代码转换为浏览器可执行的代码。
支持多种模块格式，如：CommonJS、ESM 等。
支持压缩代码，如：移除空格、注释等。
在 Vite 中，esbuild 主要用于开发环境。Vite 利用 esbuild 快速进行代码转换，提高开发环境的编译速度。同时，Vite 也可以使用 esbuild 进行生产环境的代码压缩。


```
// 使用 esbuild 进行代码压缩的示例
import { defineConfig } from 'vite'
import esbuild from 'rollup-plugin-esbuild'

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [esbuild({ minify: true })]
    }
  }
})
```

# Vite 执行流程

```js
const viteConfig = require('./vite.config.js')
viteConfig.plugins.forEach(plugin => plugin.config && plugin.config(viteConfig))
const mergeOptions = Object.assign({}, defaultConfig, viteConfig, terminalConfig)
viteConfig.plugins.forEach(plugin => plugin.config && plugin.configResolved(mergeOptions))
```

# 性能优化✨

1. 开发时的构建优化

   - webpack 下了很多功夫：cache-loader，如果两次构建的源代码没有变化，则直接使用缓存，不调用 loader；thread-loader，开启多线程构建
   - vite 是按需加载，不需要太关注这方面

2. 页面性能指标

   - 首屏渲染时长：fcp（first content paint）-> 页面中第一个元素的渲染时长
     - 懒加载：写代码实现
     - http优化：协商缓存和强缓存
       - 强缓存：服务端给响应头追加字段（expires），在截止时间之前，客户端不会向服务端发送 HTTP 请求
       - 协商缓存：客户端请求资源前，向服务端发送一个协商请求，根据协商请求的返回结果（304 状态码）决定要不要发送请求资源的 HTTP 请求
   - 页面中最大元素的一个渲染时长：lsp（largest content paint）

3. JS 逻辑

   - 副作用的清除，useEffect返回清除副作用的函数

     ```js
     useEffect(()=>{
     	const timer = null
     	timer = setTimeout(()=>{
     		// do something
     	})
     	return () => clearTimeout(timer)
     },[])
     ```

   - requestAnimationFrame, requestIdleCallback（卡浏览器帧率，理解浏览器渲染原理）

     - 浏览器的帧率：16.6ms去更新一次（执行 JS 逻辑，重排重绘）
     - `requestIdleCallback`
     - concurrent mode -> concurrency 可终端渲染

   - 多用lodash

     - 防抖节流：使用lodash提供的
     - 不要使用数组原生的Array.forEach：使用lodash提供的

   - 对作用域的控制

     ```js
     const arr = [1,2,3]
     for (let i=0, len=arr.length; i<len; i++) {}
     ```

   - 设计模式

4. CSS

   - 关注继承属性：能继承的不要重复写
   - 避免过深的嵌套

5. 生产（打包）时的构建优化【构建工具相关】

   - 优化体积：压缩，树摇，图片资源压缩，CDN 加载，分包

## 分包策略

浏览器的缓存策略

静态资源名字没有变化，浏览器就不会重新请求

打包后的文件名都带有哈希值，就是因为文件内容只要有一点变化，打包后的哈希值就完全不同。

实际项目中，如果不做分包，所有的文件都回被输出到index.[hash].js中，当我们引入第三方库的时候，也会打包进index.[hash].js中，每次业务代码改变后，都要重新把第三方库的代码打包进index文件，这是不必要的。

我们希望分成两个包：

- 业务代码
- 第三方库代码【引入的，不会改变】

这样每次就只有业务代码所在的包（也就是js文件）会被重新打包，而第三方库代码不会被重新打包

> 分包就是把一些不会更新的文件，进行单独的打包处理

 vite.config.js

```js
export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) return 'lodash'
        },
      },
    },
  },
})
```

## gzip压缩

有时候我们的文件资源过大，在 HTTP 传输中十分损耗性能

将所有的静态文件进行压缩，已达到减小体积的目的

服务端-》压缩文件

客户端收到压缩包-》浏览器解压缩

chunk-》块

从入口文件到执行一系列依赖最终打包成的js文件叫做块

块最终会映射为 js 文件，但是块不是 js 文件



压缩后的文件给后端或者运维

当客户端请求index.js文件时，服务端如果发现所请求的文件对应服务器上的`.gz`后缀的文件，那么服务端就在响应时设置响应头为`content-encoding: gzip`，到达客户端后，客户端根据响应头解压缩文件即可获取index.js文件

## 动态导入

webpack一次性将所有文件全部打包完毕后，才开启开发服务器，

Vite 是直接导出index.html，如果index.html中有需要请求的文件，再去请求资源，也就是说 vite 是按需加载的

动态导入和按需加载差不多，是es6的一个新特性

例如：动态导入在路由系统中的应用

>  Vue路由

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...
    {
      path: '/home',
      name: 'Home',
      component: () => import('../pages/Home/index.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/Login/index.vue'),
    },
  ],
})

export default router
```

这么做的好处时，当请求页面的路由不是 Home 时，这个 Home 组件内部的代码不会被浏览器加载，import 函数处于 Promise 的 pending 状态

一旦请求到了 Home 路由，就请求相关资源，代码不会执行

在 webpack 的层面，代码**会被编译**，但**不会被加载**

最终在打包后就会出现分包的情况

## CDN 加速

> Content Delivery Network

我们的所有依赖和资源打包后会放到服务器上

CDN 全称为内容分发网络，是一种利用互联网技术分布式存储、网络负载均衡和内容分发技术的网络架构。通过在网络各处分布部署节点服务器，**将用户请求的内容分发到距离用户更近、访问速度更快的节点上**，从而提高用户访问网站的**速度和质量，减轻源站压力**，提高网站的可用性和稳定性。CDN 是现代网站架构中重要的一环，广泛应用于各种领域，如电子商务、在线视频、游戏等。

将我们依赖的第三方模块全部写成 CDN 的形式，保证我们自己代码的小体积，减轻客户端的传输压力

CDN -> 内容分发 DNS（实际上就是一个链接🔗）

> 插件：vite-plugin-cdn-import

# 处理跨域

## 同源策略

前提：仅在浏览器发生

规定了：HTTP 交互只能发生在同协议、同域名、同端口的两台终端之间进行

定义跨域：当 A 源的浏览器网页向 B 源的服务器地址请求信息时，如果不符合同源策略，就会产生跨域，跨域请求默认会被浏览器拦截

重点：跨域限制是服务器响应了资源，但是浏览器不给你

## Vite是如何做到跨域的

实际请求的还是自己的服务器，Vite 在服务端将这个请求发送的出去，也就是绕过来浏览器的限制

> 原理：
>
> 浏览器发起请求 -> 自己的服务器 -> 外面的服务器 -> 拿到数据（然后再把数据沿着这条链路传回去）【实际请求了两次，一次是浏览器到自己的服务器，一个是自己的服务器到外面的服务器】

```js
import { defineConfig } from 'vite'
export default defineConfig({
  server: {
    proxy: {
      api: {
        target: 'http://www.360.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  ...
})
```

## 总结

- 开发时
  - 利用构建工具或者脚手架或者第三方库的 proxy 代理配置
  - 我们自己搭建一个开发服务器
- 生产时
  - 后端/运维通过ngnix代理服务，和我们自己搭建一个开发服务器的原理类似
  - 配置身份标记`Access-Control-Allow-Origin`，相当于一个白名单，会出现在服务端的响应头中
