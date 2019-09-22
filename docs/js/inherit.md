# 类的继承

在 `ES6` 出现以前，想着给 `JavaScript` 提供“类”的支持，其实并不容易。 `JavaScript` 中并不存在 `class`，存在的只是**原型链**，都是通过函数和 `prototype` 去封装一些东西来模拟“类”。可以说任何一个函数都可以被视为一个“类”。

关于构造函数/原型/实例之间的关系可以由下图表示：

![原型和原型链](http://ww4.sinaimg.cn/large/006y8mN6gy1g78eblpt5yj30h80j2td2.jpg)

继承的方法中，使用的父类示例如下：

```js
function Animal (name) {
    this.name = name;
}
Animal.prototype.showName = function () {
    conosle.log(this.name);
}
```

### 私有属性/方法

构造函数里定义的函数，即为私有方法；而在构造函数里用var声明的变量，也相当于是私有变量。

```js
function Animal (name) {
    this.name = name;
    // 私有属性
    let color = 'red';
    // 私有方法
    function showColor () {
        alert(color);
    }
    // 构造器内调用私有方法
    showColor();
}
```

可以在构造函数内部定义 get 和 set 方法，用于访问和设置私有属性。

```js
function Animal () {
    let name = 'cat';
    this.getName = function () {
        return name;
    }
    this.setName = function (newName) {
        name = newName;
    }
}
let cat = new Animal();
cat.setName('mi');
```

### 静态属性/方法

静态就是不由实例调用，只能用类名调用。

```js
function Animal (name) {
    this.type = '1';
};

// 添加静态属性
Animal.color = 'red';

// 添加静态方法
Animal.showName = function () {
    console.log(this.color);  // 'red'
    console.log(this.type);   // undefined
}

Animal.showName();
```

静态类中的 `this` 指 构造函数 `Animal`，只能访问到静态属性/方法，不能访问到私有属性/方法。

### 原型链继承

将父类的实例作为子类的原型。

```js
function Cat () {};
Cat.prototype = new Animal();
```

特点：

1. 父类增加原型属性/方法，子类实例都能访问到；
2. 子类的实例也是父类的实例。

缺点：

1. 不能向父类构造函数传参；
2. 如果在原型中添加属性/方法，需要在 new Animal() 执行之后；
3. 原型上的属性被所有实例共享；

实例共享属性示例如下：

```js
function Animal (name) {
    this.name = name;
}

let cat1 = new Cat();
cat1.type.push(2);
let cat2 = new Cat();
cat2.type; // [1, 2]
```

### 构造继承

使用父类的构造函数增强子类实例，实例化的时候调用父类的构造函数，将父类的实例属性复制给子类。

```js
function Cat (name) {
    Animal.apply(this, arguments);
}

let cat = new Cat('ly', 1);
console.log(cat.name, cat.age); // 'ly', 1
cat.showName();  // TypeError: cat.showName is not a function;
cat instanceof Animal;  // false
```

特点：

1. 创建实例时可以传参；
2. 子类实例不再共享父类引用属性；

缺点：

1. 实例不是父类的实例；
2. 只能继承父类的私有属性/方法，不能继承父类原型上的属性/方法；
3. 无法实现函数的复用，每个子类都有父类实例函数的副本，影响性能。

### 拷贝继承

遍历父类实例的所有私有和公有属性/方法，加到子类的私有属性上，和原型链没有关系。

```js
function Cat () {
    let animal = new Animal();
    for (let key in animal) {
        this[key] = animal[key];
    }
    animal = null;
}
```

缺点：

1. 每次创建实例都需要遍历属性，效率较低；
2. 不能复制不可枚举属性。

### 组合继承

在构造函数中调用父类的构造函数，实现私有属性/方法，再将父类实例作为子类的原型，继承公有属性/方法。

```js
function Cat (name) {
    Animal.call(this);
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
```

特点：

1. 可继承私有属性/方法，也可继承公有属性/方法；
2. 既是父类的实例也是子类的实例。

缺点：

1. 两次调用父类构造函数，生成两份实例，子类的属性覆盖了原型上的属性。

### 寄生组合继承

在构造函数中调用父类构造函数，实现私有属性继承。创建父类原型对象副本，赋值给子类的原型，继承原型上的属性和方法。

```js
function Cat () {
    Animal.apply(this, arguments)
}
let prototype = Object.create(Animal.prototype);
prototype.constructor = Cat;
Cat.prototype = prototype;
```

特点：

1. 只调用一次构造函数，效率更高；
2. 可以向构造函数传递参数，是比较完美的方法。

`Object.create` 方法返回一个对象，原型指向传入的对象。考虑 ES5 的兼容性，可以封装：

```js
function createObj (obj) {
    function F () {};
    F.prototype = obj;
    return new F();
}
```























