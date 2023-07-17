---
tag:
 - JS
sticky: 100
---

# JS手写

## 组合函数

简单来说，compose函数可以用来组合不同的函数，它的实现有两个要点

1. 组合函数
2. 从右→左求值

这里我使用reduce和常规递归两种方法实现compose

```jsx
// 1.组合函数
// 2.从右向左求值

const compose = (...fns) => {
  return (...args) => {
    let preResult = args
    for (let i = fns.length - 1; i >= 0; i--) {
      preResult = Array.isArray(preResult) ? fns[i](...preResult) : fns[i](preResult)
    }
    return preResult
  }
}

const test = () => {
  const add = (x, y) => x + y
  const add5 = x => x + 5
  const multiply10 = x => x * 10
  const f = compose(add5, multiply10, add)
  console.log(f(3, 3)); // 6->60->65, 输出结果：65
}
test()
```

## Curry柯里化

函数柯里化的目的是将接收多个参数的函数转换为接收单一参数的函数，并返回接受余下参数并返回结果的新函数。这样可以更方便地构建复杂的函数，也能够更好地理解和调试代码。

- 希望函数能得到最小程度的复用
- 保证最细粒度的函数调用

```
// 两种实现方式
// 方法一：返回一个函数，如果参数的长度等于要求的长度，直接调用原函数，否则返回一个新的函数等待调用
function curry(fn) {
  return function myCurry(...args) {
    if (args.length === fn.length) {
      return fn(...args);
    } else {
      return (...args2) => {
        return myCurry(...args, ...args2);
      }
    }
  }
}
// 方法二：利用闭包，递归调用自身，直到参数个数足够，再调用原函数，这段代码的可读性更好
function curry2(fn) {
  const g = (...args) => {
    if (args.length >= fn.length) return fn(...args);
    return (...args2) => {
      return g(...args, ...args2);
    }
  }
  return g
}

// 测试
function add(a, b, c) {
  return a + b + c;
}
let curriedAdd = curry2(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6

```

**代码解析：**

- `curry`: 实现柯里化的第一种方式，返回一个函数，如果传入的参数个数等于原函数的参数个数，就直接调用原函数，否则返回一个新的函数等待调用。
- `curry2`: 实现柯里化的第二种方式，利用闭包，递归调用自身，直到传入的参数个数足够，再调用原函数。
- `add`: 一个简单的加法函数，用于测试柯里化的效果。
- `curriedAdd`: 将 `add` 函数柯里化之后得到的新函数，可以将其看作是一个接受 1 个参数的函数，每次调用返回一个新的接受 1 个参数的函数，直到传入的参数个数足够，最终调用 `add` 函数。

**关键位置解析：**

- 在 `curry` 中，如果传入的参数个数等于原函数的参数个数，就直接调用原函数；否则返回一个新的函数等待调用。
- 在 `curry2` 中，返回一个函数 `g`，每次调用 `g` 都会检查传入的参数个数是否达到要求，如果达到要求直接调用原函数，否则返回一个新的函数等待调用。
- 在 `curriedAdd` 中，每次调用返回一个新的接受 1 个参数的函数，直到传入的参数个数足够，最终调用 `add` 函数计算结果，并返回结果。

## 实现setTimeout

```
// 用setTimeout代替setInterval实现定时任务
function mySetTimeout(func, delay, ...args) {
  //setInterval会一直执行，但是在setInterval里面执行clearInterval()将会被清除
  const timer = setInterval(() => {
    func(...args)
    clearInterval(timer)
  }, delay)
}
function add(a, b) {
  console.log(`a+b=${a + b}`);
}
// 在1秒后执行add函数，并传入2和3作为参数
const timer_test = mySetTimeout(add, 1000, 2, 3)

```

**代码解析：**

- `mySetTimeout`: 自定义的定时任务函数，用于在指定的延时后执行回调函数
- `func`: 回调函数，会在指定的延时后执行
- `delay`: 延时时间，单位为毫秒
- `args`: 回调函数的参数，可以传入任意个数的参数
- `timer`: 定时器对象，用于清除定时任务

**关键位置解析：**

- 在 `setInterval` 中执行 `clearInterval`，因为 `setInterval` 会一直执行，而 `clearInterval` 只能在定时器回调函数中执行，否则会被清除。
- 在 `setInterval` 中调用 `func(...args)` 执行回调函数，并在回调函数执行完毕后清除定时器，以实现定时任务的功能。
- 在最后一行代码中，调用 `mySetTimeout` 函数，传入回调函数 `add` 和延时时间 `1000`，并传入 `2` 和 `3` 作为回调函数的参数，从而实现在 1 秒后输出 `a+b=5` 的功能。

## 数组flatten

```
/**
 * 数组扁平化
 * @param {Array} arr 需要扁平化的数组
 * @returns {Array} 扁平化后的数组
 */

const flat = (arr) => {
  let res = []
  for (let item of arr) {
    if (Array.isArray(item)) {
      res = res.concat(flat(item))
    } else {
      res.push(item)
    }
  }
  return res
}

function flatten(arr) {
  if (!Array.isArray(arr)) return arr
  return [].concat(...arr.map(flatten))
}

// 测试
const arr = [1, 2, [3, 4, [5, 6, [{ name: 'Lucy' }]]]]
console.log(flat(arr))[1, 2, 3, 4, 5, 6, { name: 'Lucy' }]
```

**代码解析：**

- `flat`: 数组扁平化函数，递归遍历数组，并将扁平化后的元素添加到新的数组中。
- `arr`: 需要扁平化的数组。
- `res`: 扁平化后的数组。
- 遍历数组 `arr`，如果当前元素是数组，就递归调用 `flat` 函数，否则将当前元素添加到 `res` 数组中。
- 最终返回 `res` 数组，即为扁平化后的数组。

## 防抖

防抖的主要思想是将一定时间内的多次操作合并为一次，只触发一次函数执行。

```
// 第一个参数是需要进行防抖处理的函数，第二个参数是延迟时间，默认为1秒钟
function debounce(fn, delay) {
  let timer = null
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

const btn = document.querySelector('#btn')
const handleClick = () => {
  console.log('按钮点击');
}
btn.addEventListener('click', debounce(handleClick, 1000))
```

- `func` 是需要执行的函数。
- `delay` 是防抖时间，单位为毫秒。
- `timer` 是计时器 ID，用于取消计时器。

## 节流

节流的主要思想是连续触发事件时，只在规定时间间隔内执行一次函数。

```
// 第一个参数是需要进行节流处理的函数，第二个参数是间隔时间，默认为1秒钟
function throttle(fn, interval = 1000) {
  let flag = true // flag变量用于标记是否可以执行fn
  return (...args) => {
    // 如果flag为false，说明已经有定时器在执行fn了，直接返回
    if (!flag) return
    flag = false
    setTimeout(() => {
      flag = true
      fn(...args)
    }, interval)
  }
}

const handleScroll = () => {
  console.log(window.scrollY);
}
window.addEventListener("scroll", throttle(handleScroll, 2000));
```

- `func` 是需要执行的函数。
- `delay` 是节流时间，单位为毫秒。
- `flag` 是计时器 ID，用于判断是否需要执行函数。
