# 深拷贝

实现一个简单的深拷贝

```js
function clone (source) {
    let target = {};
    for (let k in source) {
        if (source.hasOwnProperty(i)) {
            let v = source[k];
            if (typeof v === 'object') {
                target[k] = clone(v);
            } else {
                target[k] = v;
            }
        }
    }
    return target;
}
```

以上存在的问题：没有对参数做检验、判断是否对象的逻辑不够严谨、没有考虑其他数据类型的兼容（数组，时间对象，函数，正则，DOM，set，map等）。

判断对象可以使用：

```js
function isObject(x) {
    return Object.prototype.toString.call(x) === '[object Object]';
}
```

但如果是时间对象，则返回的是 `[object Date]`。

需要校验参数，如果不是对象的话直接返回：

```js
function clone(source) {
    if (!isObject(source)) return source;

    // xxx
}
```

还有一个问题是递归容易出现爆栈，当数据的层次很深是就会**栈溢出**，递归使用的是深度优先遍历，解决这个问题需要使用广度优先遍历，一层一层的循环。

大部分情况下不会出现很深层级的数据，但这种方式还有一个致命的问题，就是**循环引用**。解决循环引用：循环检测，暴力破解。

### JSON 拷贝

```js
function cloneJSON(source) {
    return JSON.parse(JSON.stringify(source));
}
```

这种方法内部也是使用递归的方式，会出现栈溢出的情况，但是做了循环引用检测。

```js
var a = {};
a.a = a;
cloneJSON(a) // Uncaught TypeError: Converting circular structure to JSON
```







