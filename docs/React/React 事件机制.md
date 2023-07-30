---
tag:
 - React
---

# React 事件机制

## 前置知识

- 事件冒泡
- 事件委托
- 函数式编程「React 官方是十分推崇函数式编程的」
    - 纯函数
    - 了解什么是副作用
    - 不可变状态
        - 可以使用一些npm包，使用可变的代码来操作状态
- 拓展运算符 ...

## React 事件机制「原理」

### 事件机制

> 事件机制，fiber架构，react调度机制，优先级概念，commit 以及 render两个阶段 以及hooks原理 -> 重难点
> 
- React的JSX 写的代码不是真实dom，经过babel编译成React.createElement，ReactElement 之后被react执行，从而在页面中生成真实dom
- 所有的标签属性都不是真实的dom属性，而是会被react进行处理 最终反应到真实dom身上去
    - React中的属性分为标签属性和组件属性
- react的jsx上的标签**不是真实标签**，它会被babel编译为ReactElement，ReactDom再将ReactElement转换为真实dom
- React 事件和原生的事件行为差不多，基本上原生事件能做到的事情，React 都**复刻**了一遍
- react 为了节约性能以及实现动态监听，react使用事件委托的机制
    
    假设我现在有1000个dom，与其我绑定1000个dom事件
    
    不如我给这1000个dom的父级绑定事件，给父级绑定的话 只需要绑定一个事件就ok了，event.target--—＞指向真正触发事件的元素
    
    react把事件绑定在了对应的 root 元素上，当某个真实dom触发事件以后，dom事件会随着事件冒泡 一直冒到root元素上，root元素对应的事件处理函数又可以通过
    
    event.target知道真正触发事件的元素是谁，进而执行处理
    
    那其实就意味着 对应的jsx所转化的真实dom身上不会绑定任何的真实事件，react会把jsx上所书写的**对应的和事件有关的标签属性**收集起来 找个地方**存起来**
    
    最终真实dom在页面生成，当我们点击对应的真实dom时 事件会冒泡 事件冒泡是不需要绑定真实dom事件也会冒泡的 **最终会冒泡到root 然后root来进行事件的处理**
    

### 事件池机制

> React 17以上的版本取消了事件池机制
> 
> 
> 事件池机制的本质就是保存对event的引用而不是重新创建另一个event
> 
- react里的标签属性事件 对应的event 是哪来的？？【react 捏给你的，和真实dom没有半毛钱关系】
- 在16.8以及之前的版本 react为了更好的性能考虑会尝试重用事件
- react会保存引用 只是修改对应的属性值

⚠️：

- 基于React的事件池机制，只要公司用的还是17以下的代码，都要注意**不要在异步环境下访问事件源对象的属性**，例如在调试中发现event.target===null这种情况，就要考虑是否不小心触发了事件池机制
- 使用 **e. persist()** 取消事件池机制

## 受控组件和非受控组件

> React中，受控和非受控 我们只在表单组件中去谈【因为只有表单组件才涉及到交互】
> 
> 
> 一个组件如果不涉及到交互，他就是一个渲染组件 UI 组件，不用考虑受控和非受控的问题
> 

在表单组件中，判定受控和非受控的标准是什么？【受控标签属性的植入】【标签受控展性 —也可以理解为是一个标记，出现了这个标记则该组件为受控组件]

在input里面 受控标签属性 是 value 属性

当你给input设置上value的值以后，input框里面出现什么文字 不再由用户输入说了算，而是由你的这个value值决定

所有的表单组件都分为受控和非受控：checkbox，radio

举个例子：

```js
import { useState } from "react";

export default function Test(){
  const [val,setVal] = useState("")
  const [isChecked,setIsChecked] = useState(false)
  const handleChange = (e)=>{
    console.log(e.target.value);
  }
  const handleControllChange = (e)=>{
    setVal(e.target.value)
    console.log(e.target.value);
  }

  const handleChangeCheckBox = (e)=>{
    console.log(e.target.checked);
  }
  const handleChangeControllCheckBox = e=>{
    setIsChecked(pre=>!pre)
    console.log(e.target.checked);
  }
  return (
    <>
      <section>
        <h2>非受控元素</h2>
        <input type="text" onChange={handleChange}/>
      </section>
      <section>
        <h2>受控元素</h2>
        <input type="text" onChange={handleControllChange} value={val}/>
      </section>
      <hr />
      <section>
        <h2>非受控元素</h2>
        <input type="checkbox" onChange={handleChangeCheckBox}/>
      </section>
      <section>
        <h2>受控元素</h2>
        <input type="checkbox" onChange={handleChangeControllCheckBox} checked={isChecked}/>
      </section>
    </>
  )
```

## useState

- 所有 React Hooks 都要在组件作用域的最顶层（top level）调用
    - 不能写在循环或判断语句里
- 如果你给useState传递的初始化的值是一个函数，那么他必须是一个**纯函数**
    
    纯函数：就是如果我的参数永远一致，那么我的返回值永远一致，换句话说就是函数的执行不会依赖任何其他外部因素
    
- setVal 函数在你调用以后他不会立即更新，而是在 React 的**下一次渲染阶段更新** 「commit render」
    - setVal 是异步的
    - React 会批量更新
    - imutable state 不可变状态 就是你每一次给状态擦传递的值都是不可变化的，也就意味着这个值是一次性的
        
        如果你想要变更引用类型的状态 则要传递一个新的值进去 => 拓展运算符 ... 在 数组 or 对象 里的应用
        

## useEffect

### 副作用

副作用：完全不依赖React功能的外部操作【这些外部操作不经过React的手, 但是却让对 React 产生了一些影响】

1. http请求

2. dom操作

3. 异步操作通常都会产生副作用

虽然我们不是所有的副作用操作都在useEffect里进行，但是官方建议我们尽可能的将副作用处理放在useEffect中运行

**因为副作用操作他是会产生意料之外的结果的，如果我们想更好的去追踪我们的副作用执行时机，就可以将他们都归纳进**

**useEffect里方便追踪**

不一定将所有的操作都放在useEffect里，但是如果你使用到useEffect，就一定要用他来处理副作用 不然的话不要随便用

### 参数

useEffect接受两个参数：

- setup：初始化的意思， 是一个函数
- dependencies?：依赖，必须是一个数组

主要是因为uSeEffect的执行时机决定了他的第一个参数会起名为setup

### 执行时机

useEffect的执行时机：

1. 当我们使用useEffect去注册了setup以后，React会在该组件每次挂载【挂载完毕】到页面中时都会执行对应的setup

函数，但setup函数是异步执行的 => useLayoutEffect的时候会讲

- 挂载：React将一个组件渲染到页面中的过程叫做挂载，渲染完毕叫做挂载完毕；
- vue, react的类组件有onMounted, onComponentDidMount的概念，可以先简单把没有依赖的useEffect去直接对标这些生命周期函数

2. 当依赖项发生变更的时候，useEffect会重新执行对应的setup函数

### 副作用清除

setup函数有一个返回值，这个返回值被称之为清理函数，清理函数会在组件卸载时被执行 beforeDestory

> DOM事件的绑定
> 

`import { useEffect } from "react";

export default function TestUseEffect(){
  const handleKeyDown = (e) => { console.log("keydown is called") }
  useEffect(()=>{
    document.addEventListener('keydown', handleKeyDown)
    return () => { 
      document.removeEventListener('keydown',handleKeyDown)
     }
  },[])
  return (
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
  )
}`

> 计时器
> 

`import { useEffect, useState } from "react";

export default function TestUseEffect(){
  const [tickTime, setTickTime] = useState(100)
  useEffect(()=>{
    let timer = setInterval(() => { 
      setTickTime(pre=>pre-1)
      console.log("Tick is working");
     },1000)
     return ()=>{
      clearInterval(timer)
      timer = null
     }
  },[])
  return (
    <h2>抢购剩余时间: {tickTime}s</h2>
  )
}`

### 应用场景

- 发送网络请求
- 获取真实DOM元素
- 管理依赖项（这个依赖项必须使用useState构建），当依赖项变化时，setup重新执行

## 自定义 hook

消除冗余代码 提高代码的可维护性 同时将复杂的逻辑进行内聚 减少出错的可能

### 搭建后端服务器

> server/src/index.js
> 

`const Koa = require('koa')

const koaApp = new Koa()

const PORT = 8888

koaApp.listen(PORT,() => { 
  console.log(`PORT is listening at ${PORT}`);
 })

function delay(duration=2000){
  return new Promise((resolve,reject)=>{
    setTimeout(() => { 
      resolve()
     },duration)
  })
}

koaApp.use(async (ctx) => { 
  const {path} = ctx
  if (path==='/student') {
    const data = require('./student.json')
    await delay(2000)
    ctx.response.body = data
  }
})

// 在应用程序停止运行后，自动关闭端口
process.on('SIGINT', () => {
  server.close(() => {
    console.log('应用程序已经停止运行，关闭端口！');
  });
});`

### 处理跨域请求

保持git工作树clean，之后使用yarn反编译create-react-app脚手架的webpack配置

`yarn eject`

反编译之后，在config/webpackDevServer.config.js文件中，添加如下代码

    `// `proxy` is run between `before` and `after` `webpack-dev-server` hooks
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        pathRewrite: {
          '^/api':''
        }
      }
    },`

### useRequestLoadingDispatch

> 定义
> 

`import { useState } from "react";

export default function useRequestLoadingDispatch() {
  const [loading,setLoading] = useState(false)
  const excuteRequest = async (promiseFn) => { 
    setLoading(true)
    await promiseFn()
    setLoading(false)
   }
   
   return {
    loading,
    excuteRequest
   }
}`

> 使用
> 

`import { getStudentList } from '../../request';
import { useState,useEffect } from 'react';
import StudentItem from './components/StudentItem';
import useRequestLoadingDispatch from '../../hooks/useRequestLoadingDispatcher';

export default function StudentList(){
  const [list,setList] = useState([])
  const {loading,excuteRequest} = useRequestLoadingDispatch()

  const fetchData = async ()=>{
    excuteRequest(async ()=>{
      const res = await getStudentList()
      setList(res.data)
    })
  }
  
  useEffect(() => { 
    fetchData()
   },[])

  return (
    <div>
      {
        loading ? <h2>加载ing</h2> : list.map(student=><StudentItem {...student}/>)
      }
    </div>
  )
}`

### useForceUpdate

> 强制更新
> 

`import { useState } from "react";

export default function useForceUpdate() {
  const [_,setVal] = useState({})
  const forceUpdate = ()=>{
    setVal({})
  }
  return {
    _,
    forceUpdate
  }
}`

### useWindowScrollWatcher

`import { useEffect } from "react";

export default function useWindowScrollWatcher(scrollCallback) {
  useEffect(() => { 
    document.addEventListener('scroll',scrollCallback)
    return () => { 
      document.removeEventListener('scroll',scrollCallback)
     }
   })
}`
