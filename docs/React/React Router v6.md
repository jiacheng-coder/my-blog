---
tag:
 - React
---

# React Router v6

## 快速复习

- BrowerRouter
- NavLink vs Link (可以传递参数)
- Routes && Route
- useNavigate 强制路由跳转
- Link && Navigate && useNavigate 通过 state 传递状态，通过 useLocation 接收
- 通过 useParams 接收 URL 参数

## 一、概述

### 如何安装

`pnpm add react-router-dom@6`

### 概念

- react-router：为 React 应用提供了路由的核心功能；
- react-router-dom：基于 react-router，加入了在浏览器运行环境下的一些功能。

## 二、基本使用

### BrowserRouter

要想在 React 应用中使用 React Router，就需要在 React 项目的根文件（index.tsx）中导入 Router 组件

```javascript
import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  《StrictMode》
    《BrowserRouter》
      《App /》
    《/BrowserRouter》
  《/StrictMode》
)
```

BrowserRouter 是最常用的路由方式，即浏览器路由。官方文档也建议将 BrowserRouter 组件用于 Web 应用程序。除了这种方式，React Router 还支持其他几种路由方式：

- HashRouter：在路径前加入#成为一个哈希值，Hash 模式的好处是不会因为刷新页面而找不到对应路径；
- MemoryRouter：不存储 history，路由过程保存在内存中，适用于 React Native 这种非浏览器环境；
- NativeRouter：配合 React Native 使用，多用于移动端；
- StaticRouter：主要用于服务端渲染时。

### NavLink

NavLink 组件，它是一个导航链接组件，类似于 HTML 中的《a》标签。NavLink 组件使用 to 来指定需要跳转的链接，在TSX中代码如下：

`《NavLink to="product"》产品《/NavLink》`

NavLink 是存在 active 状态的，所以可以为active 状态和非active 状态的导航链接添加样式：

```javascript
import { NavLink } from "react-router-dom";
import "./styles.css";

export default function App() {
  return (
    《div className="App"》
      《header》
        《h1》Hello World《/h1》
      《/header》
      《nav》
        《NavLink
    			to=""
          className={({ isActive }) =》 isActive ? "nav-active" : void 0}
        》
          首页
        《/NavLink》
        《NavLink to="product"》产品《/NavLink》
        《NavLink to="about"》关于《/NavLink》
      《/nav》
    《/div》
  );
}```

### Link🌟

Link 组件与 NavLink 组件非常相似，唯一的区别就是 NavLink 存在 active 状态，而 Link 没有。

如果需要对 Link 进行更多控制，也可以传递给 to 一个对象，在这个对象中，可以通过 search 属性来添加查询字符串或通过 hash 属性来传递 hash值，例如：

```javascript
import { Link } from "react-router-dom";
import "./styles.css";

export default function Settings() {
  return (
    《div className="settings"》
      《header》
        《h1》Hello World《/h1》
        《Link
          to={{
            pathname: "/settings",
            search: "?sort=date",
            hash: "#hash"
          }}
        》
          设置
        《/Link》
      《/header》
    《/div》
  );
}
```

此时路由就变成了 /settings?sort=date#hash

### Routes

在 Routes 组件中使用 Route 组件来定义所有路由。该组件接受两个 props：

- path：页面 URL 应导航到的路径，类似于 NavLink 组件的 to；
- element：页面导航到该路由时加载的元素。

```javascript
import { NavLink, Routes, Route } from "react-router-dom";
import Product from "./Product";
import About from "./About";
import Home from "./Home";
import Error from "./Error";
import "./styles.css";

export default function App() {
  return (
    《div className="App"》
      《header》
        《h1》Hello World《/h1》
      《/header》
      《nav》
        《NavLink to=""》首页《/NavLink》
        《NavLink to="product"》产品《/NavLink》
        《NavLink to="about"》关于《/NavLink》
      《/nav》
      《Routes》
        《Route path="/" element={《Home /》} /》
        《Route path="/product" element={《Product /》} /》
        《Route path="/about" element={《About /》} /》
        《Route path="*" element={《Error /》} /》
      《/Routes》
    《/div》
  );
}
```

### 路由顺序

在 React Router v6 以前，我们必须按照一定的顺序来定义路由，以获得准确的渲染。在 v6 及之后的版本中，路由定义的顺序无关紧要。

v5中，/product/new 会匹配到 Product 组件

```
《Switch》
  《Route path="/product/:id" component={Product} /》
  《Route path="/product/new" component={NewProduct} /》
《/Switch》
```

v6 中，将 《Switch》 组件替换为了 《Routes》 组件。/products/new将匹配这两个路由，但只会渲染NewProduct组件，因为它是更具体的匹配：

```
《Routes》
  《Route path="/product/:id" element={《Product /》} /》
  《Route path="/product/new" element={《NewProduct /》} /》
《/Routes》
```

## 三、编程式导航

React Router 提供了两种不同的编程式导航方式：

- **声明式导航组件**：《Navigate》 组件
- **命令式导航方法**：useNavigate Hook

可以使用这两种编程的方式来跳转到指定的路由，也可以实现路由的重定向，比如在浏览器的地址栏输入一个 URL 并进行跳转时，如果应用中没有定义该路由，就跳转到应用的首页。

### Navigate

和 Navlink 类似，Navigate 组件中通过 to props 来指定要跳转的路径。

```javascript
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import Product from "./Product";
import About from "./About";
import Home from "./Home";
import "./styles.css";

export default function App() {
  return (
    《div className="App"》
      《header》
        《h1》Hello World《/h1》
      《/header》
      《nav》
        《NavLink to=""》首页《/NavLink》
        《NavLink to="product"》产品《/NavLink》
        《NavLink to="about"》关于《/NavLink》
      《/nav》
      《Routes》
        《Route path="/" element={《Home /》} /》
        《Route path="product" element={《Product /》} /》
        《Route path="about" element={《About /》} /》
        《Route path="*" element={《Navigate to="/" /》} /》 // 看这里
      《/Routes》
    《/div》
  );
}```

这样，当在浏览器地址栏输入一个未定义的路由时，就会跳转到首页。

### useNavigate🌟

1. 导入 Hook
2. 创建实例
3. 在函数中进行使用

```
import { useNavigate } from 'react-router-dom

function Register () {
  const navigate = useNavigate()

  return (
    《div》
      《Form afterSubmit={() =》 navigate('/')} /》 // 提交完表单之后，跳转到主页
    《/div》
  )
}
```

## 四、通过路由传递状态

在 react-router-dom 中可以通过以下三种方式来传递状态，它们的传递方式有区分：

- 使用 Link 组件
- 使用 Navigate 组件
- 使用 useNavigate 钩子

但它们在页面中的获取方式相同，都是通过 **useLocation** 钩子来**获取状态**

### Link && useLocation

Link 组件通过 state props 来将数据从产品页面传递到主页

`《Link to="/" state={"From Product"}》返回《/Link》`

使用一个名为 **useLocation** 的钩子来获取数据

```
import { useLocation } from "react-router-dom"; // 1.导入 Hook
import "./styles.css";

export default function Settings() {
  let location = useLocation(); // 2.定义实例
  return (
    《div className="App"》
      《header》首页《/header》
      《p》{location.state}《/p》 // 3.页面中使用
    《/div》
  );
}
```

### Navigate

Navigate 组件也是通过state属性传递状态， 在页面中也是通过useLocation获取状态

`《Route path="/about" element={《Navigate to="/" state={"From About"} /》} /》`

### useNavigate

使用useNavigate钩子创建的navigate函数有两个参数

第一个是 跳转路由， 第二个是包含状态的对象

```javascript
import { useNavigate } from 'react-router-dom

function Register () {
  const navigate = useNavigate()

  return (
    《div》
      《Form afterSubmit={() =》 navigate('/', { state: "From the About Page"})} /》 // 包含state状态的对象
    《/div》
  )
}
```

在首页中仍然是使用 useLocation 钩子来获取状态值

## 五、动态路由

声明一个带有 keyword 占位符的路由即可。对于上面的例子，只需要将 Route 组件的 path props 声明为这样

`《Route path="/wiki/:keyword" element={《Wiki /》} /》`

如何在组件中访问 URL 中的动态部分呢 -》 使用 **useParams** 钩子

```javascript
import React from 'react'
import {useParams} from 'react-router';

function Wiki() {
  const { keyword } = useParams()
  
  return (
    《div》{ keyword }《/div》
  )
}
```

## 六、嵌套路由

使用 Outlet 配置嵌套路由

### 固定 navbar, 更换 main

````
const Layout = () =》 {
  return (
    《》
      《Navbar /》
      《Outlet /》
      《Footer /》
    《/》
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: 《Layout /》,
    children: [
      {
        path: "/",
        element: 《Home /》,
      },
      {
        path: "/post/:id",
        element: 《Single /》,
      },
      {
        path: "/write",
        element: 《Write /》,
      },
    ],
  },
  {
    path: "/register",
    element: 《Register /》,
  },
  {
    path: "/login",
    element: 《Login /》,
  },
]);
```

### 展示 messages

```javascript
function App() {  
  const router = createBrowserRouter([
    {
      path: "/",
      element: 《Home /》,
    },
    {
      path: "/messages",
      element: 《Messages /》,
      children: [
      	{
    			path: ':id',
      		element: 《MessagesDetails /》
    		}
      ]
    },
  ]);
  return (
    《div className="App"》
      《RouterProvider router={router} /》
    《/div》
  );
}
```

这里
```javascript
import { Outlet } from "react-router-dom";

function Messages() {
  return (
    《div》
      《Conversations /》
      《Outlet /》 // 路由为messgaes/id时，会在此渲染 MessagesDetails 组件
    《/div》
  );
}
```

## 七、查询参数

React Router 提供了一个自定义的 useSearchParams Hook，它是基于 URLSearchParams 进行的封装。useSearchParams 返回一个数组，该数组第一个元素是 URLSearchParams 的实例，第二个元素是更新查询参数的一个方法。

`import { useSearchParams } from 'react-router-dom'

const Results = () =》 {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q')
  const src = searchParams.get('src')
  const f = searchParams.get('f')

  return (
    // ...
  )
}`

如果需要更新查询字符串，可以使用 setSearchParams，向它传递一个对象，该对象的key/value 对将作为 &key=value 添加到 url：

`const Results = () =》 {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q')
  const src = searchParams.get('src')
  const f = searchParams.get('f')

  const updateOrder = (sort) =》 {
    setSearchParams({ sort })
  }

  return (
    ...
  )
}`

## 八、路由配置

在 v5 中，通常使用 createBrowserRouter 来创建 router 示例，再把 router 实例作为参数传递给 《RouterProvider router={router} /》

在 v6 中，可以使用 useRoutes 钩子，直接将路由渲染到页面中

`export default function App() {
  return (
    《div》
      《Navbar /》
      《Routes》
        《Route path="/" element={《Home /》} /》
        《Route path="/invoices" element={《Invoices /》}》
          《Route path=":id" element={《Invoice /》} /》
          《Route path="pending" element={《Pending /》} /》
          《Route path="complete" element={《Complete /》} /》
        《/Route》
      《/Routes》
    《/div》
  );
}`

`import { useRoutes } from "react-router-dom";

const routes = useRoutes([
  { path: "/", element: 《Home /》 },
  {
    path: "/invoices",
    element: 《Invoices /》,
    children: [
      { path: ":id", element: 《Invoice /》 },
      { path: "/pending", element: 《Pending /》 },
      { path: "/complete", element: 《Complete /》 },
    ],
  },
]);

export default function App() {
  return (
    《div》
      《Navbar /》
      {routes}
    《/div》
  );
}`
