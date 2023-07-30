---
tag:
 - React
---

# React 基础学习

> 推荐阅读：https://juejin.cn/post/7118937685653192735
> 

## 起步

### 本质

> 在React jsx文件中每一次对组件的使用`<App />`都是在直接调用对应的组件函数
> 
- component state组件状态，实际上直接翻译过来不准确，因此应该理解为“组件数据”
- 页面渲染 === 组件执行 / 重新渲染 === 函数组件的重新执行
- 我们最终执行的代码是通过babel编译以后的代码
    
    `React. createElement("span",{},count)`--->调用document上面的一些方法去改变真实dom的显示状态
    
    count->0 如果我们想要页面里发生一点显示效果的变化，我们得让React.createElement这段代码重复执行
    
- 如果想尝试让函数组建重新渲染，只有两种方式
    - 组件状态发生变化，注意此处是指通过useState定义的状态
    - 父组件重新渲染

### 解决了什么问题

- 组件的逻辑复用
- 解决了mixins混入的数据来源不清晰，HOC高阶组件的嵌套问题
- 让函数组件拥有了类组件的特性，例如组件内的状态、生命周期等

### 理解脚手架

脚手架：在工程学里，脚手架提供了一系列预设，让施工者无需再考虑除了建造以外的其他外部问题，在编程学里，脚手架同样提供了一系列的预设，

让开发者无需再考虑除了自身业务代码以外的其他外部问题：

1. 我们要发生产环境，代码压缩，用webpack，脚手架：我直接给你集成webpack，不仅如此 我还帮你把webpack的这个配置写好了 你不用管

2. 组件化，我该怎么划分我的文件夹？？图片该放哪  我的组件又该放哪 脚手架：你别管，我也处理好了 你只需要用我这个脚手架 我直接帮你把项

目目录直接生成

3. 网络：跨域———＞浏览器他不会让你随便请求别的服务器的数据的，如果不是同域名 同协议同端口 浏览器会进行拦截 我们就要跨域，那这个时

候我们就要去搭建临时的跨域服务器，脚手架：小意思辣 你别管 我来

4. ...

### 规范

React对组件有一些要求：

1. 组件名必须大写

2. React组件必须要返回可以渲染的东西

- null
- React元素
- 组件
- 可以被迭代的对象【包括数组，set，map..】，只要一个对象具备迭代接口，那他就可以被渲染
- 状态 以及属性。

## 组件属性

函数参数是让一个函数变得更加灵活的关键，同样，组件属性是让一个组件变得更加灵活的关键，组件属性和函数参数的原理大差不差，你给组件传递属性也就是意味着你在给对应的组件函数传递参数

但凡一个组件要重新渲染，都必须是满足以下两个条件之一：

- 自身状态发生变化
- 父组件重新渲染，自身就会重新渲染✨

React中的属性分为 **标签属性** 以及 **组件属性**：

- 传递给组件的自然而然就是组件属性
- 传递给]SX的标签元素的属性就叫做标签属性【标签元素：在htmL中有明确的对标元素就叫做标签元素】，标签属性会被React自行处理对应到底层的事件或者属性
    - JSX最终都会被babel转换为React.createElement
        - 如果是标签元素，则会将对应的标签属性全部传递给React.createElement，然后React内部会自行处理
        - 如果是组件元素，他的这些组件属性会被作为参数传递给对应组件函数

## hooks分类

[https://km.sankuai.com/api/file/cdn/1728403390/43950220759?contentType=1&isNewContent=false](https://km.sankuai.com/api/file/cdn/1728403390/43950220759?contentType=1&isNewContent=false)

> 自变量
> 
- useState
- useReducer
- useContext

> 因变量，含有依赖项
> 
- useEffect ==> watchEffect
- useMemo ==> computed计算属性
- useCallback ==> 减少函数创建的次数

> 其他
> 
- useRef

## useState

在我们使用usestate的时候 【我们为什么需要使用usestate来构建状态？因为使用usestate构建的状态会返回一个更新状态的函数，当调用这个

函数去修改状态时，React会通知组件去进行重新渲染】

- 组件状态的更新是异步的【这意味着当更改状态的函数执行以后我们没有办法同步的马上得到他更新以后的值】
    
    那我如何拿到最新的状态呢？useEffect / useLayoutEffect
    

useState在调用的时候，可以给具体值，也可以给一个函数，这个函数的返回值被作为初始值，但是不推荐这种写法

为什么？✨

拿计数器Counter组件举例，

- Counter函数的重新执行意味着Counter函数内部的代码要全部执行一遍，包括useState()
- 但是useState内部对初始化操作有区分，只要不是在该函数组件内第一次调用useState，就不会进行初始化操作
- 不会进行初始化操作的意思是不会将你传递给useState的值去重新赋值，也就意味着如果你传递给useState的是一个函数，这个函数的计算只在初始化时有意义，后续函数计算的结果没有意义✨

请看一段伪代码，便于理解useState的工作原理

`function useState(initialState) {
	let state;
  if (isFirstIn) {
  	state = initialState
  }
  const dispatch = (newState)=>{
  	state = newState
    render() //重新渲染
  }
  return [state, dispatch]
}`

### 推荐写法

[state, setState] = useState(initialValue)

- initialValue写成具体值而不是一个函数
- setState(prev=>{return something})，setState函数的参数推荐写成函数的形式而不是具体值

### 总结

- 组件状态的更新是异步的，意味着当更改状态的函数执行以后我们没有办法同步的马上得到他更新以后的值，那我如何拿到最新的状态呢？useEffect / uselLayoutEffect
- usestate在调用的时候可以传递函数，也可以传递具体的值，如果传递的是函数，则会直接将函数的返回值作为初始化状态，但是虽然在初始化的时候他允许你传递函数，我们也尽量不要传递函数，因为初始化工作只会进行一次
- usestate会返回一个数组，数组里面有两个成员
    - 以初始化为值的变量
    - 修改该变量的函數，这个函数的调用会**造成函数组件的重新运行**
        - 调用该函数的时候可以直接传递一个值，也可以传递一个函数，如果你传递一个函数进去，则React会将上一次的状态传递给你，帮助你进行计算；如果你传递的是一个函数，React会将这个函数放到一个队列里等待执行，那也就是如果我们想每次都稳稳的拿到上一次的值，我们得写成一个函数
        - 推荐写成函数的形式
        - 状态的更新是批量进行的，而不是一个一个的进行，这是为了性能考虑，成为auto batching

## useEffect

### 函数副作用

副作用是相对于主作用来说的，一个函数除了主作用，其他的作用就是副作用。对于 React 组件来说，**主作用就是根据数据（state/props）渲染 UI**，除此之外都是副作用。

### 常见副作用

- 数据请求 ajax 发送手动修改 domlocalstorage 操作......useEffect 函数的作用就是为 react 函数组件提供副作用处理的！

### 案例1：useEffect(fn)

默认是全部属性的副作用都会调用该函数，很少使用

```javascript
import React, { useEffect, useState } from "react";

// 函数组件
function Sub () {
  const [count, setCount] = useState(0)
  // 例如：count 的主作用就是更换按钮中的内容，但是当需要用到它的副作用时，需要在 useEffect 函数中实现它副作用效果
  useEffect(() => {
    console.log('副作用函数调用了')
    // 副作业函数会每次数据变化都执行，默认是全部属性的副作用都会调用该函数，可以指定
    // 例如：当它初始化或变化时设置为网页标题，这就是副作业
    document.title = count
  })
  return (
    // 这是 count 的主作用
    <button onClick={() => setCount(count + 1)}>{count}</button>
  )
}

class App extends React.Component {
  render () {
    return (
      <div>
        <Sub></Sub>
      </div>
    )
  }
}

export default App
```

### 案例2：useEffect(fn,[])

只在组件首次渲染时执行一次，常用

```javascript
useEffect(() => {
    document.title = count
}, [])
```

### 案例3：useEffect(fn,[value,...])

只在首次渲染和指定的属性变动时执行，常用

```javascript
// 函数组件
function Sub () {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('dzm')
  // 指定 count/name 会有副作用回调，首次渲染也会回调
  useEffect(() => {
    console.log('副作用函数调用了')
    document.title = count
    // 此时什么时候会执行副作用函数？初始化 + count/name被修改时都会执行
  }, [count, name])
  
  // 可以写多个副作用函数
  // useEffect(() => {
  //   console.log('count 副作用函数调用了')
  // }, [count])
  // useEffect(() => {
  //   console.log('name 副作用函数调用了')
  // }, [name])
  
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <button onClick={() => setName('test')}>{name}</button>
    </>
  )
}
```

### 清理副作用✨

使用场景：在组件被销毁时，如果有些副作用操作需要被清理，就可以使用这种方式（比如常见的 定时器）。

如果想要清理副作用，可以在副作用函数中的末尾 return 一个新的函数，在新的函数中编写清理副作用的逻辑，注意执行时机为：

- 组件卸载时自动执行
- 组件更新时，下一个 useEffect 副作用函数执行之前自动执行

`import { useEffect, useState } from "react"

const App = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1)
    }, 1000)
    return () => {
      // 用来清理副作用的事情
      clearInterval(timer)
    }
  }, [count])
  return (
    <div>{count}</div>
  )
}

export default App`
