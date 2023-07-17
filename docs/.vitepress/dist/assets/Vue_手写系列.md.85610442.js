import{_ as s,o as n,c as a,U as l}from"./chunks/framework.876add27.js";const i=JSON.parse('{"title":"手写","description":"","frontmatter":{"tag":["Vue3"]},"headers":[],"relativePath":"Vue/手写系列.md","filePath":"Vue/手写系列.md","lastUpdated":1689602218000}'),p={name:"Vue/手写系列.md"},o=l(`<h1 id="手写" tabindex="-1">手写 <a class="header-anchor" href="#手写" aria-label="Permalink to &quot;手写&quot;">​</a></h1><h2 id="手写响应式原理" tabindex="-1">手写响应式原理 <a class="header-anchor" href="#手写响应式原理" aria-label="Permalink to &quot;手写响应式原理&quot;">​</a></h2><h3 id="defineproperty" tabindex="-1">defineProperty <a class="header-anchor" href="#defineproperty" aria-label="Permalink to &quot;defineProperty&quot;">​</a></h3><div class="language-jsx"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> person </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">age</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">18</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineProperty</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">obj</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">key</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">val</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">typeof</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">val</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">object</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">Observer</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">val</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">defineProperty</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    get</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">访问了</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">属性</span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">val</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">    set</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">newVal</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`\${</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">属性被修改为</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">newVal</span><span style="color:#89DDFF;">}\`</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">val</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">newVal</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Observer</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">obj</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">typeof</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">obj</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">object</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">obj</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">null</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">keys</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">obj</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forEach</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">key</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">defineProperty</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">obj</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">])</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#82AAFF;">Observer</span><span style="color:#A6ACCD;">(person)</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(person</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">age)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h3 id="proxy" tabindex="-1">Proxy <a class="header-anchor" href="#proxy" aria-label="Permalink to &quot;Proxy&quot;">​</a></h3><div class="language-jsx"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> person </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Lucy</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">age</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">18</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> handler </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">get</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">obj</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">key</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">访问了</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">属性</span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">in</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">obj</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">obj</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">属性不存在</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">set</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">obj</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">key</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">value</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`\${</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">属性被改变为</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">}\`</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">obj</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> proxyPerson </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Proxy</span><span style="color:#A6ACCD;">(person</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> handler)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name =</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> proxyPerson</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">proxyPerson</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">John</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name =</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> proxyPerson</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(proxyPerson</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">salary)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="手写v-model" tabindex="-1">手写v-model <a class="header-anchor" href="#手写v-model" aria-label="Permalink to &quot;手写v-model&quot;">​</a></h2><blockquote><p>手写实现vue的v-model指令</p></blockquote><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;!-- &lt;script src=&quot;./Mvvm.js&quot;&gt;&lt;/script&gt; --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;ul&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;li&gt;name: &lt;input type=&quot;text&quot; v-model=&quot;name&quot;&gt;&lt;/li&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/ul&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;ul&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;li&gt;name: &lt;span&gt;{{name}}&lt;/span&gt;&lt;/li&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/ul&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    class Mvvm {</span></span>
<span class="line"><span style="color:#A6ACCD;">      constructor(el, data) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.el = document.querySelector(el);</span></span>
<span class="line"><span style="color:#A6ACCD;">        this._data = data;</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.domPool = {}</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.init()</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">      init() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.initDataProxy()</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.initDom()</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">      initData() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.data = {}</span></span>
<span class="line"><span style="color:#A6ACCD;">        const that = this;</span></span>
<span class="line"><span style="color:#A6ACCD;">        Object.keys(this._data).forEach(key =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">          Object.defineProperty(this.data, key, {</span></span>
<span class="line"><span style="color:#A6ACCD;">            get() {</span></span>
<span class="line"><span style="color:#A6ACCD;">              return that._data[key];</span></span>
<span class="line"><span style="color:#A6ACCD;">            },</span></span>
<span class="line"><span style="color:#A6ACCD;">            set(value) {</span></span>
<span class="line"><span style="color:#A6ACCD;">              that._data[key] = value;</span></span>
<span class="line"><span style="color:#A6ACCD;">              that.domPool[key].innerText = value;</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">          })</span></span>
<span class="line"><span style="color:#A6ACCD;">        })</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">      initDataProxy() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        const that = this;</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.data = new Proxy(this._data, {</span></span>
<span class="line"><span style="color:#A6ACCD;">          get(target, prop) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            return target[prop]</span></span>
<span class="line"><span style="color:#A6ACCD;">          },</span></span>
<span class="line"><span style="color:#A6ACCD;">          set(target, prop, val) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            target[prop] = val;</span></span>
<span class="line"><span style="color:#A6ACCD;">            that.domPool[prop].innerText = val;</span></span>
<span class="line"><span style="color:#A6ACCD;">            return true</span></span>
<span class="line"><span style="color:#A6ACCD;">          }</span></span>
<span class="line"><span style="color:#A6ACCD;">        })</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">      initDom() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.bindDom(this.el)</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.bindInput(this.el)</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">      bindDom(el) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        const allChildNodes = el.childNodes</span></span>
<span class="line"><span style="color:#A6ACCD;">        allChildNodes.forEach(item =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">          if (item.nodeType === 3) { //代表是文本节点</span></span>
<span class="line"><span style="color:#A6ACCD;">            const _value = item.nodeValue</span></span>
<span class="line"><span style="color:#A6ACCD;">            if (_value.trim().length &gt; 0) {</span></span>
<span class="line"><span style="color:#A6ACCD;">              // 匹配双大括号里的内容</span></span>
<span class="line"><span style="color:#A6ACCD;">              const regx = /{{(.+?)}}/</span></span>
<span class="line"><span style="color:#A6ACCD;">              const isPass = regx.test(_value)</span></span>
<span class="line"><span style="color:#A6ACCD;">              if (isPass) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                const _key = _value.match(regx)[1] // [0]:值本身 [1]:解析出的值</span></span>
<span class="line"><span style="color:#A6ACCD;">                this.domPool[_key] = item.parentNode</span></span>
<span class="line"><span style="color:#A6ACCD;">                item.parentNode.innerText = this.data[_key]</span></span>
<span class="line"><span style="color:#A6ACCD;">              }</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">          }</span></span>
<span class="line"><span style="color:#A6ACCD;">          item.childNodes &amp;&amp; this.bindDom(item)</span></span>
<span class="line"><span style="color:#A6ACCD;">        })</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">      bindInput(el) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        const inputs = el.querySelectorAll(&#39;input&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">        inputs.forEach(input =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">          const _vmodel = input.getAttribute(&#39;v-model&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">          input.addEventListener(</span></span>
<span class="line"><span style="color:#A6ACCD;">            &#39;keyup&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            this.handlerInput.bind(this, _vmodel, input, false)</span></span>
<span class="line"><span style="color:#A6ACCD;">          )</span></span>
<span class="line"><span style="color:#A6ACCD;">        })</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">      handlerInput(key, input) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        const value = input.value</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.data[key] = value</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    new Mvvm(&#39;#app&#39;, {</span></span>
<span class="line"><span style="color:#A6ACCD;">      name: &#39;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span></code></pre></div>`,9),e=[o];function t(c,r,y,D,A,C){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{i as __pageData,d as default};
