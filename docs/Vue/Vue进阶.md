---
tag:
 - Vue3
---

## 生命周期

Vue2和Vue3的生命周期都是指Vue实例从创建到销毁的一系列过程，其中有一些特定的事件或钩子函数可以让我们在不同阶段执行自定义的逻辑

Vue2和Vue3的生命周期有以下区别：

- Vue3新增了一个setup钩子函数，它是组合式API（Composition API）的入口，可以在其中使用响应式数据、计算属性、侦听器、生命周期等功能
- Vue3中除了setup外，其他的生命周期钩子函数都需要按需引入才能使用，而且名称上都加了on前缀，比如onCreated, onMounted等
- Vue3中移除了beforeDestroy和destroyed钩子函数，取而代之的是beforeUnmount和unmounted

具体到每一个生命周期的功能，请参考以下表格：

| 钩子函数 | Vue2 | Vue3 | 功能 |
| :---: | :---: | :---: | :--- |
| beforeCreate | ✔️ | ✔️ | 实例初始化之后，数据观测和事件配置之前调用 |
| created | ✔️ | ✔️ | 实例创建完成后调用，可访问data和methods |
| beforeMount | ✔️ | ✔️ | 模板编译/挂载之前调用 |
| mounted | ✔️ | ✔️ | 模板编译/挂载之后调用 |
| beforeUpdate | ✔️ |✔️|数据更新时调用，发生在虚拟DOM打补丁之前|
| updated | ✔️ |✔️|数据更新后调用，发生在虚拟DOM打补丁之后|
| beforeUnmount | ❌ |✔️|实例卸载之前调用，可以做一些清理工作|
| unmounted | ❌ |✔️|实例卸载之后调用，实例的所有指令解绑，所有的事件监听器被移除，所有的子组件也被销毁|

此外，还有一些不那么常用的生命周期钩子

|   钩子函数    | Vue2 | Vue3 | 功能                               |
| :-----------: | :--: | :--: | :--------------------------------- |
|   activated   |  ✔️   |  ✔️   | keep-alive组件激活时调用           |
|  deactivated  |  ✔️   |  ✔️   | keep-alive组件停用时调用           |
| errorCaptured |  ✔️   |  ✔️   | 捕获一个来自子孙组件的错误时被调用 |

## 响应式原理

VUE的响应式原理是指当数据发生变化时，视图会自动更新。

### Vue2

VUE2是利用了Object.defineProperty的方法里面的setter和getter方法的观察者模式来实现的；

具体过程如下：

1. 当创建一个VUE实例时，会对data中的属性进行数据劫持，即用Object.defineProperty定义属性的getter和setter方法。
2. 在getter方法中，会收集依赖，即把当前访问该属性的Watcher对象添加到Dep对象中。
3. 在setter方法中，会触发依赖，即通知Dep对象中存储的所有Watcher对象执行更新操作。
4. Watcher对象是一个订阅者，它有一个update方法，用来更新视图或执行回调函数。
5. Dep对象是一个发布者，它有一个notify方法，用来通知所有订阅者更新。
6. VUE中有三种Watcher对象：渲染Watcher、计算属性Watcher和侦听器Watcher。它们之间有着复杂的收集关系

### Vue3

VUE3的响应式原理是基于现代浏览器所支持的代理对象Proxy实现的。Proxy可以拦截对象的读取、修改和删除操作，从而实现数据劫持和依赖收集。

具体过程如下：

1. 当创建一个VUE实例时，会对data中的属性进行数据劫持，即用Proxy定义对象的get和set方法。
2. 在get方法中，会收集依赖，即把当前访问该属性的effect函数添加到activeEffectStack中，并且建立属性和effect函数之间的映射关系。
3. 在set方法中，会触发依赖，即根据属性找到对应的effect函数，并执行它们。
4. effect函数是一个副作用函数，它可以更新视图或执行回调函数。
5. VUE3中有两种effect函数：渲染effect和计算属性effect。渲染effect用来更新视图，计算属性effect用来缓存计算结果。

## v-for中key的作用

h函数的key是diff阶段唯一标识，一个是isSameVnode需要，另一个是keyToNewIndexMap做映射表取出key做新老节点diff.

vue的v-for指令用来渲染一个列表，它需要一个key属性来标识每个元素。

key属性的作用是给vue的虚拟DOM算法一个提示，让它能够在更新列表时识别哪些节点发生了变化，哪些没有。

这样可以提高渲染性能，避免不必要的DOM操作。

如果不使用key属性，或者使用不唯一的值作为key，可能会导致一些问题，比如数据错乱、动画失效、组件状态丢失等。

因此，建议使用唯一且稳定的值作为key，比如id等
