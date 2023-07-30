---
tag:
 - TS
---

# Quick Start

## TS和JS的区别

TS和JS的区别是，TS是JS的一个**超集**，也就是说，JS有的TS都有，而TS还有一些JS没有的特性。最大的特性就是TS提供了**类型系统**³⁵，可以在**编译时检查代码中的错误和不匹配**。而JS是一个**弱类型语言**，只能在运行时发现错误。

另外，TS还**支持ES6标准，可以编译成任意版本的JS代码**³，从而解决不同浏览器和平台的兼容问题, TS还能获得更好的代码提示

## TS中type和interface的区别

TS中type和interface的区别是一个常见的问题：

- type和interface都可以用来定义类型，但type还可以用来定义别名、联合类型、交叉类型等。
- interface可以被多次声明并合并，而type只能被声明一次。
- interface可以继承其他interface或class，而type不能继承class。
- interface更符合面向对象的思想，而type更适合函数式编程。

我来给你举几个例子。

- type可以定义别名，比如`type Name = string`，就是把string类型取一个别名叫Name。interface不能这样做。
- type可以定义联合类型，比如`type Color = 'red' | 'green' | 'blue'`，就是把三个字符串字面量类型合并成一个类型叫Color。interface不能这样做。
- type可以定义交叉类型，比如`type Person = {name: string} & {age: number}`，就是把两个对象类型合并成一个类型叫Person。interface不能这样做。
- interface可以被多次声明并合并，比如`interface Animal {name: string}`和`interface Animal {age: number}`会被合并成一个接口Animal。type只能被声明一次。
- interface可以继承其他interface或class，比如`interface Dog extends Animal {bark(): void}`或者`interface Car extends Vehicle {drive(): void}`。type不能继承class。

我再尝试解释一下:

type和interface都是用来定义类型的，但是它们有不同的用途和特点。

type更像是一个工具，它可以让你给一个已有的类型取一个新的名字，或者把多个类型组合成一个新的类型。这样可以让你写出更简洁和灵活的代码。

interface更像是一个契约，它可以让你规定一个对象或函数必须具备哪些属性或方法。这样可以让你写出更清晰和安全的代码。

type和interface之间有一些重叠的功能，比如都可以定义对象类型。但是它们也有一些互斥的功能，比如type可以定义别名、联合类型、交叉类型等，而interface可以被多次声明并合并、继承其他interface或class等。
