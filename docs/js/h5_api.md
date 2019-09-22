# H5新增API

### 选择器

`querySelector()`和`querySelectorAll()`，参数都是`css`选择器，前者返回符合条件的第一个匹配的元素，如果没有则返回`Null`，后者返回符合筛选条件的所有元素集合，如果没有符合筛选条件的则返回空数组。

`getElementsByClassName()`返回一个类似数组的对象，包含了所有指定 `class` 名称的子元素。当调用发生在document对象上时, 整个DOM都会被搜索, 包含根节点，也可以在任意元素上调用。

```javascript
document.querySelector('div');     //选择第一个div
document.body.querySelector('p')[0];   //body下第一个p标签

document.getElementsByClassName('red test');
//获取所有 class 同时包括 'red' 和 'test' 的元素
```

### classList属性

+ **length**: 返回`class`数量。
+ **add**(class1, class2, ...):将给定的字符串值添加到列表中。如果值已经存在，就不添加了。
+ **contains**(class):表示列表中是否存在给定的`value`值，如果存在则返回`true`，不存在则返回`false`。
+ **remove**(class1, class2, ...):移除元素中一个或多个类名，移除不存在的类名不会报错。
+ **item**(index):返回指定索引值的类名，`index`为数字(从0开始)，索引不在范围内返回`null`，不为数字会被转成数字类型再取整数部分，若转换失败返回第一个类名。
+ **toggle**(value,true || false):将值为`value`的`class`在添加和移除之间切换。

classList 属性返回的是一个 `DOMTokenList` 对象。此属性不兼容IE10以下版本。

```js
Object.prototype.toString.call(node.classList);   
//'[object DOMTokenList]'
```

相对应 `className` 属性，可以设置或返回元素的 class 。返回的是字符串类型，设置会把原来的 class 值完全覆盖。语法：`node.className = className`。

```js
<div class='wrap box'></div>

let oDiv = document.querySelector('div');
console.log(oDiv.className);   //'wrap box'
oDiv.className = 'class1';
console.log(oDiv.className);   //'class1'
```

### data属性

新的HTML5标准允许在普通的元素标签里，嵌入类似`data-*`的属性，来实现一些简单数据的存取。它的数量不受限制，并且也能由`js`动态修改，也支持`CSS`选择器。

用`getAttribute`、`setAttribute`存取`dataset`。

```html
<div data-id='10' data-name='box'></div>
<script
	node.getAttribute('data-id');
	node.setAttribute('data-name','test');
</script>
```

通过`.dataset` API 存取`dataset`。它返回一个对象，可以通过`node.dataset.name`的形式新增或修改。

```javascript
node.dataset.name = 'test';
```

### 内容可编辑

加有`contenteditable`属性的元素，点击可以编辑。此属性为[布尔属性](https://github.com/chingchao/web-note/blob/master/js/checked.md#%E5%B8%83%E5%B0%94%E5%B1%9E%E6%80%A7)。

```html
<div contenteditable=true>
    <p>i am editable</p>
    <p>i am editable too</p>
</div>
```

### 本地存储

`localStorage` `sessionStorage`。[Javascript本地存储小结](https://segmentfault.com/a/1190000007506189)。

### scrollIntoView()

`Element.scrollIntoView()` 方法让当前的元素滚动到浏览器窗口的可视区域内。[scrollIntoView MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)

参数为一个布尔值，为`true`，元素的顶端将和其所在滚动区的可视区域的顶端对齐；如果为`false`，元素的底端将和其所在滚动区的可视区域的底端对齐。

```js
element.scrollIntoView(); // 等同于element.scrollIntoView(true)
```






