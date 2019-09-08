# JavaScript数组去重


## 双层循环

使用双层嵌套循环是最原始的方法：

```js
var array = ['a','b','a'];

function unique(array) {
    // res用来存储结果
    var res = [];
    for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
        for (var j = 0, resLen = res.length; j < resLen; j++ ) {
            if (array[i] === res[j]) {
                break;
            }
        }
        // 如果array[i]是唯一的，那么执行完循环，j等于resLen
        if (j === resLen) {
            res.push(array[i])
        }
    }
    return res;
}

console.log(unique(array)); // ['a','b']
```

外层循环 `array` 内层循环 `res`, 当 `array[i]` 和 `res[j]` 相等时，跳出循环。否则说明元素唯一，这时 `j === resLen` 成立，将此元素添加到 `res` 中。

## indexOf

使用 `indexOf` 可以返回某个元素在数组中的索引，不存在则返回 -1，可以用来判断某个值在数组中是否存在。

```js
var array = ['a','b','a'];

function unique(array) {
    var res = [];
    for (var i = 0, len = array.length; i < len; i++) {
        var current = array[i];
        if (res.indexOf(current) === -1) {
            res.push(current)
        }
    }
    return res;
}

console.log(unique(array));
```

## 排序后去重

试想我们先将要去重的数组使用 sort 方法排序后，相同的值就会被排在一起，然后我们就可以只判断当前元素与上一个元素是否相同，相同就说明重复，不相同就添加进 res，让我们写个 demo：

```js
var array = [1, 1, '1'];

function unique(array) {
    var res = [];
    var sortedArray = array.concat().sort();
    var seen;
    for (var i = 0, len = sortedArray.length; i < len; i++) {
        // 如果是第一个元素或者相邻的元素不相同
        if (!i || seen !== sortedArray[i]) {
            res.push(sortedArray[i])
        }
        seen = sortedArray[i];
    }
    return res;
}

console.log(unique(array));
```

如果我们对一个已经排好序的数组去重，这种方法效率肯定高于使用 indexOf。

## filter

ES5 提供了 filter 方法，我们可以用来简化外层循环：

比如使用 indexOf 的方法：

```js
var array = [1, 2, 1, 1, '1'];

function unique(array) {
    var res = array.filter(function(item, index, array){
        return array.indexOf(item) === index;
    })
    return res;
}

console.log(unique(array));
```

排序去重的方法：

```js
var array = [1, 2, 1, 1, '1'];

function unique(array) {
    return array.concat().sort().filter(function(item, index, array){
        return !index || item !== array[index - 1]
    })
}

console.log(unique(array));
```

## Object 键值对

这种方法是利用一个空的 Object 对象，我们把数组的值存成 Object 的 key 值，比如 Object[value1] = true，在判断另一个值的时候，如果 Object[value2]存在的话，就说明该值是重复的。示例代码如下：

```js
var array = [1, 2, 1, 1, '1'];

function unique(array) {
    var obj = {};
    return array.filter(function(item, index, array){
        return obj.hasOwnProperty(item) ? false : (obj[item] = true)
    })
}

console.log(unique(array)); // [1, 2]
```

我们可以发现，是有问题的，因为 1 和 '1' 是不同的，但是这种方法会判断为同一个值，这是因为对象的键值只能是字符串，所以我们可以使用 `typeof item + item` 拼成字符串作为 key 值来避免这个问题：

```js
var array = [1, 2, 1, 1, '1'];

function unique(array) {
    var obj = {};
    return array.filter(function(item, index, array){
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}

console.log(unique(array)); // [1, 2, "1"]
```

然而，即便如此，我们依然无法正确区分出两个对象，比如 {value: 1} 和 {value: 2}，因为 `typeof item + item` 的结果都会是 `object[object Object]`，不过我们可以使用 JSON.stringify 将对象序列化：

```js
var array = [{value: 1}, {value: 1}, {value: 2}];

function unique(array) {
    var obj = {};
    return array.filter(function(item, index, array){
        console.log(typeof item + JSON.stringify(item))
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
    })
}

console.log(unique(array)); // [{value: 1}, {value: 2}]
```

## ES6

随着 ES6 的到来，去重的方法又有了进展，比如我们可以使用 Set 和 Map 数据结构，以 Set 为例，ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

是不是感觉就像是为去重而准备的？让我们来写一版：

```js
var array = [1, 2, 1, 1, '1'];

function unique(array) {
   return Array.from(new Set(array));
}

console.log(unique(array)); // [1, 2, "1"]
```

甚至可以再简化下：

```js
function unique(array) {
    return [...new Set(array)];
}
```

还可以再简化下：

```js
var unique = (a) => [...new Set(a)]
```

此外，如果用 Map 的话：

```js
function unique (arr) {
    const seen = new Map()
    return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
}
```

## 特殊类型比较

去重的方法就到此结束了，然而要去重的元素类型可能是多种多样，除了例子中简单的 1 和 '1' 之外，其实还有 null、undefined、NaN、对象等，那么对于这些元素，之前的这些方法的去重结果又是怎样呢？

在此之前，先让我们先看几个例子：

```js
var str1 = '1';
var str2 = new String('1');

console.log(str1 == str2); // true
console.log(str1 === str2); // false

console.log(null == null); // true
console.log(null === null); // true

console.log(undefined == undefined); // true
console.log(undefined === undefined); // true

console.log(NaN == NaN); // false
console.log(NaN === NaN); // false

console.log(/a/ == /a/); // false
console.log(/a/ === /a/); // false

console.log({} == {}); // false
console.log({} === {}); // false
```

那么，对于这样一个数组

```js
var array = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN];
```

以上各种方法去重的结果到底是什么样的呢？

我特地整理了一个列表，我们重点关注下对象和 NaN 的去重情况：

<table class="table table-bordered table-striped table-condensed">  
    <tr>  
        <th>方法</th>  
        <th>结果</th>  
        <th>说明</th>  
    </tr>  
    <tr>  
        <td>for循环</td>  
        <td>[1, "1", null, undefined, String, String, /a/, /a/, NaN, NaN]</td>
        <td>对象和 NaN 不去重</td>
    </tr>
    <tr>  
        <td>indexOf</td>  
        <td>[1, "1", null, undefined, String, String, /a/, /a/, NaN, NaN]</td>
        <td>对象和 NaN 不去重</td>
    </tr>  
    <tr>  
        <td>sort</td>  
        <td>[/a/, /a/, "1", 1, String, 1, String, NaN, NaN, null, undefined]</td>
        <td>对象和 NaN 不去重 数字 1 也不去重</td>
    </tr>  
    <tr>  
        <td>filter + indexOf</td>  
        <td>[1, "1", null, undefined, String, String, /a/, /a/]</td>
        <td>对象不去重 NaN 会被忽略掉</td>
    </tr>  
    <tr>  
        <td>filter + sort</td>  
        <td>[/a/, /a/, "1", 1, String, 1, String, NaN, NaN, null, undefined]</td>
        <td>对象和 NaN 不去重 数字 1 不去重</td>
    </tr>  
    <tr>  
        <td>优化后的键值对方法</td>  
        <td>[1, "1", null, undefined, String, /a/, NaN]</td>
        <td>全部去重</td>
    </tr>  
    <tr>  
        <td>Set</td>  
        <td>[1, "1", null, undefined, String, String, /a/, /a/, NaN]</td>
        <td>对象不去重 NaN 去重</td>
    </tr>  
</table> 

想了解为什么会出现以上的结果，看两个 demo 便能明白：

```js
// demo1
var arr = [1, 2, NaN];
arr.indexOf(NaN); // -1
```
indexOf 底层还是使用 === 进行判断，因为 `NaN ==== NaN` 的结果为 false，所以使用 indexOf 查找不到 NaN 元素

```js
// demo2
function unique(array) {
   return Array.from(new Set(array));
}
console.log(unique([NaN, NaN])) // [NaN]
```
Set 认为尽管 `NaN === NaN` 为 false，但是这两个元素是重复的。