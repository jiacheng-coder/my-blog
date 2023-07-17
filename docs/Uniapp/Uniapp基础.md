---
tag:
 - Uniapp
---

# uniapp基础

## 生命周期

## 应用生命周期

在`App.vue`文件中使用, 主要包括onLaunch, onShow和onHide

- `onLaunch` - 初始化完成时出发, 全局仅一次
- `onShow ` - 启动时 / 从后台进入前台
- `onHide`- 从前台进入后台
- `onError` - 报错时触发
- `onUniNViewMessage` - 对nvue页面发送的数据进行监听

### 页面生命周期

在`pages`目录中使用, 主要包括onLaunch, onShow和onHide, 以及onReady

- `onLoad` - 监听页面加载, 参数为上个页面传递的参数
- `onShow` - 页面显示, 页面每次出现在屏幕上都触发, 包括从下级页面返回当前页面
- `onHide` - 页面隐藏
- `onReady` - 页面初次渲染完成, 注意如果渲染速度快, 会在页面进入动画完成前触发
- `onUnload` - 页面卸载
- `onPullDownRefresh` - 下拉刷新

> 针对特定端, 还有额外生命周期

- 百度小程序
  - `onInit` - 监听页面初始化, 参数同onLoad参数, 为上个页面传递的数据
- `App, 微信小程序, 快手小程序` 
  - `onResize` - 监听窗口尺寸变化

### 组件生命周期

在`components`目录中使用, 主要包括created, mounted

- beforeCreated
- created
- beforeMounted
- mounted
- beforeUpdate - 仅H5平台
- updated - 仅H5平台

## rpx和scoped

rpx

- 可以在pages.json下新增rpxCalcBaseDeviceWidth和rpxCalcMaxDeviceWidth字段来控制页面宽度计算方式
- 仅支持H5和App端

scoped

- uniapp通过条件编译的方式, 自动为H5端增加`scoped`, 解决样式冲突问题
- 小程序端由于其天然的多页面属性, 不需要此设置, 会在编译时跳过

## 条件编译

通过特定的语法, 以及指定的平台名称, 可以在**js, css, ts, html,** 甚至是**static目录**中实现条件编译, 十分方便

```css
  /* #ifdef APP-PLUS-NVUE */
  .gui-icons {
    font-family: graceIconfont;
  }
  /* #endif */
```

同样, 也可以实现整体目录条件编译:

在根目录下创建`platforms`目录, 然后进一步创建`app-plus`,`mp-wexin`等子目录, 用来存放不同平台的文件

## css变量

- `--status-bar-height`
  - 小程序里使用
  - 系统状态栏高度
  - pages.json里设置`"navigationStyle": "custom"`时使用
- `--window-top`
  - H5页面使用
  - 内容区域距离顶部的距离
  - `NavigationBar`的高度
- `--window-bottom`
  - H5页面使用
  - 内容区域距离底部的距离
  - `tabBar`的高度
