# 数组排序

``` JavaScript
//按ASCIL码升序排列
newArr = arr.sort();
```
`sort()`方法会在原数组上修改，返回值和原数组相等。`newArr === arr  //true`。  
`sort()`没有参数时，实际上是将数组元素转成字符串，再按照ascil码一位一位的比较大小。

```
//按数值升序排列
newArr = arr.sort((a,b) => {
    return a-b;
}
```

如果数组中有字符串，将会被转成数字类型再比较，`a-b`大于0则交换位置，(降序相反)。如果转换失败，则位置不变，因为`NaN`减去任何值都不大于0。

如果始终让函数返回一个正数，可使数组倒序排列，和`reverse()`效果相同。

``` JavaScript
[1,4,5,3].sort((a,b) => {
    return 1;
});
//[3,5,4,1]
```

## 取数组的最大值和最小值

`Math.max()` 和 `Math.min()` 可以返回一组数字中的最大值和最小值。使用`max`或`min`方法，参数中非数字类型会先转换成数字类型，再做比较返回极值，若转换失败直接返回`NaN`。

```js
Math.max(0, true);        //1
Math.max('1', null);      //1
Math.max(undefined, 2);   //NaN
```

如果没有参数，返回无穷大。

```js
Math.max();   //-Infinity
Math.min();   //Infinity
```

### 遍历法

遍历数组，相邻之间比较大小，返回较大值再与下一个元素比较。

```js
let arr = [1,3,2,4];
let result = arr[0];

for(let i=1; i<arr.length; i++){
    result = Math.max(result, arr[i]);
}
console.log(result);  //4

```

### 扩展运算符

``` JavaScript
Math.max(...arr)  //最大值
Math.min(...arr)  //最小值

Math.max(...[1,'a'])  //NaN
```

### apply

```js
Math.max.apply(null, [1,2,3])   //最大值
```

### sort

先通过 sort 方法按照从小到大的顺序排列，第一个元素就是最小值，最后一个元素就是最大值。

```js
let arr = [1,2,6,2,0].sort((a,b) => a-b);
//最小值：arr[0]  最大值：arr[arr.length-1]
```

### reduce

```js
let arr = [1,3,2,4];
let max = arr.reduce((prev, next) => Math.max(prev, next));

console.log(max);   //4
```

```js
let max = arr.reduce((prev, next) => prev > next ? prev : next);
console.log(max);   //4
```

### eval

将数组展开成一组单个的数字，除了使用扩展运算符，还可以直接使用字符串拼接，arr 会先调用 `toString()` 方法将自身转成 ',' 隔开的字符串，再使用 eval 。

```js
let arr = [1,3,2,4];
let max = eval('Math.max('+ arr +')');
//相当于执行 Math.max(1,3,2,4)

console.log(max);   //4
```





























