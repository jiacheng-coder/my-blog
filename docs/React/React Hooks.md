---
tag:
 - React
---

# React Hooks 

## 一、产生原因

React Hooks是React v16.8.0版本引入的新特性，它可以让我们在函数组件中使用state和其他React特性，从而避免使用类组件。

在使用React Hooks时，有一些注意事项和设计依据需要遵循。

## 二、常用 Hooks

### useState：状态定义

> 不可变状态，只能通过创建状态时提供的方法，进行状态的修改，而不能直接对状态进行赋值
> 
- useState返回的第一个参数是当前state，第二个参数是更新state的函数。
- 在useState中如果需要更新state，不能基于当前的state进行更新，而是需要使用回调函数的方式进行更新，因为useState是异步更新state的。
- 不能在条件语句中使用useState，因为条件语句在每次渲染时都会执行，如果在条件语句中使用useState，会导致state的混乱。

请记住：使用 useState 会触发组件的重新渲染。

例如：在一个组件中，引入了一个不需要改变的组件，同时使用useState定义并触发数据更改，则会造成这个被引入不必要的重渲染

### useEffect：副作用处理

- useEffect是React Hooks中用于处理副作用的钩子函数。
- useEffect会在组件渲染完成后执行，并在每次state或props发生变化时重新执行。
- 在useEffect中可以返回一个函数，这个函数会在组件被销毁时执行。

### useLayoutEffect：副作用处理

> useLayoutEffect是React提供的一个Hook函数，它和useEffect非常相似，都是用来处理副作用的，但是它们的执行时机不同。
> 

#### useEffect 执行时机

useEffect 在内容重绘到页面之后 runs，useLayoutEffect在之前 runs

useEffect的执行时机是在**DOM更新之后、浏览器绘制之后**，也就是在useLayoutEffect之后执行。这个时机适合用来处理一些不需要立即执行的副作用，比如发送网络请求、修改全局状态等。

在组件首次渲染工作完成并将真实dom生成到页面以后，将对应的回调函数推入异步队列等待执行。

#### useLayoutEffect 执行时机

useLayoutEffect的执行时机是在**DOM更新之后、浏览器绘制之前**，也就是在useEffect之前执行。这个时机非常适合用来读取DOM节点的尺寸、位置等信息，因为这些信息需要在浏览器绘制之前就要计算好，否则可能会导致页面闪烁等问题。

组件首次渲染工作完成并将真实dom生成到页面以后，将对应的回调函数推入同步队列等待执行，这意味着useLayouEffect会**完全阻塞**后续的更新工作，也就是说，组件首次渲染完成后，会立即执行useLayoutEffect的回调函数，而不用等待主线程中其他未完成的工作。

#### 总结

useLayoutEffect的原理和useEffect类似，都是通过在组件渲染时注册副作用函数，然后在组件卸载时执行清除函数来实现的。不同的是，**useLayoutEffect**会在浏览器绘制之前执行副作用函数，因此它**会阻塞浏览器的渲染过程**，可能会导致性能问题。

简单的理解就是，useLayoutEffect是立即执行，useEffect是推入异步队列，最终执行时间不确定。

因此，**一般情况下**，我们应该**优先**使用useEffect，只有在需要读取DOM节点信息时才使用useLayoutEffect。

### useMemo：计算属性

#### 产生依据

> 可以使用useMemo实现useCallback
> 

useMemo类似于Vue3的计算属性，是针对于状态的，useCallback是针对函数的。。useCallback用来缓存函数，第一个参数是一个函数，但是他的这个函数不会被React执行，而是直接进入缓存；useMemo用来缓存状态，第一个参数也是一个函数，组件初始化时这个函数会被React直接执行，然后将其返回值进行缓存，第二个参数是依赖项，当依赖项变化时，React会重新执行对应的第一个参数，然后拿到最新的返回值，再次进行缓存。

#### 参数说明

- useMemo接收两个参数，第一个参数是需要进行计算的函数，第二个参数是依赖项数组。
- 当依赖项数组中的值发生变化时，useMemo会重新执行计算函数，否则会使用上一次的计算结果。

### useCallback：优化函数性能

#### 产生依据

useCallback用于减少函数引用的创建次数。我们知道，每次组件的重新渲染都意味着内部所有的引用值都会被重新构建，每次函数组件的重新渲染都对应函数的重新执行。当不使用useCallback时，每一次状态变化，比如list或name状态变化，都会重新创建一个fetchData函数的引用，这是十分浪费性能的。实际上，fetchData函数只和url这个状态有关，当url这个状态不改变时，就不需要创建新的函数引用，因此就有了useCallback。

使用useCallback并且指定依赖项时，只有当url这个状态变化时，才会在新的时间切片里创建新的函数引用，否则就使用原先时间切片里的函数引用而无需创建新的引用。

#### 参数说明

第一个参数是函数声明，第二个参数是依赖项，当依赖项发生了变动以后，对应的函数引用会被重新生成。若依赖项为空数组表示该回调函数不依赖于任何状态或属性，只会在组件挂载时创建一次，并在整个组件的生命周期内保持不变。这种情况下，useCallback的作用类似于普通的函数定义，但是由于它是在组件内部定义的，因此可以访问组件的状态和属性。使用空数组作为依赖项数组可以避免不必要的重新创建函数，从而提高性能。

#### 注意事项

- useCallback接收两个参数，第一个参数是需要缓存的函数，第二个参数是依赖项数组。
- 当依赖项数组中的值发生变化时，useCallback会返回一个新的函数，否则会返回上一次缓存的函数。

### useRef：构建出脱离React控制的状态

#### 产生依据

useState用于构建组件状态，当状态变更的时候组件必定重新渲染；useRef出现的目的是构建一个状态出来，但是这个状态是直接脱离React控制的，也不会造成重新渲染，同时状态还不会因为组件的重新渲染而被初始化。useRef完全脱离React控制，意味着更改refInstance.current的值，不会像修改useState定义的状态一样，造成页面的重新渲染。refInstance是可以直接读写的，不需要像useState一样使用给定的方法来修改。

#### 注意事项

- useRef是React Hooks中用于获取DOM节点和存储任意值的钩子函数。
- useRef返回的是一个对象，其中current属性是一个可变的变量，可以存储任意值。
- 在函数组件中，使用useRef可以获取DOM节点的引用。

### useContext：祖孙组件传值

#### 产生依据

类似于Vue3的provide和inject，允许组件之间通过除 props 之外的方式共享数据，多用于**祖孙组件**之间的**数据传递**问题。

#### 核心实现

- useContext是React Hooks中用于获取上下文的钩子函数。
- 使用useContext可以在函数组件中获取上下文的值，避免了使用类组件中的static contextType和Consumer。

useContext 和 createContext 是 React 中用于跨组件传递数据的两个 API，通常用于全局数据管理。很多著名的库，例如 react-router, redux 都是基于 useContext 来做的；

createContext 用于创建一个上下文对象，useContext 用于在组件中获取上下文对象中的数据。

#### 使用场景

当多个组件需要共享同一个数据时，可以使用 createContext 创建一个上下文对象，并将数据传递给上下文对象。然后在需要使用数据的组件中使用 useContext 获取上下文对象中的数据。

#### 注意事项

1. 上下文对象中的数据应该是不可变的，避免直接修改上下文对象中的数据。
2. 上下文对象中的数据应该是全局共享的，避免在组件中使用 useContext 获取到的数据与其他组件不一致。
3. 上下文对象中的数据应该是简单的数据类型，避免在组件中使用 useContext 获取到的数据过于复杂。

### useReducer：加强版 useState

useReducer是React Hooks中用于管理组件状态的钩子函数。

- 接收三个参数：第一个参数是**reducer函数**，第二个参数是**初始状态**，第三个参数是**初始化行为函数**。
    - 第一个参数reducer函数接收两个参数，一个是state，一个是action（也就是dispatch函数的参数）
    - 第二个参数通常是一个对象，作为初始值
    - 第三个参数成为初始化行为，可以在此处做数据持久化的处理，详见代码示例
- 返回值：useReducer返回的是一个包含state和dispatch函数的数组。此处的dispatch可以类比理解为 useState 的 setState，不过他比 useState 具有更多的功能

下面是一个使用 useReducer 和 RooUI 实现的计数器功能，并实现了数据持久化：

```jsx
import { Button } from '@roo/roo';

const initialState = {
  name: 'Conny',
  score: 0
}
type TAction = {
  type: 'increment' | 'decrement',
  payload: number
}

const reducer = (state: typeof initialState, action: TAction) => {
  switch (action.type) {
    case 'increment':
      return {...state, score: state.score + action.payload}
    case 'decrement':
      return {...state, score: state.score - action.payload}
    default:
      return state
  }
}

const initialAction = (initState: typeof initialState) => {
  const res = localStorage.getItem('state')
  if (!!res) {
    return JSON.parse(res)
  }
  return initState
}

export default function TestUseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState, initialAction)
  useEffect(()=>{
    localStorage.setItem('state', JSON.stringify(state))
  },[state])

}
```
  

## 三、自定义 Hooks

常言道，能否书写好自定义 Hooks 是判断一个开发者是否是高级工程师的标准；在学会并理解上述常见 Hook 之后，可以将其用于业务场景中，从业务场景中抽离出可复用的逻辑，形成一套业务的 自定义 Hooks，是开发者的追求。

### useMouseMove

```jsx

```

`import { useEffect, useState } from 'react';

function useMouseMove() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event:MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
}

export default useMouseMove;`

### useDownLoadUrl

`/**
 * 从后端的通用下载接口获取模版下载信息
 * @param type
 */
 import { useCallback, useEffect, useState } from 'react';
 import { Toast } from '@roo/roo';
 import { thfDownloadTemplate } from '../services/api';

const useDownLoadUrl = (type) => {
    const [templateUrl, setTemplateUrl] = useState('');
   const fetchDownTemplate = useCallback(async () => {
       try {
           const res: any = await thfDownloadTemplate({ type });
           const { code, msg, data } = res;
           if (code === 0) {
               setTemplateUrl(data.url);
           } else {
               Toast.fail({ title: '获取模版信息' });
               setTemplateUrl('');
           }
       } catch (e) {
           Toast.fail({ title: '获取模版信息' });
           setTemplateUrl('');
       }
   }, [type]);

   useEffect(() => {
      fetchDownTemplate();
   }, []);

   return { templateUrl };
};
export default useDownLoadUrl;`

## 四、不常见Hook

### useImperativeHandle

> 参数
> 
- 第一个参数是 ref
- 第二个参数是一个函数，这个函数的返回值最终被赋值给ref.current
- 第三个参数是依赖项，依赖项不变的话，ref.current不会被赋值

### useLayoutEffect

> useEffect vs useLayoutEffect
> 

二者基本一致，只有运行机制不一样

大多业务都用 useEffect，很少用 useLayoutEffect

useEffect的运行规则：组件首次渲染工作完成并将真实dom生成到页面以后 将对应的回调函数推入异步队列等待执行

useLayoutEffect的运行规则：组件首次渲染工作完成并将真实dom生成到页面以后，将对应的回调函数推入同步队列等待执行【意味着useLayouEffect会完

全阻塞后续的更新工作，也就是说，组件首次渲染完成后，会立即执行useLayoutEffect的回调函数，而不用等待主线程中其他未完成的工作】

简单的理解就是，useLayoutEffect是立即执行，useEffect是推入异步队列，最终执行时间不确定

useLayoutEffect是React提供的一个Hook函数，它和useEffect非常相似，都是用来处理副作用的，但是它们的执行时机不同。

useLayoutEffect的执行时机是在DOM更新之后、浏览器绘制之前，也就是在useEffect之前执行。这个时机非常适合用来读取DOM节点的尺寸、位置等信息，因为这些信息需要在浏览器绘制之前就要计算好，否则可能会导致页面闪烁等问题。

useEffect的执行时机是在DOM更新之后、浏览器绘制之后，也就是在useLayoutEffect之后执行。这个时机适合用来处理一些不需要立即执行的副作用，比如发送网络请求、修改全局状态等。

useLayoutEffect的原理和useEffect类似，都是通过在组件渲染时注册副作用函数，然后在组件卸载时执行清除函数来实现的。不同的是，**useLayoutEffect**会在浏览器绘制之前执行副作用函数，因此它**会阻塞浏览器的渲染过程**，可能会导致性能问题。

因此，**一般情况下**，我们应该**优先**使用useEffect，只有在需要读取DOM节点信息时才使用useLayoutEffect。
