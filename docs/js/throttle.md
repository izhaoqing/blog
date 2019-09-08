## 实现

在[函数防抖](debounce.md)中，考虑了 `this`指向和 `evnet` 对象的问题，其解决方法与函数节流相同。

用 `mousemove`举例，当鼠标移入时，在 `div` 内显示事件函数执行的次数，用时间戳和定时器两种方法实现。

### 使用时间戳

```html
<div id='container'></div>

```

```js
let count = 0;
let oDiv = document.querySelector('#container');

//节流函数
function throttle(fn, delay) {
    let prev = 0;
    
    return function() {
        let now = +new Date();
        let _this = this;
        let opt = arguments;
        if(now - prev > delay){
            fn.apply(_this, opt);
            prev = now;
        }
    }
}

//事件函数
function eventFn() {
    oDiv.innerHTML = ++count;
}

oDiv.onmousemove = throttle(eventFn, 1000);
```

### 使用定时器

```js
function throttle(fn, delay) {
    let timer;
    
    return function() {
        let _this = this;
        let opt = arguments;
        
        if(!timer){
            timer = setTimeout(function () {
                fn.apply(_this, opt);
                timer = null;
            }, delay);
        }
    }
}
```

比较两种方法的异同，使用时间戳，鼠标移入事件函数会立即执行，在设定的时间间隔内（传入的 `delay`）鼠标移出，则不会执行。比如，`delay = 1000` 时，鼠标移入会立即执行一次，0.8s后移出，停止触发，则以后不会在执行事件函数 `eventFn`。

而使用定时器的方法，鼠标移入后不会立刻执行，而是在设定的时间间隔后执行一次，此后每隔 `delay` 执行一次，如果鼠标移出时没有到达下个时间间隔，依然会再执行一次。比如，`delay = 1000` 时，鼠标移入 1s 后执行一次，在 1.2s 后移出，会在 2s 时再执行一次。

### 综合

如果我们有移入时执行，移出后再执行一次的需求，综合以上两种方法，可以实现。

```js
function throttle(fn, delay) {
    let timer, _this, opt;
    let prev = 0;
    
    let later = function () {
        prev = +new Date();
        timer = null;
        fn.apply(_this, opt);
    }
    
    let throttled = function() {
        let now = +new Date();
        let remaining = delay - (now - prev);
        _this = this;
        opt = arguments;
        
        if(remaining <= 0 || remaining > delay) {
            if(timer) {
                clearTimeout(timer);
                timer = null;
            }
            prev = now;
            fn.apply(_this, opt);
        } else if(!timer) {
            timer = setTimeout(later, remaining);
        }
    };
    return throttled;
}

```





















