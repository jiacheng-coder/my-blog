import{_ as s,o as t,c as e,U as a}from"./chunks/framework.a7041386.js";const h=JSON.parse('{"title":"起源","description":"","frontmatter":{"tag":["前端工程化"]},"headers":[],"relativePath":"前端工程化/起源.md","filePath":"前端工程化/起源.md","lastUpdated":1690701222000}'),S={name:"前端工程化/起源.md"},o=a('<h1 id="起源" tabindex="-1">起源 <a class="header-anchor" href="#起源" aria-label="Permalink to &quot;起源&quot;">​</a></h1><p>早期的开发者们，使用 HTML，CSS，JS 来进行网页的开发，当网站体量大了之后，这种传统的方式却带来了难以维护，样式不统一等等问题，由此产生了像 React，Vue 这样的 Framework，协助开发者开发。</p><p>在 CSS 的基础上，衍生出了 Less，Sass，PostCss 这样的处理器，POSTCSS 由于其衍生原因，在现在的工程化项目中往往被作为后处理器使用，用于将兼容新旧 CSS的特性，实际上 PostCss 是可以替代 Less，Sass 这种前处理器，成为 CSS 的最终解决方案的，不过由于他内部需要不断开发插件，兼容 Less，Sass 的新版本迭代，后期社区就放弃了这种一体化解决方案，着重处理新旧 CSS 的特性了。</p><p>最终的处理逻辑可以理解为如下的链路：</p><p>Less/Sass文件 -&gt; Less/Sass 处理器 -&gt; 具有新特性的 CSS文件 -&gt; PostCss 处理器 -&gt; 兼容老特性的 CSS</p><p>在 JS 的基础上，衍生出了 TS 这种具有类型系统的编程语言，可以简单理解为 JS 的超集（数学概念）。同时，JS 这门语言自身的特性也在不断发展，也需要做新特性的兼容，由此一个新项目还需要考虑 JS 的处理逻辑，最终处理链路如下：</p><p>TS 文件 -&gt; 具有新特性的 JS 文件 -&gt; 兼容老特性的 JS</p><p>除了 CSS 和 JS 这两种文件的转换处理，在实际项目的开发中，还需要考虑诸如：打包优化，分包策略，静态资源处理等等许多问题，这些问题如果由我们人为的去配置，会大大减缓我们的开发效率。</p><p>因此，就诞生了诸如 ESBuild，Webpack，Rollup，Vite 这样的打包构建工具，专门为我们负责项目的打包构建流程，对于新手小白，可以不考虑其中的特性，直接使用即可。对于有一定基础的开发者，这些打包工具也各自都提供了自定义的配置项，我们可以使用这些配置项对项目进行更加专门化的打包构建。</p>',9),p=[o];function _(r,c,n,d,i,l){return t(),e("div",null,p)}const m=s(S,[["render",_]]);export{h as __pageData,m as default};
