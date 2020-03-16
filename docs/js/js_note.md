# JavaScript note

## 布尔值相关

```javascript
Object.prototype.toString.call(new Boolean())   //[object boolean]
Object.prototype.toString.call(true)            //[object boolean]
typeof(new Boolean())                           //object
typeof true                                     //boolean

true == new Boolean(true)                       //true
true === new Boolean(true)                      //false
```

```JavaScript
[]==false     //true
[]===false    //false
{}==false     //false
[]==0         //true
[]===0        //false
[1]==[1]      //false

```

> `[]`,`{}` 自身都为 `true`;        
> 两者都为对象时，如果引用不同，无论值是否相同都不等。   
> `Number([])===0` `Number([0])===0` `Number([3])===3` `Number(false)===0`


```JavaScript
Number([x]) === Number(x)
//传入x的值为一个数字或字符串类型的数字，返回值为数字类型的x。

```

### Object.is()

[Object.is(v1, v2)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 用于比较传入的两个值是否相等。它和 `==`不同，不会做隐式转换。和 `===` 也不同，不会将 `-0` 和 `+0` 视为相等，会将`NaN` 和 `NaN` 视为相等。

```js
Object.is(-0, +0);   //false;
-0 === +0;   //true;

Object.is(NaN, NaN);  //true;
NaN === NaN;    //false;
```

## 数组相关

### 复制数组

```js
let arr1 = [1,2,3];
let arr2 = [...arr1];

let arr3 = arr1.concat();

let arr4 = JSON.parse(JSON.stringify(arr1));
```

### 将类数组转成数组

数据类型为`object`，具有`length`属性，可以通过索引获取元素，但不具有数组的方法，称为类数组。如函数的`arguments`, `{'1':'a','2':'b',length:2}`。

```JavaScript
var arr = Array.prototype.slice.apply(arguments);
var arr = Array.prototype.concat.apply([], arguments);
var arr = Array.apply([], arguments);
var arr = [];
for(var i=0,len=arguments.length;i<len;i++){
    arr.push(arguments[i]);
}
var arr = [...arguments]; //无iterable遍历接口的类数组无效
var arr = Array.from(arguments);
```

## try catch finally

``` javascript
try{

} catch(e) {

} finally{
    //不管try，catch谁执行，finally都会执行。
    //try，catch中有return，break，throw等，finally也会执行，且可以覆盖。
}
```

## 事件相关

```javascript
obj.onClick = function (e) {
    let e = e || window.event;   //兼容ie
}
```

### `event`对象

`event`对象属性/方法：

| 属性 | 说明 |
| --- | --- |
| target | 返回触发此事件的元素（事件的目标节点） |
| currentTarget | 绑定事件的元素 |
| clientX | 鼠标指针的水平坐标 |
| clientY | 鼠标指针的垂直坐标 |
| type | 事件名称 |
| preventDefault() | 阻止默认行为 |
| stopPropagation() | 阻止冒泡和捕获 |
| stopImmediatePropagation() | 阻止同类型事件的监听函数执行 |

> 如果某个元素有多个相同类型事件的事件监听函数,则当该类型的事件触发时,多个事件监听函数将按照顺序依次执行.如果某个监听函数执行了 `event.stopImmediatePropagation()`方法,则除了该事件的冒泡行为被阻止之外(`event.stopPropagation`方法的作用),该元素绑定的后序相同类型事件的监听函数的执行也将被阻止。   

```javascript
let oUl = document.querySelector('ul');
oUl.onclick = function (e) {
    e.target          //oUl或通过冒泡触发其点击事件的元素
    e.currentTarget   // oUl
}
```

IE浏览器属性：

| 属性 | 说明 |
| --- | --- |
| cancelBubble | 阻止冒泡 |
| offsetX,offsetY | 发生事件的地点在事件源元素的坐标系统中的 x 坐标和 y 坐标 |
| srcElement | 对于生成事件的 Window 对象、Document 对象或 Element 对象的引用 |

### 事件捕获

事件捕获是事件流的一种，表示事件执行顺序，捕获的顺序是`window` > `document` > `html` > `body` > `dom`。[事件冒泡和捕获](https://segmentfault.com/a/1190000005654451)。 
​    
`addEventListener()`的第三个参数默认`false`表示在冒泡阶段调用事件函数，为`true`时表示在捕获阶段调用事件函数。

### 自定义事件

自定义事件可以通过`Event`，或者`CustomEvent`构造，后者可以传递参数。

```javascript
let ev = new Event('test');       
obj.addEventListener('test', fn);  //监听
obj.dispatchEvent(ev);             //触发
```

```javascript
let ev = new CustomEvent('test', {ditail: {}});       
obj.addEventListener('test', function (e) { e.detail });  //监听
obj.dispatchEvent(ev);             //触发
```

### 事件代理封装

```html	
<div>
    <button>确定</button>
</div>
```

```js
function bindEvent (ele, type, selector, fn) {
    if (!fn) {
        fn = selector;
        selector = null;
    }
    ele.addEventListener(type, function (e) {
        if (selector) {
            if (e.target.matches(selector)) {
                fn.call(e.target, e);
            }
        } else {
            fn(e);
        }
    }, false);
};

let div = document.querySelector('div');
bindEvent(div, 'click', 'button', function (e) {
    console.log(e);
    console.log(this);
})
```

`e.target.matches(selector)` 用于匹配节点。

## 函数配置项

```javascript
function fn (a,{opt1=1, opt2=2}={}) {
    console.log(opt1+opt2);  //7
}
fn('a', {opt1: 3, opt2: 4});
```

## delete

`delete`操作符可以从对象中删除属性，对变量和函数名无效。删除的属性不会释放内存，只是中断对象的引用。

```javascript
delete object.property;
delete object[property];
```

## exec()

正则表达式的匹配结果。

```javascript
let reg = /(\d{4})-(\d{2})-(\d{2})/;
reg.exec('1994-11-10');   //["1994-11-10","1994","11","10"]
```

## 判断微信浏览器

```js
const isWx = () => navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
```

## replace

第二个参数为函数的情况，会遍历匹配到的值，传给回调函数。

```js
'hello world'.replace(/h|w/g, item => {
    return item.toUpperCase()
})
// Hello World
```

## img onLoad 事件

图片加载事件，图片加载后会撑开页面的高度，如果不预先设置高度，可以在 load 事件中做处理，比如需要重新计算父级高度等操作。

```html	
<img onLoad='fn' src=''/>
```

## 向下取整

```js 
let n = 1.2;
Math.floor(n)  // 1
n | 0  // 1
```

## 通过ID计算得到一个 < 200 的随机数

```js
yun5.readCount = (id, num = 0) => {
    if (isNaN(Number(num)) || Number(num) > 40) return num;
    let count = Number(id);
    if (!count) return num;

    let powNum = 0;
    if (count < 10) {
        powNum = Math.pow(2, count);
    } else {
        if (count > 2000) count = Number((id % 999 + 19 + '').slice(0, 3));
        powNum = Math.pow(1.3, count);
    }

    let str = powNum + '';
    let numLength = count % 7 === 0 ? 2 : 3;
    let num0 = str.split('.')[0].slice(0, numLength);
    let num1 = (str.split('.')[1] || '').replace(/^0*/, '').slice(0, numLength);

    if (num0.length > 1 && num0.length < numLength + 1) {
        count = Number(num0);
    } else if (num1.length > 1 && num1.length < numLength + 1) {
        count = Number(num1);
    } else {
        count = Number(num0);
    }

    count = count > 200 ? Math.floor(count / 5) : count;

    return count + Number(num);
};
```

## JS 添加浏览器内核前缀

```js
let eleStyle = document.createElement('div').style;
let vender = (() => {
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transfrom'
    }
    for (let key in transformNames) {
        if (eleStyle[transformNames[key]] !== undefined) {
            return key
        }
    }
    return false;
})()
let prefixStyle = (style) => {
    if (vender === false) return false
    if (vender === 'standard') return style
    return vender + style.charAt(0).toUpperCase + style.substr(1)
}
```

## 标签函数

**String.raw()** 是一个[模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)的标签函数。[String.raw-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/raw)

语法：

```js
String.raw(callSite, ...substitutions)
String.raw`templateString`
```
示例：

```js
String.raw `Hi\n!`;                 
// "Hi\\n!"，这里得到的不是 Hi 后面跟个换行符，而是跟着 \ 和 n 两个字符

String.raw `Hi\u000A!`;             
// "Hi\\u000A!"，同上，这里得到的会是 \、u、0、0、0、A 6个字符，
// 任何类型的转义形式都会失效，保留原样输出，不信你试试.length

let name = "Bob";
String.raw `Hi\n${name}!`;             
// "Hi\\nBob!"，内插表达式还可以正常运行

String.raw({raw: "test"}, 0, 1, 2); 
// "t0e1s2t"，我认为你通常不需要把它当成普通函数来调用
```

## 判断空对象

```js
let obj = {};

const isEmpty1 = obj => {
    for (let k in obj) {
        return false;
    }
    return true;
}

const isEmpty2 = obj => {
    return JSON.stringify(obj) === '{}'
}

const isEmpty3 = obj => {
    return Object.keys(obj).length === 0
}
```

## **insertAdjacentHTML()** 

```js
element.insertAdjacentHTML(position, text);
```

position是相对于元素的位置，并且必须是以下字符串之一：

- 'beforebegin'

  元素自身的前面。

- 'afterbegin'

  `插入元素内部的第一个子节点之前。`

- 'beforeend'

  插入元素内部的最后一个子节点之后。

- 'afterend'

  元素自身的后面。

text 是要被解析为HTML或XML,并插入到DOM树中的字符串。

## new 的过程

1. 生成一个新的对象；
2. 链接到原型；
3. 调用构造函数，绑定 this；
4. 返回对象；

```js
function create() {
    // 新建对象
    let obj = new Object();
    // 获取构造函数
    let Con = [].shift.call(arguments);
    // 链接到原型
    obj.__proto__ = Con.prototype;
    // 调用构造函数，绑定 this
    let result = constructor.apply(obj, arguments);
    // 返回对象
    return typeof constructor === 'object' ? result : obj;
}
```

## 正则判断邮箱

```js
let vaildEmail = email => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return reg.test(email);
}
```

## 动态加载 js

```js
function loadJs(src) {
  return new Promise((resolve,reject)=>{
    let script = document.createElement('script')
    script.onload = ()=>{
      resolve()
    }
    script.onerror = ()=>{
      reject()
    }
    script.src= src
    document.querySelector('body').appendChild(script)
 })
}
```

## 去除标签的 style width height 属性

```js
function formatStyle(html){
  let newContent= html.replace(/<[^>]*>/ig,function(match,capture){
    let match = match.replace(/(style="(.*?)")|(width="(.*?)")|(height="(.*?)")/ig, '');
    return match;
  });
  return newContent;
}
```

## 获取图片原始宽高

```js
let src = 'a.png';
let img = new Image();
img.src = src;
img.onload = function () {
  console.log(img.width);
}
```

## 数字单位汉字格式化

```js
// 格式化数字，增加单位，保留两位小数
function quantityFormat(n) {
    const value = Number(n);
    if (!value) return n;
    let result = '';
    const k = 10000;
    const unit = ['', '万', '亿', '万亿'];
    if (value < k) {
        result = value;
    } else {
        const i = Math.floor(Math.log(value) / Math.log(k));
        result = ((value / Math.pow(k, i))).toFixed(2) + unit[i];
    }
    return result;
}
```










