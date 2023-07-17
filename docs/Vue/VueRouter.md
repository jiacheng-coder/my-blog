---
tag:
 - Vue3
---

## 路由跳转问题与解决

在第四届青训营项目-仿掘金官网的搭建中, 我们遇到了滑动滚动栏之后跳转到新页面, 会导致新页面初始化时的滚动条与上一个页面相同的情况.

基于这种情况, 我们发现是在之前运行的代码中, 使得浏览器记录下了滚动条信息, 因此, 我们通过实用scrollBehavior方法, 判断点击事件是否导致了浏览器的前进/后退, 进而对savePosition参数进行归零处理, 使得滚动条在每一个页面的初始形式都是保持置顶状态

> 在router中具体配置的代码如下

```
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  //路由跳转滚动问题
  //scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});
```

## 路由变化后修改页面标题

> 我们通过调用路由的beforeEach方法, 较为容易的实现了路由变化后修改页面标题的需求

代码如下

```
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
```

## 解决 Vue 重复点击相同路由

为了解决重复点击相同路由出现的卡顿现象, 我们直接修改了Vuerouter的prototype里的push方法, 达到了效果

```
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};
```

## 数据来源与接口

后端接口方面, 我们讨论后决定使用apifox来mock数据, 这个自动化生成数据的网页极大的降低了我们的开发难度, 只需中api文件夹中配置request.js文件即可使用, 内容如下

```
import axios from "axios";

const server = axios.create({
  baseURL: "https://mock.apifox.cn/xxx",
  timeout: 3000,
});

function get(url, params) {
  return new Promise((resolve, reject) => {
    server
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function post(url, params) {
  return new Promise((resolve, reject) => {
    server
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default {
  get,
  post,
};
```

