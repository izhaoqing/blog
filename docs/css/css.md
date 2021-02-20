# CSS note

### css3条件判断

可以通过js的方式来判断css属性是否支持，或者直接使用[Modernizr](https://modernizr.com/)库。`@media`媒体查询是一种判断方式，css3新增了`@suports`判断规则。

```css
@supports <条件> {
  /* 样式 */
}
```

条件规则可以是一个或多个由逻辑运算符`not` `and` `or`组成的声明，可以用括号确定优先级。

```css
@supports (display: flex) and (position: sticky) {
    div {
        display: flex;
        position: sticky;
    }
}

@supports not (display: flex) {
    div {
        float: left;
    }
}
```

`@supports`IE11不支持，其他浏览器支持情况还算好，[兼容性表](https://caniuse.com/#search=%40supports)。

在js中的写法是 `window.CSS.supports`。

```javascript
//检测是否支持supports
let supportsCSS = (window.CSS && window.CSS.supports) || window.supportsCSS || false;

if (supportsCSS) {
    //写法一
    let supportsFlex = CSS.supports("display", "flex");
    //写法二
    let supportsFlexAndAppearance = CSS.supports("(display: flex) and (-webkit-appearance: caret)");
}
```

### 文字换行

``` css
strong { margin-top: 20px; display: block; }
p { width: 200px; font-size: 14px; border: 1px solid #ddd; margin: 10px 0;}
.break { word-break: break-all; }
.wrap { word-wrap: break-word; }
.ell { text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
```

``` html
<strong>文字换行</strong>	
<span>word-break: break-all</span>
<p class="break">this is a looooooooooooong word !</p> <br>

<span>word-wrap: break-word</span>
<p class="wrap">this is a looooooooooooong word !</p>

<strong>文字禁止换行</strong>
<span>text-overflow: ellipsis; white-space: nowrap; overflow: hidden;</span>
<p class="ell">this is a loooooooooooooong word !</p>
```

效果图如下：

<img src='http://ww1.sinaimg.cn/large/006y8mN6gy1g78dn2s9ybj30jm0du0tx.jpg' width='400'/>

在表格中，设置单元格内容超出隐藏需要给 table 设置样式：

```css
table {
    table-layout: fixed;
}
```

### 多行文字溢出省略

```html
<div class='box'></div>
```

```css
.box {
    width: 400px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
```

[多行文字溢出点点点](http://www.zhangxinxu.com/wordpress/2009/09/%E5%85%B3%E4%BA%8E%E6%96%87%E5%AD%97%E5%86%85%E5%AE%B9%E6%BA%A2%E5%87%BA%E7%94%A8%E7%82%B9%E7%82%B9%E7%82%B9-%E7%9C%81%E7%95%A5%E5%8F%B7%E8%A1%A8%E7%A4%BA/)

### bable 文字超出隐藏

`td` 的宽度会被内容撑开，即使设置宽度为百分比也会被撑开，除非设置具体的宽度。文字较多时不会有超出隐藏的效果。可以给 `table` 设置 `    table-layout: fixed;`，`td` 不会被撑开了。

```html
<style>
    table {
        width: 200px;
        border-collapse: collapse;
    }
    .ell {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
<table border="1">
    <thead>
        <tr>
            <th>name</th>
            <th>age</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="width: 60%">
                <p class="ell">这是一段很长很长很长的文字</p>
            </td>
            <td style="width: 40%;">100</td>
        </tr>
    </tbody>
</table>
```

### css图片处理

``` css
/*毛玻璃效果*/
.blur { filter: blur(10px); }

/*黑白处理*/
.grayscale { filter: grayscale(100%); }
```

### :not()选择器

```css
li:not(:last-child) { border-right: 1px solid #ddd; }
```

### calc()

calc()类似于函数，给元素设置动态的值。

```css
.box { calc(20% + 10px); }
```

### position: sticky

`position: sticky` 是粘性定位，元素滚动到一定位置，由相对定位变成固定定位。避免监听scroll事件。只在容器内生效，如果父容器滚动到可视区外，此元素也一同滚动出可视区，它始终在父元素内，未脱离文档流。

```css
.header {
    position: sticky;
    top: 0;
}
```

### 修改palceholder样式

```css
input::-webkit-input-placeholder{
    color: #fff;
}
```

### input[search]输入框样式改写

#### 重写后面的小×样式

```css
input[type=search]::-webkit-search-cancel-button{
    -webkit-appearance: none;//此处只是去掉默认的小×
}
```

经过上面三步的重写样式，基本达到了我们需要的效果的90%，但是还没达到100%。因为第三部对小×样式的重写只是把后面的小×给弄没了，如果需要小×，还必须多做一点

#### 继续重写小×样式

```css
input[type=search]::-webkit-search-cancel-button{
    -webkit-appearance: none;

    position: relative;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: #EBEBEB;
}

input[type=search]::-webkit-search-cancel-button:after{
    position: absolute;
    content: 'x';
    left: 25%;
    top: -12%;
    font-size: 20px;
    color: #fff;
}
```

### flex 布局左边自适应右边超出省略

```html
<html>
<head>
	<title></title>
	<style type="text/css">
		.wrap {
			display: flex;
		}
		.title {
			flex-shrink: 0;

		}
		.content {
			flex: 1;
			word-break: break-all;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
	</style>
</head>
<body>
	<div class="wrap">
		<div class="title">标题：</div>
		<div class="content">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
	</div>
</body>
</html>
```

### 直接给 document`s stylesheet 增加样式

```js
document.styleSheet[0].addRule('p.active', 'color: red');
```

### 引入字体

```css
@font-face {
  font-family: 'DSDigitalBold';
  src: url('fontname.woff') format('woff'),
      url('fontname.ttf') format('truetype'),
      url('fontname.svg#fontname') format('svg');
}
.font-dsd {
  font-family: 'DSDigitalBold';
}
```

`@font-face`可以设置 `font-weight` 属性，但是设置后，`fong-weight` 样式无效。

```css
@font-face {
  font-family: 'DSDigitalBold';
  font-weight: bold;
  src: url('fontname.woff') format('woff'),
      url('fontname.ttf') format('truetype'),
      url('fontname.svg#fontname') format('svg');
}
.font-dsd {
  font-family: 'DSDigitalBold';
  font-weight: bold;
  /* 有 font-weight 这条样式，文本也未加粗 */
}
```

### pointer-events 禁止鼠标事件

```css
pointer-events: none;
```

### 禁止设置了 felx: 1 的元素被子节点撑开

```css
.parent {
  display: flex;
}
.child {
  flex: 1;
  /* 设置宽度为0在 Chrome 中有效，Firefox 中无效 */
  width: 0;
  /* 在 Chrome 和 Firefox 中都有效 */
  overflow: hidden;
}
```

### `writing-mode`文本水平或垂直排布

> [https://developer.mozilla.org/zh-CN/docs/Web/CSS/writing-mode](https://developer.mozilla.org/zh-CN/docs/Web/CSS/writing-mode)

```
horizontal-tb
```

内容从左到右水平，从上到下垂直。下一条水平线位于上一条线的下方。

```
vertical-rl
```

内容从上到下垂直流动，从右到左水平流动。下一条垂直线位于上一行的左侧。

```
vertical-lr
```

内容从上到下垂直流动，从左到右水平流动。下一条垂直线位于前一行的右侧。

### 1px边框问题

利用伪元素先放大在缩小，漏出1px的边框来实现，圆角也是支持的。

```css
.border::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  border: 1px solid red;
  /* border-left: none; */
  border-radius: 10px;
  color: red;
  height: 200%;
  transform-origin: left top;
  transform: scale(0.5);
  pointer-events: none;
  box-sizing: border-box;
}
```

### 暗色主题适配

[prefers-color-scheme 媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme) 可以作为判断，可能的值有三个：dark, light, no-preference。IE 不支持，其他主流浏览器支持良好。

```css
@media (prefers-color-scheme: dark) {
  .day.dark-scheme   { background:  #333; color: white; }
  .night.dark-scheme { background: black; color:  #ddd; }
}
```

```js
const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)'); 
// 判断是否匹配深色模式 
if (darkMode && darkMode.matches) { 
  document.body.classList.add('dark'); 
} 
// 监听主题切换事件 
darkMode && darkMode.addEventListener('change', e => { 
  if (e.matches) { 
    document.body.classList.add('dark'); 
  } else { 
    document.body.classList.remove('dark');  
  } 
});
```

