# 数组常用方法总结

## from

从一个类似数组或可迭代对象中创建一个新的数组实例。

### 语法

`Array.from(arrayLinke [, fn [, thisObj]])`;

+ arrayLike 需要转换的类数组或迭代对象
+ fn 可选参数，新数组的每个元素都会执行的回调函数
   - value 新数组的元素
   - index 数组元素的索引值
+ thisObj 可选参数，执行回调函数 fn 时的 this 对象

arrayLinke 为类数组对象，指有一个 length 属性和索引属性的对象。可迭代对象包括 Map, Set, Arguments等。

fn 是可选参数，遍历生成的数组，可对每个数组元素进行操作，相当于在 form() 方法后再次调用 map 方法。

```js
Array.from(arrayLike, fn, thisObj)

Array.from(arrayLike).map(fn, thisObj);

```

### 应用

```js
Array.from('abc');   //['a','b','c']
Array.from(new Set(['a','b'])  //['a', 'b']

Array.from({length: 3}, (v, i) => i);
//[0, 1, 2]

```




