import{_ as s,o as a,c as n,U as e}from"./chunks/framework.876add27.js";const D=JSON.parse('{"title":"","description":"","frontmatter":{"tag":["Vue3"]},"headers":[],"relativePath":"Vue/VueRouter.md","filePath":"Vue/VueRouter.md","lastUpdated":1689602218000}'),l={name:"Vue/VueRouter.md"},p=e(`<h2 id="路由跳转问题与解决" tabindex="-1">路由跳转问题与解决 <a class="header-anchor" href="#路由跳转问题与解决" aria-label="Permalink to &quot;路由跳转问题与解决&quot;">​</a></h2><p>在第四届青训营项目-仿掘金官网的搭建中, 我们遇到了滑动滚动栏之后跳转到新页面, 会导致新页面初始化时的滚动条与上一个页面相同的情况.</p><p>基于这种情况, 我们发现是在之前运行的代码中, 使得浏览器记录下了滚动条信息, 因此, 我们通过实用scrollBehavior方法, 判断点击事件是否导致了浏览器的前进/后退, 进而对savePosition参数进行归零处理, 使得滚动条在每一个页面的初始形式都是保持置顶状态</p><blockquote><p>在router中具体配置的代码如下</p></blockquote><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const router = new VueRouter({</span></span>
<span class="line"><span style="color:#A6ACCD;">  mode: &quot;history&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  base: p<wbr>rocess.env.BASE_URL,</span></span>
<span class="line"><span style="color:#A6ACCD;">  routes,</span></span>
<span class="line"><span style="color:#A6ACCD;">  //路由跳转滚动问题</span></span>
<span class="line"><span style="color:#A6ACCD;">  //scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。</span></span>
<span class="line"><span style="color:#A6ACCD;">  scrollBehavior(to, from, savedPosition) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (savedPosition) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      return savedPosition;</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">      return { x: 0, y: 0 };</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span></code></pre></div><h2 id="路由变化后修改页面标题" tabindex="-1">路由变化后修改页面标题 <a class="header-anchor" href="#路由变化后修改页面标题" aria-label="Permalink to &quot;路由变化后修改页面标题&quot;">​</a></h2><blockquote><p>我们通过调用路由的beforeEach方法, 较为容易的实现了路由变化后修改页面标题的需求</p></blockquote><p>代码如下</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">router.beforeEach((to, from, next) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  /* 路由发生变化修改页面title */</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (to.meta.title) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    document.title = to.meta.title;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  next();</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span></code></pre></div><h2 id="解决-vue-重复点击相同路由" tabindex="-1">解决 Vue 重复点击相同路由 <a class="header-anchor" href="#解决-vue-重复点击相同路由" aria-label="Permalink to &quot;解决 Vue 重复点击相同路由&quot;">​</a></h2><p>为了解决重复点击相同路由出现的卡顿现象, 我们直接修改了Vuerouter的prototype里的push方法, 达到了效果</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const VueRouterPush = VueRouter.prototype.push;</span></span>
<span class="line"><span style="color:#A6ACCD;">VueRouter.prototype.push = function push(to) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return VueRouterPush.call(this, to).catch((err) =&gt; err);</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span></code></pre></div><h2 id="数据来源与接口" tabindex="-1">数据来源与接口 <a class="header-anchor" href="#数据来源与接口" aria-label="Permalink to &quot;数据来源与接口&quot;">​</a></h2><p>后端接口方面, 我们讨论后决定使用apifox来mock数据, 这个自动化生成数据的网页极大的降低了我们的开发难度, 只需中api文件夹中配置request.js文件即可使用, 内容如下</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import axios from &quot;axios&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const server = axios.create({</span></span>
<span class="line"><span style="color:#A6ACCD;">  baseURL: &quot;https://mock.apifox.cn/xxx&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  timeout: 3000,</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function get(url, params) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    server</span></span>
<span class="line"><span style="color:#A6ACCD;">      .get(url, {</span></span>
<span class="line"><span style="color:#A6ACCD;">        params: params,</span></span>
<span class="line"><span style="color:#A6ACCD;">      })</span></span>
<span class="line"><span style="color:#A6ACCD;">      .then((res) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">        resolve(res.data);</span></span>
<span class="line"><span style="color:#A6ACCD;">      })</span></span>
<span class="line"><span style="color:#A6ACCD;">      .catch((err) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">        reject(err);</span></span>
<span class="line"><span style="color:#A6ACCD;">      });</span></span>
<span class="line"><span style="color:#A6ACCD;">  });</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function post(url, params) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    server</span></span>
<span class="line"><span style="color:#A6ACCD;">      .post(url, params)</span></span>
<span class="line"><span style="color:#A6ACCD;">      .then((res) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">        resolve(res.data);</span></span>
<span class="line"><span style="color:#A6ACCD;">      })</span></span>
<span class="line"><span style="color:#A6ACCD;">      .catch((err) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">        reject(err);</span></span>
<span class="line"><span style="color:#A6ACCD;">      });</span></span>
<span class="line"><span style="color:#A6ACCD;">  });</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">  get,</span></span>
<span class="line"><span style="color:#A6ACCD;">  post,</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span></code></pre></div>`,15),o=[p];function t(c,r,i,C,A,u){return a(),n("div",null,o)}const h=s(l,[["render",t]]);export{D as __pageData,h as default};
