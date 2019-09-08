+ `Symbol` 作为构造函数来说并不完整，因为不支持语法 `new Symbol()`，但其原型上拥有 `constructor` 属性，即 `Symbol.prototype.constructor`。
+ 引用类型 `constructor` 属性值是可以修改的，但是对于基本类型来说是只读的，当然 `null` 和 `undefined` 没有 `constructor` 属性。
+ `__proto__` 是每个实例上都有的属性，`prototype` 是构造函数的属性，这两个并不一样，但  `p.__proto__` 和 `Parent.prototype` 指向同一个对象。
+ `__proto__` 属性在 `ES6` 时被标准化，但因为性能问题并不推荐使用，推荐使用 `Object.getPrototypeOf()`。
+ 每个对象拥有一个原型对象，通过 `__proto__` 指针指向上一个原型 ，并从中继承方法和属性，同时原型对象也可能拥有原型，这样一层一层，最终指向 `null`，这就是原型链。

