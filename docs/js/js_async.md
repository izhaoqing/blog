# 异步操作

## 常见的异步操作

网络请求，IO 操作，定时函数。

## Promise

```js
let p = new Promise((res, rej) => {
    setTimeout(res, 1000)
})

p.then(res => {
    //
    return res
}).then(data => {
    // data 为上一个 then 的返回值
})
```

第一个 `then` 回调函数的返回值将作为第二个 `then` 的回调函数的参数。

如果第一个 then 返回值是一个 `Promise` 的话，情况就不一样了，如果前面返回的是 `Promise` 对象，后面的 `then` 将会被当做这个返回的 `Promise` 的第一个 `then` 来对待 。

### 异常捕获

`then `会接收两个参数（函数），第一个参数会在执行 `resolve` 之后触发（还能传递参数），第二个参数会在执行 `reject` 之后触发（其实也可以传递参数，和 `resolve` 传递参数一样）

在若干个 `then` 串联之后，我们一般会在最后跟一个 `catch` 来捕获异常，而且执行 `reject` 时传递的参数也会在 `catch` 中获取到。这样做的好处是：

- 让程序看起来更加简洁，是一个串联的关系，没有分支（如果用 `then` 的两个参数，就会出现分支，影响阅读）
- 看起来更像是 `try - catch` 的样子，更易理解

### Promise.all

```js
let p1 = new Promise();
let p2 = new Promise();
let p = Promise.all([p1, p2]).then(res => {
    // 
})
```

（1）只有`p1`、`p2` 的状态都变成 `fulfilled` ， `p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

（2）只要`p1`、`p2`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

### Promise.race

```js
let p = Promise.race([p1, p2]).then(res => { 
    //  
})
```

只要`p1`、`p2`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

## Generator

`yield`后面会接一个普通的 JS 对象，而`yield*`后面会接一个`Generator`，而且会把它其中的`yield`按照规则来一步一步执行。如果有多个`Generator`串联使用的话（例如`Koa`源码中）

```js
let str = '';
function* g1 () {
    str += '1';
    yield* g2();
    str += '5';
}
function* g2 () {
    str += '2';
    yield* g3();
    str+= '4';
}
function* g3 () {
    str += '3';
}
g1().next();
console.log(str); // 12345
```

## async-await

`async`函数的返回值是 Promise 对象，可以使用`then`方法添加回调函数。`async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数。

`async`函数内部抛出错误，会导致返回的 Promise 对象变为`reject`状态。抛出的错误对象会被`catch`方法回调函数接收到。

```js
async function f() {
    throw new Error('error');
}
f().then(
    v => console.log(v);
    e => console.log(e);
)
```

### Promise对象状态改变

`async`函数返回的 Promise 对象，必须等到内部所有`await`命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到`return`语句或者抛出错误。也就是说，只有`async`函数内部的异步操作执行完，才会执行`then`方法指定的回调函数。

```js
let asyncFn = async function  () {
    let s2 = await readFileFn('/t2.txt');
    console.log(s2);
    let s1 = await readFileFn('/t1.txt');
    console.log(s1);
    return 123;
}

asyncFn().then(res => {
    console.log(res);
});
// 分别打印s2, s1
// 再执行 then 内的函数
```

### await

正常情况下，`await`命令后面是一个 Promise 对象。如果不是，会被转成一个立即`resolve`的 Promise 对象。

`await`命令后面的 Promise 对象如果变为`reject`状态，则`reject`的参数会被`catch`方法的回调函数接收到，不管 `await ` 前是否有 `return`。

只要一个 `await` 语句后面的 Promise 变为 `reject` ，那么整个 `async` 函数都会中断执行。

```js
async function f() {
    awiat Promise.reject('error');
    awiat Promise.resolve('hello');  // 不会执行
}
```

避免这种情况可以使用 `try...catch`，或者在 `await` 后加 `catch`。

```js
async function f1() {
    try {
        await Promise.reject('error');
    } catch (e) {
        console.log(e);
    }
    await Promise.resolve('hello');
}
f1().then(v => console.log(v));

// 法二
async function fn() {
    await Promise.reject('error')
    	.catch(e => console.log(e));
    await Promise.resolve('hello');
}
fn().then(v => {
    console.log(v);
});
```

多个`await`命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

```js
let foo = await getFoo();
let bar = await getBar();
// getFoo完成后才会执行getBar
```

```js
let [foo, bar] = await Promise.all([getFoo(), getBar()])
// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

上面两种写法，`getFoo`和`getBar`都是同时触发，这样就会缩短程序的执行时间。

### async/await with forEach

在 forEach 中使用循环使用异步函数可能会有点问题。

```js
const waitFor = t => new Promise(res => setTimeout(res, t))

[1, 2, 3].forEach(async num => {
    await waitFor(1000)
    console.log(num)
})

console.log('done');
```

运行代码，因为 forEach 是同步执行，并不会等待它的回调执行完毕再执行下次循环，打印如下：

```bash
$ node forEach.js
$ done
```

自己写一个类似 forEach 的异步方法：

```js
async function asyncForEach(array, cb) {
    for(let i = 0; i < array.length; i++) {
        await cb(array[i], i, array)
    }
}
asyncForEach([1, 2, 3], async num => {
    await waitFor(1000)
    console.log(num)
})
```

运行代码，打印如下：

```shell
$ node forEach.js
$ done
$ 1
$ 2
$ 3
```

[async/await with forEach](<https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404>)



