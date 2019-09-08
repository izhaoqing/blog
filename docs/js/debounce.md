# 函数防抖 (debounce)

函数防抖是频繁发生的情况下，当有足够的空闲时间，才会执行代码一次，是优化高频率执行代码的一种手段。实际开发中会遇到频发触发事件的情况，比如 `resize`, `scroll`, `mousemove` 事件。

## 原理

事件触发 n 秒后执行，如果在这 n 秒内再次触发，则以新的事件时间为准，n 秒后执行。无论触发多少次，都要等到最后一次触发 n 秒后才执行。

## 实现

用 `mousemove`举例，当鼠标移入时，在 `div` 内显示事件函数执行的次数。防抖的简单实现如下：

```html
<div id='container'></div>

```

```js
let count = 0;
let oDiv = document.querySelector('#container');

//防抖函数
function debounce(fn, delay) {
    let timer;
    
    return function() {
        clearTimeout(timer);
        timer = setTimeout(fn, delay);
    }
}

//事件函数
function eventFn() {
    oDiv.innerHTML = ++count;
}

oDiv.onmousemove = debounce(eventFn, 1000);
```

## this指向

正常情况下，在事件函数中使用 `this` 指向该事件绑定的元素。而此时 `eventFn` 是作为定时器的一个参数，`this` 指向 `window` ，需要更正 `this` 指向。

```js
function debounce(fn, delay) {
    let timer;
    
    return function() {
        let _this = this;
        
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(_this);
        }, delay);
    }
}

```

## event对象

一般情况下，事件函数 `eventFn` 的第一个参数为 `event` 对象，但此时，值为 `undefined`。修改防抖函数：

```js
function debounce(fn, delay) {
    let timer;
    
    return function() {
        let _this = this;
        let opt = arguments;
        
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(_this, arguments);
        }, delay);
    }
}

```

## 立即执行

防抖函数中使用了定时器，事件触发后会延迟一定时间才调用事件函数，有时我们希望触发事件可以立即执行，然后需要 n 秒后才能重新触发执行。我们通过传入第三个参数，判断是否需要立即执行。

```js
function debounce(fn, delay, immediate) {
    let timer;
    
    return function() {
        let _this = this;
        let opt = arguments;
        
        timer && clearTimeout(timer);
        if(immediate) {
            let call = !timer;
            timer = setTimeout(function() {
                timer = false;
            }, delay);
        	
            call && fn.apply(_this, opt);
        } else {
            timer = setTimeout(function() {
	             fn.apply(_this, opt);
	         }, delay);
        }    }
}
```






















