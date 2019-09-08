## JavaScript有用的代码片段

### 小数取整

```js
const x = 1.234;
~~x    //1
x >>   //1
x | 0  //1
Math.floor(x)  //1

const y = -1.4;
x >>   //-1
Math.floor(y)   //-2
```

> 按位运算符直接去掉小数，`Math.floor()`向下取整，返回的数小于等于原来的数。

### 生成n位随机数

```js
let getRandom = n => Math.random().toString().slice(-n);
getRandom(6)   //6位随机数
```

### 生成16进制颜色

```js
let colorCode = '#' +('00000' +(Math .random()* 0x1000000 << 0).toString(16)).slice(- 6);
```

### n到m间随机整数

```js
let randomNum = (n,m) => Math.floor(Math.random()*(m-n) + n);
randomNum(2,10)   //2-10之间的整数
```

> 生成n到m间的随机整数，不包括m，n和m可以为负数。

### 驼峰命名转下划线

```js
let humpToUnderline = str => str.match(/^[a-z][a-z0-9]+|[A-Z][a-z0-9]*/g).join('_').toLowerCase();
humpToUnderline('helloWorld');  //hello_world
```

### url参数转json

```js
let urlToJson = url => {
    let json = {};
    if (!!!url) return json;
    let data = url.split('?')[1] ? url.split('?')[1].split('&') : [];
    for(let i=0; i<data.length; i++) {
        let k = data[i].split('=');
        k[0] && (json[k[0]] = k[1] || '');
    }
    return json;
}
```

### 获取url中的参数

```js
let getUrlData = name => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
```

### n维数组转1维数组

```js
let flatten = arr => JSON.parse(`[${JSON.stringify(arr).replace(/\[|]/g, '')}]`);
let flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
let flatten = a => Array.isArray(a) ? [].concat(...a.map(flatten)) : a;

flatten([1,[2,3,[3,4],5])  //[1,2,3,4,5]
```

### n维数组展开成字符串

```js
let arr = [1,3,[4,[72,'a','d'],3,[6,'c'],d]];

arr+'';
arr.toString();
arr.join();
JSON.stringify(arr).replace(/\[|\]/g,'');

//'1,3,4,72,"a","d",3,6,"c"'
```


### 时间格式化

```js
//时间格式化
function format1(x, y) {
    let i = 0;
    var z = {
        y: x.getFullYear(),
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) {
        console.log(++i);
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
    });
}

format1(new Date(), 'yyyy-MM-dd h:m:s');   //2018-01-22 9:38:10
```

### 统计文字个数

```js
//统计文字个数
function wordCount(data) {
  var pattern = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
  var m = data.match(pattern);
  var count = 0;
  if( m === null ) return count;
  for (var i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4E00) {
      count += m[i].length;
    } else {
      count += 1;
    }
  }
  return count;
}

var text = '统计文字个数';
// console.log(wordCount(text)); // 6
```

### 格式化数字

```js
//法一
function formatNum (str) {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//法二
function formatNum (str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}

// 法三
function formatNum (num) {
    // num 为 number
    return num.toLocaleString();
}
```

### 检测质数

```js
function isPrime(n) {
    return !(/^.?$|^(..+?)\1+$/).test('1'.repeat(n))
}
```

### 统计字符出现的次数

```js
function strTimes (str) {
    return str.split('').reduce((p,n) => (p[n]++ || (p[n]=1) ,p), {});   
}    
```

### 评级

```js
"★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
```

### 字符串类型的数字转数字

```js
let a = '1';
+a   //1;
```

> `+a` 可以理解为`Number(a)`，将一个变量转成数字。布尔值返回0或1，`undefined`返回`NaN`，数字直接返回，`null`返回0，对于字符串，将其转换为十进制数值，会忽略前面的0（16进制除外），空字符串返回0，浮点数会返回浮点数值。其他格式字符串（无论是否数字开头，返回NaN，字符串中好几个小数点，返回`NaN`。


### 数组去重复

```js
[...new Set(arr)]
```

更多更详细的[数组去重方法](removerepetion.md)。

### 获取时间戳

```js
(new Date()).getTime();
(new Date).getTime();
new Date().getTime();
+new Date();
Date.now();
```




