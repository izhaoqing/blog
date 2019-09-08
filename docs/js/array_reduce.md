## reduce

`reduce()` 方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始缩减，最终为一个值，累加器最后一次的返回值作为 `reduce()` 方法的返回值。

### 语法

`reduce([callback, initValue])`

+ callback 执行数组中每个值的回调函数，有四个参数
    - prevValue 上一次执行回调函数返回的值，或者初始值
    - currValue 数组当前被处理的元素
    - currIndex 当前被处理元素在数组中的索引值，如果有 initValue 则从0开始，否则从1开始
    - arr 调用 reduce 方法的数组
+ initValue 可选参数，第一次调用 callback 的第一个参数

遍历数组，不包括被删除或未被赋值的元素。

如果没有 initValue 参数，reduce 会从 index 为 1 开始执行回调函数，prevValue 为数组的第一个元素。  

```js
//无初始值
[1,2,3].reduce((prev, curr, index, arr) => {
    console.log(prev, curr, index);
    return curr;
});

//1 2 1
//2 3 2

//有初始值
[1,2,3].reduce((prev, curr, index, arr) => {
    console.log(prev, curr, index);
    return curr;
}, 0);

//0 1 1
//1 2 1
//2 3 2

```
     
### 应用

1, 求和

```js
[1,2,3].reduce((totle, curr, index) => {
    return totle + curr;
}, 0);

//6
```

2, 求最大值

```js
[1, 2, 3].reduce((max, curr) => {
    return Math.max(max, curr);
}, 0);

//3

``` 

### 初始值类型

第二参数设置叠加结果的类型初始值，可以与数组元素的类型不同，reduce 就不再仅仅只是做一个加法了，可以灵活运用它来进行各种各样的类型转换，比如将数组按照一定规则转换为对象，也可以将一种形式的数组转换为另一种形式的数组。

统计字符串中每个字符出现的次数

```js
'abbc'.split('').reduce((res, curr) => {
    res[curr] = res[curr] ? ++res[curr] : 1;
    return res;
}, {});

//{a: 1, b: 2, c: 1}
```

初始值为一个对象，回调函数的返回值也为对象。




