###  项目

```shell
$ vue init webpack projectName
$ cd projectName
$ npm run dev
```

### MVVM

是 Model-View-ViewModel 的缩写，Model 层表示数据模型，包含数据和业务逻辑；View 层表示视图；View-Model 对象通过数据双向绑定将 View 和 Model 联系起来，它们之间同步完全自动完成，开发者只需关注数据和逻辑。

### 创建实例

```html
<div id='root'></div>
```

```js
import Vue from 'vue'

new Vue({
  el: '#root',
  template: '<h1>hello {{msg}} </div>',
  data: {
    msg: 'hello world'
  }
})
```

参数是一个对象，对象内的 el, template 等是组件选项。

挂载点是 Vue内 el 指的标签。挂载点里面的内容叫模版。Vue实例只会去处理挂在点内的内容。模版可以写在挂在点内，也可以下载实例的 template 中。

### 实例中的数据和事件

data 属性的值就是数据。模版中使用**插值表达式**显示数据，也可以使用 **v-text** 和 **v-html** 指令。

v-on:click="handleClick" 点击事件。**v-on** 可以用 @ 替换。

方法写在 methods 属性里。

```html
<div id='root' v-on:click="handleClick">{{msg}}</div>
```

```js
new Vue({
  el: '#root',
  data: {
    msg: 'hello world'
  },
  methods: {
    handleClick: function () {
      this.msg = 'world'
    }
  }
})
```

### 属性绑定和数据双向绑定

使用 **v-bind:** 将属性和变量绑定。可以简写成 ‘:’。作用是父组件给子组件传值。    

```html
<div id='root' v-bind:title="title">hello world</div>
```

其中等号后不再是字符串，而是一个表达式。

```js
new Vue({
  el: '#root',
  data: {
    title: 'hello world'
  }
})
```

使用 **v-model** 实现双向绑定。

```
<div id="root">
	<input type="text" v-model='content'>
	<div>{{content}}</div>
</div>

<script>
	new Vue({
		el: '#root',
		data: {
			content: ''
		}
	})
</script>
```

### 指令

**v-text** 可避免页面出现 {{}}。

```vue
<span>{{message}}</span>
<span v-text='message'></span>
```

### 计算属性和侦听器

对于任何复杂逻辑，都应当使用**计算属性**，不同的是计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。写在 **computed** 属性里。

**侦听属性**。当你有一些数据需要随着其它数据变动而变动时使用。写在 **watch** 属性里。

```vue
<div id="root">
	姓：<input type="text" v-model='firstName'>
	名：<input type="text" v-model='lastName'>
	<div>{{fullName}}</div>
	<div>{{count}}</div>
</div>

<script>
	new Vue({
		el: '#root',
		data: {
			firstName: '',
			lastName: '',
			count: 0
		},
		computed: {
			fullName: function () {
				return this.firstName + this.lastName;
			}
		},
		watch: {
			firstName: function () {
				this.count ++ ;
			},
			lastName: function () {
				this.count ++;
			}
		}
	})
</script>
```

计算属性默认只有 `getter` 函数。可以添加 `setter` 函数。

```js
computed: {
    fullName: {
        get() {
            return this.firstName + this.lastName
        },
        set(newFullName) {
			var names = newValue.split(' ')
             this.firstName = names[0]
             this.lastName = names[names.length - 1]
         }
    }
}
```

### v-if, v-show, v-for

v-if 是条件渲染。

```vue
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

其中 type 是一个变量。类似于 v-else，v-else-if 也必须紧跟在带 v-if 或者 v-else-if 的元素之后。

`v-if="false"` 和 `v-show="false"` 都可以隐藏内容，前者是直接 remove, 后者是 `display: none`。

### 模版

模版写法：

```vue
<div id="#app">
    <h2>template</h2>
</div>
<template id='tpl1'></template>
<script id='tpl2' type='x-template'></script>

<script>
    let app = new Vue({
        el: '#app',
        template: '<h2>123</h2>',
        template: '#tpl1',
        template: '#tpl2'
    })
</script>
//没有template属性，则模版是 #app 的内容
```

### 全局组件

```vue	
<script>
    Vue.component('todo-item', {
        template: '<li>item</li>'
    })
    
    new Vue({
        el: '#root',
        data: {
            list: []
        },
        //components 的内容是此组件注册的子组件
        components: {
            'todo-item': TodoItem
        }，
        //template 是此组件的模版
        template: '<todo-item/>' 
    })
</script>
```

全局注册必须在根实例创建之前（new Vue）。

每一个组件都是一个 vue 实例，内部都可以有 `data`, `methods`, `computed` 等属性。

组件都有 `template` 模版，如果没有 `template` 属性，会在挂载点去找，挂载点内部的内容即为模版。

#### 命名

当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case。

当使用 PascalCase (驼峰式命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 `<todo-item>` 和 `<TodoItem>` 都是可接受的。注意，尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。

### 局部组件

使用之前需要在 vue 实例中注册。

```vue
<div>
    <todo-list v-for='(item, index) in list' :content='item' :key='index'></todo-list>
</div>
<script>
    var TodoItem = {
        props: ['content'],
        template: '<li>{{content}}</li>'
    }

    new Vue({
        el: '#root',
        data: {
            list: []
        }，
        components: {
            'todo-item': TodoItem
        }
    });
</script>
```

**局部注册的组件在其子组件中不可用**，例如，如果希望 `ComponentA` 在 `ComponentB` 中可用，则你需要这样写：

```js
var ComponentA = { /* ... */ }

var ComponentB = {
  components: {
    'component-a': ComponentA
  },
  // ...
}
```

使用模块引入：

```js
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  },
  // ...
}
```

### 子组件向父组件传值

父组件注册订阅，子组件发布订阅，父组件可以监听到子组件触发的事件，在父组件的事件函数中可以拿到传递的值。

```vue
<div>
    <todo-item 
               v-for='(item, index) in list' 
               :key='index' 
               :content='item' 
               :index='index' 
               @delete='handleDelete'></todo-item>
</div>
<script>
    Vue.component('todo-item', {
        //接收从父组件传递过来的值
        props: ['content', 'index'],
        template: '<li @click='handleClick'>{{content}}</li>',
        methods: {
            handleClick: function () {
                //主动出发 ‘delete’ 事件
                this.$.emit('delete', this.index)
            }
        }
    })
    
    new Vue({
        el: '#root',
        data: {
            list: []
        },
        methods: {
            handleDelete: function (index) {
                this.list.splice(index, 1)
            }
        }
    })
</script>
```

### 单文件组件

使用 vue-cli 生成的项目可以将一个 .vue 文件打包成一个 vue 组件。

父组件 TodoList.vue：

```vue
<template>
	<div>
        <todo-item v-for='(item, index) in list' :key='index' :content='item'></todo-item>
    </div>
</template>

<script>
    import TodoItem from './Todo-item'
    export default {
        name: 'todo-list',
        components: {
            'todo-item': TodoItem
        },
        data () {
            return {
                list: []
            }
        },
        methods: {
            handlClick() {
                this.list.push('111')
            }
        }
    }
</script>

<style>
</style>
```

data 不再是一个对象，而是一个函数。

`this.list` 是 `this.$data.list` 的缩写。

子组件 TodoItem.vue：

```vue	
<template>
	<li>{{content}}</li>
</template>
<script>
    export defautl {
        props: ['content']
    }
</script>
<styel>
</styel>
```

一个 .vue 文件中只用有一个 `<template>` 标签，有多个后者覆盖前者，组件中 `template` 无效。

### 组件边界情况

#### 访问父组件实例

子组件访问父级可以使用 `$parent`，访问根组件使用`$root`，如果有深层嵌套可能会写成：

```js
var map = this.$parent.map || this.$parent.$parent.map
```

这种情况可以使用依赖注入。

#### 依赖注入

`provide` 选项允许我们指定我们想要**提供**给后代组件的数据/方法。

```js
provide: function () {
  return {
    getMap: this.getMap
  }
}
```

在后代组件中使用 `inject` 选项来接收指定的我们想要添加在这个实例上的属性：

```js
inject: ['getMap']
```

依赖注入缺点：

+ 耦合性更高，不利于重构。
+ 属性是非响应式的。(可以考虑使用 vuex)

#### 程序化的事件侦听器

你可能经常看到这种集成一个第三方库的模式：

```js
// 一次性将这个日期选择器附加到一个输入框上
// 它会被挂载到 DOM 上。
mounted: function () {
  // Pikaday 是一个第三方日期选择器的库
  this.picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })
},
// 在组件被销毁之前，
// 也销毁这个日期选择器。
beforeDestroy: function () {
  this.picker.destroy()
}
```

应该通过一个程序化的侦听器解决这两个问题：

```js
mounted: function () {
  var picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })

  this.$once('hook:beforeDestroy', function () {
    picker.destroy()
  })
}
```

### 全局样式

在 `<style>` 中写的样式会对父组件生效。

### 局部样式

在 `<style>` 标签上加 `scropd` 属性，表示此样式只对当前组件有效。

```vue
<template></template>

<script></script>

<style scoped></style>
```

### Style



### Class

#### 对象语法

传给 `v-bind:class` 一个对象，以动态地切换 class：

```vue
<div :class='{active: isActive}'></div>
```

如果 `isActive` 为真，将渲染为：

```vue
<div class='active'></div>
```

`v-bind:class` 指令也可以与普通的 class 属性共存。当有如下模板:

```vue
<div class='static' :class="{ active: isActive, 'text-danger': hasError }"></div>
```

#### 数组语法

把一个数组传给 `v-bind:class` 。

```vue
<div :class='[activeClass, errorClass]'></div>
```

```js
data: {
    activeClass: 'active',
    error: 'text-danger'
}
```

#### 组件class

给一个自定义组件添加 `class` 属性时，这些类会添加到该组件的根元素上，这个元素已经存在的类不会被覆盖。

```vue
<script>
Vue.component('my-component', {
	template: '<p class="bar">Hi</p>'
})
</script>
```

使用它时，添加一些 class：

```vue
<template>
	<my-component class='baz'></my-component>
</template>
```

将会被渲染为：

```html	
<p class='bar baz'></p>
```

### 条件渲染

#### v-if

在 `<template>` 元素上使用 `v-if` 用来渲染分组。此时 `<template>` 元素当作时不可见的包裹元素，最终渲染结果将不包含 `<template>`。

```vue	
<template v-if='ok'>
	<h1>Title</h1>
	<p>paragraph</p>
</template>
```

`v-else`, `v-else-if` 都必须跟在 `v-if` 或 `v-else-if` 之后。

#### 用 `key` 管理可复用的元素

Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。如果你允许用户在不同的登录方式之间切换：

```vue
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

那么在上面的代码中切换 `loginType` 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，`<input>` 不会被替换掉——仅仅是替换了它的 `placeholder`。

如果需求时“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 `key` 属性即可：

```vue
<template v-if="loginType === 'username'">
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

####`v-if` vs `v-show`

`v-if` 是“真正”的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

`v-show` 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

> 注意，`v-show` 不支持 `<template>` 元素，也不支持 `v-else`。

### 列表渲染

#### v-for

`v-for` 指令需要使用 `item in items` 形式的特殊语法。

`v-for` 还支持一个可选的第二个参数为当前项的索引。

```vue
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

```js
data: {
    items: [{
        message: 'hello'
    }, {
        message: 'world'
    }]
}
```

也可以用 `of` 替代 `in` 作为分隔符，因为它是最接近 JavaScript 迭代器的语法。

#### 对象的 `v-for`

```vue
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>

<script>
    data: {
        object: {
            firstName: 'John',
            lastName: 'Doe'
        }
    }
</script>
```

结果：

+ Jone
+ Doe


有第二个，第三个可选参数：

```vue
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }}: {{ value }}
</div>
```

#### 数组变异方法

Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

#### 替换数组

非变异 (non-mutating method) 方法，例如：`filter()`, `concat()` 和 `slice()` 。这些不会改变原始数组，但**总是返回一个新数组**：

```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的、启发式的方法，所以以上用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

#### 注意事项

由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

1. 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

解决一：

```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
//使用vm.$set 实例方法，该方法是全局方法 Vue.set 的一个别名
vm.$set(vm.items, indexOfItem, newValue)
```

解决二:

```js
vm.items.splice(newLength)
```

#### 对象更改注意

还是由于 JavaScript 的限制，**Vue 不能检测对象属性的添加或删除**。

可以使用 `Vue.set(object, key, value)` 方法向嵌套对象添加响应式属性。

```js
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```

```js
Vue.set(vm.userProfile, 'age', 27)
```

如使用 `Object.assign()` 或 `_.extend()，`应该用两个对象的属性创建一个新的对象。

```js
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

#### 取值范围的 v-for

v-for` 也可以取整数。在这种情况下，它将重复多次模板。

```
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
```

结果：1 2 3 4 5 6 7 8 9 10

###事件

`v-on` 指令接方法名。

```vue
<div :click='fn'></div>
```

可以在内联 Javascript 语句中调用方法：

```vue
<div :click="say(hi)">say hi</div>

<script>
new Vue({
	el: '#root',
    methods: {
        say: function (msg) {
            console.log(msg)
        }
    }
})
</script>
```

#### 事件修饰符

Vue.js 为 `v-on` 提供了**事件修饰符**。之前提过，修饰符是由点开头的指令后缀来表示的。

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`
- `.once`
- `.passive`
- `.native`

`.capture` 使用时间捕获，元素自身触发的事件先在此处处理，然后才交由内部元素进行处理。

`.native` 在某个组件的根元素上监听一个原生事件。可以使用 v-on 的修饰符 .native。给普通的HTML标签监听一个事件，添加 .native 修饰符是不会起作用的。

[事件修饰符事例](https://blog.csdn.net/weixin_35103712/article/details/64499513)

#### 自定义事件

事件名不存在任何自动化的大小写转换，事件名需要完全匹配监听这个事件所用的名称，事件监听器在 DOM 模板中会被自动转换为全小写 ，推荐**始终使用 kebab-case 的事件名**。

```vue
<my-component v-on:my-event="doSomething"></my-component>
// this.$emit('my-event')
```

Vue 提供了一个 `$listeners` 属性，它是一个对象，里面包含了作用在这个组件上的所有监听器。例如：

```
{
  focus: function (event) { /* ... */ }
  input: function (value) { /* ... */ },
}
```

 配合 `v-on="$listeners"` 将所有的事件监听器指向这个组件的某个特定的子元素。

```vue
<input-box v-on="$listeners" />
```

#### .sync 修饰符

双向绑定会带来维护上的问题，推荐使用触发事件的方式由子组件向父组件传参。`.sync` 修饰符和 `v-bind` 配合使用实现双向绑定。[.sync 修饰符](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)

```vue
<text-document v-bind:title.sync="doc.title"></text-document>
<text-document v-bind.sync="doc"></text-document>
```

### 表单

使用 `v-model` 在表单元素上创建双向数据绑定，会忽略所有表单元素的 `value`, `cehecked`, `selected` 的**初始值**。

在文本区域插值 (`<textarea></textarea>`) 并不会生效，应用 `v-model` 来代替。

#### 复选框

单个复选框绑定到布尔值，value 属性无效。

```vue
<input type="checkbox" v-model="checkboxVal" />
<script>
    data () {
        return {
            checkboxVal: true
        }
    }
</script>
```

多个复选框绑定到数组。

```vue
<template>
<input type="checkbox" value="one" v-model="checkboxVal" />
<input type="checkbox" value="two" v-model="checkboxVal" />
</template>
<script>
    data () {
        return {
            checkboxVal: []
        }
    }
</script>
// 选中后得到 ['one', 'two']
```



#### 修饰符

**.lazy: **`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 ，你可以添加 `lazy` 修饰符，从而转变为使用 `change` 事件进行同步。

**.trim: **如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符。

**.number: **如果想自动将用户的输入值转为数值类型，HTML 输入元素的值也总会返回字符串。

### Prop

Prop 是你可以在组件上注册的一些自定义特性。当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop。

使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名。使用字符串模板，那么这个限制就不存在了。

```js
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```

```vue
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```

#### 传入一个对象

```vue
<!-- 即便对象是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:comments="{ id: 1, title: 'My Journey with Vue' }"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:post="post"></blog-post>
```

#### 传入布尔值

```vue
<blog-post :is-published="true"/>
<blog-post is-published />
```

无值表示传入 true 。

#### 传入对象的所有属性

将一个对象的所有属性都作为 prop 传入，你可以使用不带参数的 `v-bind` (取代 `v-bind:prop-name`)。例如，对于一个给定的对象 `post`：

```js
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

下面的模板：

```vue
<blog-post v-bind="post"></blog-post>
```

等价于：

```vue
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```

#### Prop验证

为 `props` 中的值提供一个带有验证需求的对象，而不是一个字符串数组。例如：

```js
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 匹配任何类型)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

`type` 可以是下列原生构造函数中的一个：

- `String`
- `Number`
- `Boolean`
- `Function`
- `Object`
- `Array`
- `Symbol`

#### 禁用特性继承

组件可以接受任意的特性，而这些特性会被添加到这个组件的根元素上。在组件的选项中设置 `inheritAttrs: false`  可以阻止继承。[禁用特性继承](https://cn.vuejs.org/v2/guide/components-props.html#%E7%A6%81%E7%94%A8%E7%89%B9%E6%80%A7%E7%BB%A7%E6%89%BF)

`$attrs` 属性包含了传递给一个组件的特性名和特性值，可以在组件内部使用。可以手动决定这些特性会被赋予哪个元素。

```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
  `
})
```


### Watch

```js
{
  name: 'watch',
  data () {
    return {
      t: 20,
      s: ['T恤', '夹克', '棉衣'],
      index: 1
    }
  },
  methods: {
    change (c) {
      this.t += c
    }
  },
  watch: {
    t: function (now, old) {
      if (now > 30) {
        this.index = 0
      } else if (now < 10) {
        this.index = 2
      } else {
        this.index = 1
      }
    }
  }
}
```

```js
vm.$watch('val', (newVal, oldVal) => {
    
});
```

### 插槽

Vue 实现了一套内容分发的 API，这套 API 基于当前的 [Web Components 规范草案](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md)，将 `<slot>` 元素作为承载分发内容的出口。

`<slot>` 相当于接受调用组件时传的 children。

[具名插槽](https://cn.vuejs.org/v2/guide/components-slots.html#%E5%85%B7%E5%90%8D%E6%8F%92%E6%A7%BD)，[默认插槽的内容](https://cn.vuejs.org/v2/guide/components-slots.html#%E9%BB%98%E8%AE%A4%E6%8F%92%E6%A7%BD%E7%9A%84%E5%86%85%E5%AE%B9)，[作用域插槽](https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD)。

```vue
// 组件 my-com
<template>
	<div>
  	<slot name="header"></slot>
    <slot name="nav" :navList="navList"></slot>
    <slot></slot>
    <slot name="footer" :text="text"></slot>
  </div>
</template>
<script>
export default{
  data() {
    return {
      navList: ['home', 'about'],
      text: ''
    }
  }
}
</script>
```

```vue
<my-com>
	<template v-slot:header>
  	<div>header</div>
  </template>
  <template v-slot:default></template>
  <template v-slot:nav="{navList}">
  	<span v-for="item in navList">{{item}}</span>
  </template>
  <!-- 缩写 -->
  <template #footer="{text}">
		<div>{{text}}</div>
  </template>
</my-com>
```

`v-slot` 只能添加在一个 `<template>` 上，当被提供的内容*只有*默认插槽时，组件的标签才可以被当作插槽的模板来使用。

```vue
<my-com v-slot:default="slotProps">
	{{ slotProps.user.firstName }}
</my-com>
```

> `v-slot:default="slotProps"` 可以缩写成 `v-slot="slotProps"` 和 `#default="slotProps"` ，不能写成 `#="slotProps"`。

 Vue 2.6.0 之前的语法：

```vue
<my-com>
	<template slot="header">
  	<div>header</div>
  </template>
  <template slot="nav" slot-scope="{navList}">
  	<span v-for="item in navList">{{item}}</span>
  </template>
</my-com>
```

### keep-alive

我们希望那些标签的组件实例能够被在它们第一次被创建的时候缓存下来。为了解决这个问题，我们可以用一个 `<keep-alive>` 元素将其动态组件包裹起来。

```vue
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

> 注意这个 `<keep-alive>` 要求被切换到的组件都有自己的名字，不论是通过组件的 `name` 选项还是局部/全局注册。

- **Props**：

  - `include` - 字符串或正则表达式。只有匹配的组件会被缓存。
  - `exclude` - 字符串或正则表达式。任何匹配的组件都不会被缓存。

- **用法**：

  `<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 `<transition>` 相似，`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

> 当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行。

[用 include/exclude 和路由控制组件是否缓存](https://blog.csdn.net/m0_37604745/article/details/78603405)

### 过滤器

Vue.filter 注册全局过滤器，filters 选项注册局部过滤器。

```vue
<template>
	<div>
    {{count | money}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 100
    }
  },
  filters: {
    money(val) {
      return '¥' + val
    }
  }
}
</script>
```

```js
Vue.filter('money', function(val) {
  return '$' + val
})
```

### 自定义指令

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

```js
// 注册一个局部指令
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

`inserted` 是指令对象的生命周期函数之一。

然后你可以在模板中任何元素上使用新的 `v-focus` 属性，如下：

```vue
<input v-focus>
```

#### 钩子函数

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。

#### 钩子函数参数

- `el`：指令所绑定的元素，可以用来直接操作 DOM 。

- `binding` ：一个对象，包含以下属性：

  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。

- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-%E6%8E%A5%E5%8F%A3) 来了解更多详情。

- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

> 除了 `el` 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 [`dataset`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset) 来进行。

#### 函数简写

在很多时候，你可能想在 `bind` 和 `update` 时触发相同行为，而不关心其它的钩子。比如这样写:

```js
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

### 混入

混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

###  API

#### Vue.set()

- **参数**：
  - `{Object | Array} target`
  - `{string | number} key`
  - `{any} value`
- **返回值**：设置的值。

因为 Vue 无法探测普通的新增属性，用此方法向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。或者更改对象的某个key 的 value 值，或者更改数组的某和元素。

```js
let app = new Vue({
    data: {
        arr: [1,2,3]
    }
})
Vue.set(app.arr, 2, 'b')
// 将 arr[2] 改成 ‘b'，且会触发视图更新
```

### Vue 按需加载

webpack中提供了require.ensure()来实现按需加载。以前引入路由是通过import 这样的方式引入，改为const定义的方式进行引入。

```js
 // 不进行页面按需加载引入方式：
import home from '../../common/home.vue'

// 进行页面按需加载的引入方式：
const home = r => require.ensure( [], () => r (require('../../common/home.vue')))
```

### Vue Jsx

[vue jsx](https://github.com/vuejs/jsx) 可以实现在 render 函数中直接使用 jsx 语法，通过 loader 的处理，效果和 render 函数一样。

```jsx
export default {
  props: ['name'],
  methods: {
    showName() {
      alert(this.name)
    }
  },
  render: function(h) {
    return <span onClick={this.showName}>{this.name}</span>
    // return <span onClick="showName">{this.name}</span> 报错，插件只是处理 jsx 部分，
    // 最终还是会编译成 render 函数，整个组件还是 vue。前者表示 vue 实例中的一个方法，
    // 后者表示全局作用域下的一个函数。
  }
}
export default {
    props: ['name'],
    data() {
        return {
            inpVal: ''
        }
    },
    methods: {
        showName() {
            alert(this.name)
        }
    },
    render: function(h) {
        return <div>
            <input type="text" vModel={this.inpVal}/>
            <span onClick={this.showName}>{this.name}</span>
            <b>{this.inpVal}</b>
        </div>
        // 事件写成 <span onClick="showName">{this.name}</span> 会报错，插件只是处理 jsx 部分，
        // 最终还是会编译成 render 函数，整个组件还是 vue。前者表示 vue 实例中的一个方法，
        // 后者表示全局作用域下的一个函数。
    }
}
```

```json
"@vue/babel-helper-vue-jsx-merge-props": "^1.0.0-beta.3",
"@vue/babel-preset-jsx": "^1.0.0-beta.3",
"vue": "^2.5.21",
```

render 函数中的参数 `h` 不能少，否则报错。但从 Vue 的 Babel 插件的 [3.4.0 版本](https://github.com/vuejs/babel-plugin-transform-vue-jsx#h-auto-injection)开始会自动注入 `const h = this.$createElement` 。

### $emit() 返回值

`this.$emit('event', val)` 的返回值是 `this`。如果需要使用事件函数的返回值，不能在事件函数中使用 `return` ,可以传一个回调函数，让事件函数调用。

```vue
// 子组件 my-com
<script>
this.$emit('change', e.target.value, val => {
  console.log(val)
  // val + 'hello'
})
</script>

// 父组件
<template>
	<my-com @change="fn"></my-com>
</template>
<script>
{
  mathods: {
    fn(val, cb) {
      cb(val + 'hello')
      // return val + 'hello' 无效
    }
  }
}
</script>
```












