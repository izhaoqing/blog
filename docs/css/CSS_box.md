## CSS盒模型

### 标准模型IE模型

标准模型`width`表示`content`的宽度，IE模型`width`表示`border+padding+content`的宽度。

设置这两种模型可使用：

```css
box-sizing: content-box;   /*浏览器默认*/
box-sizing: border-box;
```

### 获取宽高

```javascript
dom.style.width/height
```

只有通过内联样式设置的宽高才能获取到，用`<link>`标签引入的`css`获取不到。

```javascript
dom.currentStyle.width/height  //IE
window.computedStyle(dom).width/height  //标准
```

无论样式是什么类型，都可以获取到宽高，且是渲染后的实际宽高。

```javascript
dom.getBoundingClientRect().width/height
```
获取元素的宽高，和相对于视口的`lfet` `top`。

### 边距重叠

子元素的外边距会反应在父元素上，相邻元素外边距会取较大值，空元素上下外边距会取较大值。

### BFC

`BFC`指块级格式化上下文，是一个有特别规则的区域，规定内部元素如何布局，与外部元素无关。

1.`BFC`有一下几个规则：     

+ 内部上下相邻元素外边距会重叠。
+ `BFC`块不会与浮动元素重叠。
+ 内部浮动元素也参与`BFC`高度的计算。

2.`BFC`的触发：

+ float属性不为none；
+ position: absolute/fixed；
+ overflow: auto/hidden；
+ display: inline-block、table-cells、table-captions、或inline-flex

### BFC应用

1.解决边距重叠问题

```html
<style>
    div { overflow: auto; }
    p { margin: 5px auto 10px; }
</style>
<div>
    <p></p>
</div>
```

> 使`div`触发`BFC`，内部元素外边距不会反映到父级元素上。

```html
<style>
    .wrap { overflow: auto; }
    p { margin: 5px auto 10px; }
    .bfc { overflow: auto; }
</style>
<div class='wrap'>
    <p></p>
    <div class='bfc'>
        <p></p>
    </div>
</div>
```

> 两个`<p>`标签都有上下外边距，给`<p>`标签加父级，且触发`BFC`，外边距不会在重叠。

2.清除浮动

```html
<style>
    div { overflow: auto; }
    p { float: left; }
</style>
<div>
    <p></p>
</div>
```

> 使`div`触发`BFC`，内部浮动元素元素也参与高度计算。




