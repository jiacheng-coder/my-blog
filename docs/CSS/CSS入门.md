---
tag:
 - CSS
---

# CSS 入门

## 选择器

~: 同辈选择器
+: 相邻同辈选择器，只会选中一个dom元素

## height冲突问题

max-height和height一起使用时，取小值。min-height和height一起使用时，取大值。

三者一起使用时，当min值最小，谁在中间用谁，其余都是用min值。

## padding百分比

> padding的百分比是相对于父元素宽度，如果父元素有宽度，相对于父元素宽度，如果没有，找其父辈元素的宽度，均没设宽度时，相对于屏幕的宽度

padding的百分比的使用场景

对于PC端来说，我们可以随意设置图片的宽高，但是在移动端，随着各手持设备屏幕的宽度的不同，我们没有办法给满屏图片设置固定宽高，这时候padding就很有作用了。我们可以给图片设置固定的宽高比，也可以给图片外层加一个固定宽高比的盒子，来达到图片的自适应。

使用padding，实现元素高度为自身宽度的一半：

```html
<!doctype html>
<html>

<head>
  <style type="text/css">
    body {
      margin: 0;
    }

    /* .outer {
      width: 500px;
    } */ （有注释时padding相对于屏幕宽度，无注释时padding相对于父盒子的宽度）

    .inner {
      text-align: center;
      background: blue;
      color: #fff;
      padding: 25% 0;
      height: 0;
    }

  </style>
</head>

<body>
  <div class="outer">
    <div class="inner">A</div>
  </div>
</body>

</html>
```
