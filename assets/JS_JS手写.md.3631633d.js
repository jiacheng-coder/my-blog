import{_ as s,o as n,c as a,U as l}from"./chunks/framework.a7041386.js";const d=JSON.parse('{"title":"JS手写","description":"","frontmatter":{"tag":["JS"],"sticky":100},"headers":[],"relativePath":"JS/JS手写.md","filePath":"JS/JS手写.md","lastUpdated":1689602218000}'),p={name:"JS/JS手写.md"},o=l(`<h1 id="js手写" tabindex="-1">JS手写 <a class="header-anchor" href="#js手写" aria-label="Permalink to &quot;JS手写&quot;">​</a></h1><h2 id="组合函数" tabindex="-1">组合函数 <a class="header-anchor" href="#组合函数" aria-label="Permalink to &quot;组合函数&quot;">​</a></h2><p>简单来说，compose函数可以用来组合不同的函数，它的实现有两个要点</p><ol><li>组合函数</li><li>从右→左求值</li></ol><p>这里我使用reduce和常规递归两种方法实现compose</p><div class="language-jsx"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 1.组合函数</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 2.从右向左求值</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> compose </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(...</span><span style="color:#A6ACCD;font-style:italic;">fns</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(...</span><span style="color:#A6ACCD;font-style:italic;">args</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">preResult</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">args</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">fns</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">--</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">preResult</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Array</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isArray</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">preResult</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">fns</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">](</span><span style="color:#89DDFF;">...</span><span style="color:#A6ACCD;">preResult</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">fns</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">](</span><span style="color:#A6ACCD;">preResult</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">preResult</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> test </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">add</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">y</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">x</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">y</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">add5</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">x</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">5</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">multiply10</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">x</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">x</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">10</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">f</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">compose</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">add5</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">multiply10</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">add</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#82AAFF;">f</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 6-&gt;60-&gt;65, 输出结果：65</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#82AAFF;">test</span><span style="color:#A6ACCD;">()</span></span></code></pre></div><h2 id="curry柯里化" tabindex="-1">Curry柯里化 <a class="header-anchor" href="#curry柯里化" aria-label="Permalink to &quot;Curry柯里化&quot;">​</a></h2><p>函数柯里化的目的是将接收多个参数的函数转换为接收单一参数的函数，并返回接受余下参数并返回结果的新函数。这样可以更方便地构建复杂的函数，也能够更好地理解和调试代码。</p><ul><li>希望函数能得到最小程度的复用</li><li>保证最细粒度的函数调用</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 两种实现方式</span></span>
<span class="line"><span style="color:#A6ACCD;">// 方法一：返回一个函数，如果参数的长度等于要求的长度，直接调用原函数，否则返回一个新的函数等待调用</span></span>
<span class="line"><span style="color:#A6ACCD;">function curry(fn) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return function myCurry(...args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (args.length === fn.length) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      return fn(...args);</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">      return (...args2) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return myCurry(...args, ...args2);</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">// 方法二：利用闭包，递归调用自身，直到参数个数足够，再调用原函数，这段代码的可读性更好</span></span>
<span class="line"><span style="color:#A6ACCD;">function curry2(fn) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const g = (...args) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (args.length &gt;= fn.length) return fn(...args);</span></span>
<span class="line"><span style="color:#A6ACCD;">    return (...args2) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      return g(...args, ...args2);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  return g</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 测试</span></span>
<span class="line"><span style="color:#A6ACCD;">function add(a, b, c) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return a + b + c;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">let curriedAdd = curry2(add);</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(curriedAdd(1)(2)(3)); // 6</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(curriedAdd(1, 2)(3)); // 6</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(curriedAdd(1)(2, 3)); // 6</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(curriedAdd(1, 2, 3)); // 6</span></span></code></pre></div><p><strong>代码解析：</strong></p><ul><li><code>curry</code>: 实现柯里化的第一种方式，返回一个函数，如果传入的参数个数等于原函数的参数个数，就直接调用原函数，否则返回一个新的函数等待调用。</li><li><code>curry2</code>: 实现柯里化的第二种方式，利用闭包，递归调用自身，直到传入的参数个数足够，再调用原函数。</li><li><code>add</code>: 一个简单的加法函数，用于测试柯里化的效果。</li><li><code>curriedAdd</code>: 将 <code>add</code> 函数柯里化之后得到的新函数，可以将其看作是一个接受 1 个参数的函数，每次调用返回一个新的接受 1 个参数的函数，直到传入的参数个数足够，最终调用 <code>add</code> 函数。</li></ul><p><strong>关键位置解析：</strong></p><ul><li>在 <code>curry</code> 中，如果传入的参数个数等于原函数的参数个数，就直接调用原函数；否则返回一个新的函数等待调用。</li><li>在 <code>curry2</code> 中，返回一个函数 <code>g</code>，每次调用 <code>g</code> 都会检查传入的参数个数是否达到要求，如果达到要求直接调用原函数，否则返回一个新的函数等待调用。</li><li>在 <code>curriedAdd</code> 中，每次调用返回一个新的接受 1 个参数的函数，直到传入的参数个数足够，最终调用 <code>add</code> 函数计算结果，并返回结果。</li></ul><h2 id="实现settimeout" tabindex="-1">实现setTimeout <a class="header-anchor" href="#实现settimeout" aria-label="Permalink to &quot;实现setTimeout&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 用setTimeout代替setInterval实现定时任务</span></span>
<span class="line"><span style="color:#A6ACCD;">function mySetTimeout(func, delay, ...args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  //setInterval会一直执行，但是在setInterval里面执行clearInterval()将会被清除</span></span>
<span class="line"><span style="color:#A6ACCD;">  const timer = setInterval(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    func(...args)</span></span>
<span class="line"><span style="color:#A6ACCD;">    clearInterval(timer)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }, delay)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">function add(a, b) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(\`a+b=\${a + b}\`);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">// 在1秒后执行add函数，并传入2和3作为参数</span></span>
<span class="line"><span style="color:#A6ACCD;">const timer_test = mySetTimeout(add, 1000, 2, 3)</span></span></code></pre></div><p><strong>代码解析：</strong></p><ul><li><code>mySetTimeout</code>: 自定义的定时任务函数，用于在指定的延时后执行回调函数</li><li><code>func</code>: 回调函数，会在指定的延时后执行</li><li><code>delay</code>: 延时时间，单位为毫秒</li><li><code>args</code>: 回调函数的参数，可以传入任意个数的参数</li><li><code>timer</code>: 定时器对象，用于清除定时任务</li></ul><p><strong>关键位置解析：</strong></p><ul><li>在 <code>setInterval</code> 中执行 <code>clearInterval</code>，因为 <code>setInterval</code> 会一直执行，而 <code>clearInterval</code> 只能在定时器回调函数中执行，否则会被清除。</li><li>在 <code>setInterval</code> 中调用 <code>func(...args)</code> 执行回调函数，并在回调函数执行完毕后清除定时器，以实现定时任务的功能。</li><li>在最后一行代码中，调用 <code>mySetTimeout</code> 函数，传入回调函数 <code>add</code> 和延时时间 <code>1000</code>，并传入 <code>2</code> 和 <code>3</code> 作为回调函数的参数，从而实现在 1 秒后输出 <code>a+b=5</code> 的功能。</li></ul><h2 id="数组flatten" tabindex="-1">数组flatten <a class="header-anchor" href="#数组flatten" aria-label="Permalink to &quot;数组flatten&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * 数组扁平化</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @param {Array} arr 需要扁平化的数组</span></span>
<span class="line"><span style="color:#A6ACCD;"> * @returns {Array} 扁平化后的数组</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const flat = (arr) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  let res = []</span></span>
<span class="line"><span style="color:#A6ACCD;">  for (let item of arr) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (Array.isArray(item)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      res = res.concat(flat(item))</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">      res.push(item)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  return res</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function flatten(arr) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (!Array.isArray(arr)) return arr</span></span>
<span class="line"><span style="color:#A6ACCD;">  return [].concat(...arr.map(flatten))</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 测试</span></span>
<span class="line"><span style="color:#A6ACCD;">const arr = [1, 2, [3, 4, [5, 6, [{ name: &#39;Lucy&#39; }]]]]</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(flat(arr))[1, 2, 3, 4, 5, 6, { name: &#39;Lucy&#39; }]</span></span></code></pre></div><p><strong>代码解析：</strong></p><ul><li><code>flat</code>: 数组扁平化函数，递归遍历数组，并将扁平化后的元素添加到新的数组中。</li><li><code>arr</code>: 需要扁平化的数组。</li><li><code>res</code>: 扁平化后的数组。</li><li>遍历数组 <code>arr</code>，如果当前元素是数组，就递归调用 <code>flat</code> 函数，否则将当前元素添加到 <code>res</code> 数组中。</li><li>最终返回 <code>res</code> 数组，即为扁平化后的数组。</li></ul><h2 id="防抖" tabindex="-1">防抖 <a class="header-anchor" href="#防抖" aria-label="Permalink to &quot;防抖&quot;">​</a></h2><p>防抖的主要思想是将一定时间内的多次操作合并为一次，只触发一次函数执行。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 第一个参数是需要进行防抖处理的函数，第二个参数是延迟时间，默认为1秒钟</span></span>
<span class="line"><span style="color:#A6ACCD;">function debounce(fn, delay) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  let timer = null</span></span>
<span class="line"><span style="color:#A6ACCD;">  return (...args) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (timer) clearTimeout(timer)</span></span>
<span class="line"><span style="color:#A6ACCD;">    timer = setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      fn(...args)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }, delay)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const btn = document.querySelector(&#39;#btn&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">const handleClick = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(&#39;按钮点击&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">btn.addEventListener(&#39;click&#39;, debounce(handleClick, 1000))</span></span></code></pre></div><ul><li><code>func</code> 是需要执行的函数。</li><li><code>delay</code> 是防抖时间，单位为毫秒。</li><li><code>timer</code> 是计时器 ID，用于取消计时器。</li></ul><h2 id="节流" tabindex="-1">节流 <a class="header-anchor" href="#节流" aria-label="Permalink to &quot;节流&quot;">​</a></h2><p>节流的主要思想是连续触发事件时，只在规定时间间隔内执行一次函数。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 第一个参数是需要进行节流处理的函数，第二个参数是间隔时间，默认为1秒钟</span></span>
<span class="line"><span style="color:#A6ACCD;">function throttle(fn, interval = 1000) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  let flag = true // flag变量用于标记是否可以执行fn</span></span>
<span class="line"><span style="color:#A6ACCD;">  return (...args) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 如果flag为false，说明已经有定时器在执行fn了，直接返回</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (!flag) return</span></span>
<span class="line"><span style="color:#A6ACCD;">    flag = false</span></span>
<span class="line"><span style="color:#A6ACCD;">    setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      flag = true</span></span>
<span class="line"><span style="color:#A6ACCD;">      fn(...args)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }, interval)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const handleScroll = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(window.scrollY);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">window.addEventListener(&quot;scroll&quot;, throttle(handleScroll, 2000));</span></span></code></pre></div><ul><li><code>func</code> 是需要执行的函数。</li><li><code>delay</code> 是节流时间，单位为毫秒。</li><li><code>flag</code> 是计时器 ID，用于判断是否需要执行函数。</li></ul>`,32),e=[o];function c(t,r,y,i,C,A){return n(),a("div",null,e)}const F=s(p,[["render",c]]);export{d as __pageData,F as default};
