import{_ as t,o as e,c as l,U as a}from"./chunks/framework.876add27.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{"tag":["Vue3"]},"headers":[],"relativePath":"Vue/Vue进阶.md","filePath":"Vue/Vue进阶.md","lastUpdated":1689602218000}'),d={name:"Vue/Vue进阶.md"},r=a('<h2 id="生命周期" tabindex="-1">生命周期 <a class="header-anchor" href="#生命周期" aria-label="Permalink to &quot;生命周期&quot;">​</a></h2><p>Vue2和Vue3的生命周期都是指Vue实例从创建到销毁的一系列过程，其中有一些特定的事件或钩子函数可以让我们在不同阶段执行自定义的逻辑</p><p>Vue2和Vue3的生命周期有以下区别：</p><ul><li>Vue3新增了一个setup钩子函数，它是组合式API（Composition API）的入口，可以在其中使用响应式数据、计算属性、侦听器、生命周期等功能</li><li>Vue3中除了setup外，其他的生命周期钩子函数都需要按需引入才能使用，而且名称上都加了on前缀，比如onCreated, onMounted等</li><li>Vue3中移除了beforeDestroy和destroyed钩子函数，取而代之的是beforeUnmount和unmounted</li></ul><p>具体到每一个生命周期的功能，请参考以下表格：</p><table><thead><tr><th style="text-align:center;">钩子函数</th><th style="text-align:center;">Vue2</th><th style="text-align:center;">Vue3</th><th style="text-align:left;">功能</th></tr></thead><tbody><tr><td style="text-align:center;">beforeCreate</td><td style="text-align:center;">✔️</td><td style="text-align:center;">✔️</td><td style="text-align:left;">实例初始化之后，数据观测和事件配置之前调用</td></tr><tr><td style="text-align:center;">created</td><td style="text-align:center;">✔️</td><td style="text-align:center;">✔️</td><td style="text-align:left;">实例创建完成后调用，可访问data和methods</td></tr><tr><td style="text-align:center;">beforeMount</td><td style="text-align:center;">✔️</td><td style="text-align:center;">✔️</td><td style="text-align:left;">模板编译/挂载之前调用</td></tr><tr><td style="text-align:center;">mounted</td><td style="text-align:center;">✔️</td><td style="text-align:center;">✔️</td><td style="text-align:left;">模板编译/挂载之后调用</td></tr><tr><td style="text-align:center;">beforeUpdate</td><td style="text-align:center;">✔️</td><td style="text-align:center;">✔️</td><td style="text-align:left;">数据更新时调用，发生在虚拟DOM打补丁之前</td></tr><tr><td style="text-align:center;">updated</td><td style="text-align:center;">✔️</td><td style="text-align:center;">✔️</td><td style="text-align:left;">数据更新后调用，发生在虚拟DOM打补丁之后</td></tr><tr><td style="text-align:center;">beforeUnmount</td><td style="text-align:center;">❌</td><td style="text-align:center;">✔️</td><td style="text-align:left;">实例卸载之前调用，可以做一些清理工作</td></tr><tr><td style="text-align:center;">unmounted</td><td style="text-align:center;">❌</td><td style="text-align:center;">✔️</td><td style="text-align:left;">实例卸载之后调用，实例的所有指令解绑，所有的事件监听器被移除，所有的子组件也被销毁</td></tr></tbody></table><p>此外，还有一些不那么常用的生命周期钩子</p><table><thead><tr><th style="text-align:center;">钩子函数</th><th style="text-align:center;">Vue2</th><th style="text-align:center;">Vue3</th><th style="text-align:left;">功能</th></tr></thead><tbody><tr><td style="text-align:center;">activated</td><td style="text-align:center;">✔️</td><td style="text-align:center;">✔️</td><td style="text-align:left;">keep-alive组件激活时调用</td></tr><tr><td style="text-align:center;">deactivated</td><td style="text-align:center;">✔️</td><td style="text-align:center;">✔️</td><td style="text-align:left;">keep-alive组件停用时调用</td></tr><tr><td style="text-align:center;">errorCaptured</td><td style="text-align:center;">✔️</td><td style="text-align:center;">✔️</td><td style="text-align:left;">捕获一个来自子孙组件的错误时被调用</td></tr></tbody></table><h2 id="响应式原理" tabindex="-1">响应式原理 <a class="header-anchor" href="#响应式原理" aria-label="Permalink to &quot;响应式原理&quot;">​</a></h2><p>VUE的响应式原理是指当数据发生变化时，视图会自动更新。</p><h3 id="vue2" tabindex="-1">Vue2 <a class="header-anchor" href="#vue2" aria-label="Permalink to &quot;Vue2&quot;">​</a></h3><p>VUE2是利用了Object.defineProperty的方法里面的setter和getter方法的观察者模式来实现的；</p><p>具体过程如下：</p><ol><li>当创建一个VUE实例时，会对data中的属性进行数据劫持，即用Object.defineProperty定义属性的getter和setter方法。</li><li>在getter方法中，会收集依赖，即把当前访问该属性的Watcher对象添加到Dep对象中。</li><li>在setter方法中，会触发依赖，即通知Dep对象中存储的所有Watcher对象执行更新操作。</li><li>Watcher对象是一个订阅者，它有一个update方法，用来更新视图或执行回调函数。</li><li>Dep对象是一个发布者，它有一个notify方法，用来通知所有订阅者更新。</li><li>VUE中有三种Watcher对象：渲染Watcher、计算属性Watcher和侦听器Watcher。它们之间有着复杂的收集关系</li></ol><h3 id="vue3" tabindex="-1">Vue3 <a class="header-anchor" href="#vue3" aria-label="Permalink to &quot;Vue3&quot;">​</a></h3><p>VUE3的响应式原理是基于现代浏览器所支持的代理对象Proxy实现的。Proxy可以拦截对象的读取、修改和删除操作，从而实现数据劫持和依赖收集。</p><p>具体过程如下：</p><ol><li>当创建一个VUE实例时，会对data中的属性进行数据劫持，即用Proxy定义对象的get和set方法。</li><li>在get方法中，会收集依赖，即把当前访问该属性的effect函数添加到activeEffectStack中，并且建立属性和effect函数之间的映射关系。</li><li>在set方法中，会触发依赖，即根据属性找到对应的effect函数，并执行它们。</li><li>effect函数是一个副作用函数，它可以更新视图或执行回调函数。</li><li>VUE3中有两种effect函数：渲染effect和计算属性effect。渲染effect用来更新视图，计算属性effect用来缓存计算结果。</li></ol><h2 id="v-for中key的作用" tabindex="-1">v-for中key的作用 <a class="header-anchor" href="#v-for中key的作用" aria-label="Permalink to &quot;v-for中key的作用&quot;">​</a></h2><p>h函数的key是diff阶段唯一标识，一个是isSameVnode需要，另一个是keyToNewIndexMap做映射表取出key做新老节点diff.</p><p>vue的v-for指令用来渲染一个列表，它需要一个key属性来标识每个元素。</p><p>key属性的作用是给vue的虚拟DOM算法一个提示，让它能够在更新列表时识别哪些节点发生了变化，哪些没有。</p><p>这样可以提高渲染性能，避免不必要的DOM操作。</p><p>如果不使用key属性，或者使用不唯一的值作为key，可能会导致一些问题，比如数据错乱、动画失效、组件状态丢失等。</p><p>因此，建议使用唯一且稳定的值作为key，比如id等</p>',25),n=[r];function i(s,c,o,y,f,x){return e(),l("div",null,n)}const g=t(d,[["render",i]]);export{h as __pageData,g as default};
