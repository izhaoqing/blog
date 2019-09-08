### 对象与函数

js 的数据类型有简单类型：Number，String，Boolean，undefined，null；复杂类型(引用类型)：Object，包括 Function，Object，Array，Date等。

```js
function show(x) {
    console.log(typeof x);    // undefined
    console.log(typeof 10);   // number
    console.log(typeof 'abc'); // string
    console.log(typeof true);  // boolean

    console.log(typeof function () {});  //function

    console.log(typeof [1, 'a', true]);  //object
    console.log(typeof { a: 10, b: 20 });  //object
    console.log(typeof null);  //object
    console.log(typeof new Number(10));  //object
}
show();
```

#### 对象和函数关系

函数是对象的一种，有属性。对象都是通过函数创建的。

```js
let fn = function () {};
fn instanceof Object;  // true
```

```js
typeof Object;  // function
typeof Array; // function
```

### prototype

函数也是一种对象。他也是属性的集合，你也可以对函数进行自定义属性。

不用等咱们去试验，javascript自己就先做了表率，人家就默认的给函数一个属性——prototype。对，**每个函数都有一个属性叫做prototype**。

这个prototype的属性值是一个对象（属性的集合，再次强调！），默认的只有一个叫做constructor的属性，指向这个函数本身。

```js
function Fn() { }
Fn.prototype.name = '王福朋';
Fn.prototype.getYear = function () {
	return 1988;
};

var fn = new Fn();
console.log(fn.name);
console.log(fn.getYear());
```

即，Fn是一个函数，fn对象是从Fn函数new出来的，这样fn对象就可以调用 Fn.prototype 中的属性。

因为 **每个对象都有一个隐藏的属性`__proto__`，这个属性引用了创建这个对象的函数的 prototype** 。即：`fn.__proto__ === Fn.prototype`。

这里的"`__proto__`"成为“隐式原型”。

### 原型链

**访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找，这就是原型链**。对象的原型链是沿着`__proto__`这条线走的。

在实际应用中如何区分一个属性到底是基本的还是从原型中找到的呢？大家可能都知道答案了——hasOwnProperty，特别是在for…in…循环中，一定要注意。

hasOwnProperty方法是从哪里来的?

![img](https://images0.cnblogs.com/blog/138012/201409/182014277067963.png)

### 执行上下文环境

执行某一代码段需要做准备工作：

- 变量、函数表达式——变量声明，默认赋值为undefined；
- this——赋值；
- 函数声明——赋值；

这三种数据的准备情况我们称之为“执行上下文”或者“执行上下文环境”。表示代码块是在准备好的这些环境下执行的。这个“代码段”其实分三种情况——全局代码，函数体，eval代码。

全局代码的上下文环境数据内容为：

| 数据 |  |
| -------------------------------------------- | --------------------------- |
| 普通变量（包括函数表达式），如： var a = 10; | 声明（默认赋值为undefined） |
| 函数声明，如： function fn() { }             | 赋值                        |
| this                                         | 赋值                        |

如果代码段是函数体，那么在此基础上需要附加：

| 数据                 |      |
| -------------------- | ---- |
| 参数                 | 赋值 |
| arguments            | 赋值 |
| 自由变量的取值作用域 | 赋值 |

### 执行上下文栈

执行全局代码时，会产生一个执行上下文环境，每次调用函数都又会产生执行上下文环境。当函数调用完成时，这个上下文环境以及其中的数据都会被消除，再重新回到全局上下文环境。处于活动状态的执行上下文环境只有一个。

其实这是一个压栈出栈的过程——执行上下文栈。如下图：

![img](https://images0.cnblogs.com/blog/138012/201409/232122300768665.png)

 ### this 对象

在函数中this到底取何值，是在函数真正被调用执行的时候确定的，函数定义的时候确定不了。因为this的取值是执行上下文环境的一部分，每次调用函数，都会产生一个新的执行上下文环境。

#### 构造函数中

构造函数中，this 表示构造出的实例。

#### 函数作为对象的属性。

如果作为一个对象的属性调用，this 表示这个对象，如果此函数被赋值到另一个变量中，this 表示 window。

```js
let obj = {
    x: 'a',
    fn: function () {
        console.log(this);
        console.log(this.x);
    }
}
obj.fn(); // obj, 'a'
let fn1 = obj.fn;
fn1(); // window, undefined
```

#### call 和 apply 调用函数

this 表示穿入的对象。

#### 全局调用/普通函数调用

全局下，this 表示 window。

```js
window === this;  // true
```

普通函数调用，this 表示 window。

```js
function fn () {
    console.log(this);
}
fn(); // window
```

对象内部的普通函数。

```js
let obj = {
    x: 'a',
    fn: function () {
        function f1 () {
            console.log(this);
            console.log(this.x);
        }
        f1();
    }
}
obj.fn(); // window, undefined
```

### 作用域

除了**全局**作用域，只有**函数**可以创建作用域。

作用域有上下级的关系，上下级关系的确定就看函数是在哪个作用域下创建的。例如，fn作用域下创建了bar函数，那么“fn作用域”就是“bar作用域”的上级。作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。

**作用域在函数定义时就已经确定了。而不是在函数调用时确定**。

作用域只是一个“地盘”，一个抽象的概念，其中没有变量。要通过作用域对应的执行上下文环境来获取变量的值。同一个作用域下，不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值。所以，作用域中变量的值是在执行过程中产生的确定的，而作用域却是在函数创建时就确定了。

所以，如果要查找一个作用域下某个变量的值，就需要找到这个作用域对应的执行上下文环境，再在其中寻找变量的值。

#### 自由变量

在函数中，一个未在此函数作用域中申明的变量，要到创建这个函数的那个作用域中取值——是“创建”，而不是“调用”。直到跨到全局作用域为止，一步步向父作用域跨的路线称为**作用域链**。

```js
let x = 1;
function fn () {
    console.log(x);
}
(function () {
    let x = 2;
    fn();
})();
// 1;
```

### 闭包

闭包的两种应用情况：**函数作为返回值，函数作为参数传递**。

#### 函数作为返回值

```js
function fn () {
    let a = 10;
    return function f1 (b) {
        console.log(a + b)
    }
}
let a = 20;
fn()(20); // 30
```

执行fn()时，返回的是一个函数。函数的特别之处在于可以创建一个独立的作用域。而正巧合的是，返回的这个函数体中，还有一个自由变量 b 要引用 fn 作用域下的 fn() 上下文环境中的 a 。因此，这个 a 不能被销毁，销毁了之后 f1 函数中的 a 就找不到值了。使用闭包会增加内容开销。

#### 函数作为参数传递

```js
let a = 10;
function fn (b) {
    console.log(a + b)
}
(function(f) {
    let a = 20
    f(20); // 30
})(fn)
```

