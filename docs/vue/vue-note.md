# Vue开发记录2

### nextTick

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

```js
methods: {
    changeTitle () {
        this.title = 'H1';
        // Dom 为更新
        this.$nextTick(function () {
            // Dom 更新了
        })
    }
}
```

### 图片懒加载

vue-lazyload 插件。[https://github.com/hilongjw/vue-lazyload](https://github.com/hilongjw/vue-lazyload)

```js	
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
    loading: 'loading.png'
})
```

 ```vue
<img v-lazy='imgurl' />
 ```

### watch

监听数据变化，数据必须是 data / computed 或者 props 选项中的数据。

```js
created () {
    this.n = 0
},
watch: {
    n (newVal) {
        
    }
}
// 监听不到 n 的变化
```

可以监听到 vuex 中 state 的变化，如果数据是对象，可以使用深度监听

```js
watch: {
    '$store.state.obj': {
        handler: function (obj) {
            
        },
        deep: true
    }
}
```

监听 props ，对第一次传入 prop 时无效，使用 immediate。

```js
watch: {
    obj: {
        handler: function (obj) {
            
        },
        immediate: true
    }
}
```

> 注意：在变异 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变异之前值的副本。

watch 对象，键是需要观察的表达式，值是对应回调函数，也可以是方法名，或者包含选项的对象，或者数组。

```js
export default {
  watch: {
    // 方法名
    b: 'someMethod',
    // 对象 深度 watcher
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
    // 数组
    e: [
      'handle1',
      function handle2 (val, oldVal) { /* ... */ },
      {
        handler: function handle3 (val, oldVal) { /* ... */ },
        /* ... */
      }
    ],
  }
}
```



[`vm.$watch`](https://cn.vuejs.org/v2/api/#vm-watch) API

### vuex

文件

```js
--store
----index.js  入口文件
----state.js  状态
----mutations.js
----mutation-types.js   mutaion相关常量
----actions.js  
----getter.js  获取 state 映射
```

### mapGetters 不返回最新值

```js
computed: {
	...mapGetters(['singer'])
},
```

得到的值始终是第一次获取到的值。

因为在 state.js 中没有对 singer 赋初始值。

```js
const state = {
  singer: {}
}

export default state
```

### 处理 mapGetters 获取的数据

凡是需要处理vuex的getter中的数据，均在beforeUpdate或者update阶段进行，或者用 watch

### 获取组件的 element 

比如 <scroll/> 组件，要获取到 dom 元素

```vue
<template>
	<scroll ref="list"/>
</template>
<script>
    mouted () {
        this.$refs.list.$el  //表示 <scroll> 渲染后的 dom 节点
    }
</script>
```

### js-base64

[js-base64](https://github.com/dankogai/js-base64)

```js
import {Base64} from 'js-base64'
```

### ref

通过 ref 引用找到组件实例，可以直接使用组件内部定义的方法。

```vue
<template>
	<title ref="title" />
</template>
<script>
    export default {
        created () {
            this.$refs.title.methods()
        }
    }
</script>
```

### 阻止事件冒泡

```html
<div @click="fn">
    <div class="content" @click.stop>
        <!-- ... -->
    </div>
</div>
```

点击事件冒泡在 .content 处被拦截。

### 选项顺序

[vue 风格指南 - 实例的选项顺序](https://cn.vuejs.org/v2/style-guide/index.html#%E7%BB%84%E4%BB%B6-%E5%AE%9E%E4%BE%8B%E7%9A%84%E9%80%89%E9%A1%B9%E7%9A%84%E9%A1%BA%E5%BA%8F-%E6%8E%A8%E8%8D%90)

```
el: '',
name: '',
functional: true,
components: {},
directives: {},
filters: {},
extends: {},
mixins: [],
props: [],
data: () => {},
computed: {},
watch: {},
生命周期钩子 (按照它们被调用的顺序),
methods: {},
template / render
```

### 获取父组件的属性和事件

- vm.$attrs：可以获取到父组件传递的除class和style外的所有自定义属性。
- vm.$listeners：可以获取到父组件传递的所有自定义事件

```vue
<my-component 
    :msg="message"
    :title="articleTitle"
    @confirm="func1"
    @cancel="func2"
</my-component>
```

就可以在子组件中获取父组件传递的属性和事件，而不用在props中定义。

```js
created() {            
    const msg = this.$attrs.msg; // 获取父组件传递的msg
    this.$listeners.confirm && this.$listeners.confirm(); //若组件传递事件confirm则执行
}
```

### 本地样式和全局样式混用

在一个组件中使用两个 `<style>` 标签，有 `scoped` 表示局部样式。

```vue
<style scoped></style>
<style></style>
```

### 深度作用选择器

在 `scoped` 样式中使用 `>>>` 可对子组件起作用。

```vue
<style scoped>
    .container >>> .content {}
</style>
```

### 声命周期

vue 实例完整的声命周期是：开始创建、初始化数据、编译模版、挂载 dom、渲染、卸载等。

| 声命周期钩子  | 组件状态                                                     | 最佳实践                             |
| :------------ | ------------------------------------------------------------ | ------------------------------------ |
| beforeCreate  | 1，实例初始化之后，this 指向实例。<br />2，不能访问到 data、computed、watch、methods。 | 常用于初始化非响应式变量             |
| crated        | 1，实例创建完成。<br />2，可以访问到 data、computed、watch、methods。<br />3，未挂载到 DOM，不能访问到 `$el` 属性，`$ref` 为空数组。 | 常用于 ajax 请求                     |
| beforeMount   | 1，挂载之前，找到对应的 template，编译成 render 函数。       | -                                    |
| mouned        | 1，实例挂载到 DOM 上，可通过 DOM API 操作节点。<br />2，`$ref` 属性可以访问。 | 操作 DOM                             |
| deforeUpdate  | 1，数据更新时，虚拟 DOM 打补丁之前。                         | 访问现有 DOM，移除事件监听           |
| updated       | 1，虚拟 DOM 重新渲染。<br />2，组件 DOM 已经更新。           | 操作更新后的 DOM                     |
| activated     | 1，keep-alive 组件被激活                                     |                                      |
| deactivated   | 1，keep-alive 组件被停用                                     |                                      |
| beforeDestroy | 1，实例销毁前，组件实例完全可用。                            | 销毁定时器、接棒全局事件、销毁插件等 |
| destroyed     | 1，实例销毁后，包括所有子实例。                              | -                                    |

### 程序化的事件侦听

```js
this.$on(eventName, handler)
this.$once(eventName, handler)
this.$off(eventName, handler)
```

```js
const timer = setInterval(() =>{                    
    // 某些定时器操作                
}, 500);            
// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
this.$once('hook:beforeDestroy', () => {            
    clearInterval(timer);                                    
});
```

### 记录页面滚动位置

```js
scrollBehavior (to, from, savedPosition) {
    // 如果通过浏览器自带的前进后退按钮切换的路由，那么会自动使用浏览默认的回滚上次页面的浏览位置。
    if (savedPosition) {        
          return savedPosition    
    } else {    
         // 通过keep-alive缓存的组件，在路由的meta中添加一个savedPosition字段
         // 打开一个页面，该页面的组件路由中meta.savedPosition为undefined的话，则页面滚动到（0,0）的位置
         // 路由的meta.savedPosition有值的话，则滚动到上次浏览的位置，
         // 因为meta.savedPosition保存的就是上次浏览的位置
          if (from.meta.keepAlive) {        
               from.meta.savedPosition = document.body.scrollTop;      
          }        
          return { x: 0, y: to.meta.savedPosition || 0 }    
    }  
}
```

### 进度条组件

nprogress

### 自定义组件的双向绑定

```vue
// 父组件
<my-com v-modal="msg" />

// 子组件
<div @click="confirm"></div>
<script>
    export default {
        modal: {
            prop: 'show',
            event: 'changed'
        },
        props: {
            show: {
                type: Blooean,
                default: false
            }
        },
        methods: {
            confirm() {
                this.$emit('changed', false)
            }
        }
    }
</script>
```

`v-modal` 只能使用一次，多个属性双向绑定可以使用 `.sync`。

```vue
// 父组件
<my-com :show.sync="msg" />

// 子组件
<div @click="confirm"></div>
<script>
    export default {
        props: {
            show: {
                type: Blooean,
                default: false
            }
        },
        methods: {
            confirm() {
                this.$emit('update:show', false)
            }
        }
    }
</script>
```

### 刷新页面

通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的。

```vue
<script>
    export default {
        method: {
            refresh() {
                this.$router.replace('/refresh')
            }
        }
    }
</script>
```

```js
{
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$router.replace(from.fullPath)
        })
    }
}
```

### 多个元素条件渲染

```html
<template v-if="true">
	<div>1</div>
  <p>2</p>
</template>
```

### 对象的迭代

```html	
<ul>
  <li v-for="(val, key, index) in obj">{{val}}</li>
</ul>
```

### v-once

通过 `v-once` (无表达式) 执行一次性的插值，当数据改变时，插值内容不在更新。[v-once](https://cn.vuejs.org/v2/api/#v-once)

```vue
<span v-once>{{ msg }}</span>
```

### 通过 key 属性强制替换元素

`key` 属性不止是与 `v-for` 结合使用，它也可以用于强制替换元素/组件而不是重复使用它。可以完整的处罚组件的生命周期钩子，触发过渡。

```vue
<my-component :key="id"></my-component>

<transition>
	<span :key="text">{{ text }}</span>
</transition>
```

### 带有 v-for 的 \<template\>

类似于 `v-if` ，可以利用带有 `v-for` 的 `<template>` 来循环渲染一段包含多个元素的内容。

```vue
<template v-for="item in items">
	<span>{{ item.name }}</span>
	<span>{{ item.msg }}</span>
</template>
```

### `$event` 访问原始 DOM 事件

```vue
<button @click="warn('Form cannot be submitted yet.', $event)">
  submit
</button>
```

### v-on 对象语法

```html
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
```

### 事件修饰符顺序

事件修饰符可以串联，但是使用顺序不同效果不同。`@click.prevent.self` 会阻止所有的点击，而 `@click.self.prevent` 只会阻止对元素自身的点击。

### `.once` 修饰符

不像只对原生 DOM 事件起作用的修饰符，`.once` 可以用在自定义的事件上。

### 绑定值

对于单选按钮，复选框及选择框的选项，`v-model` 绑定的值通常是静态字符串 (对于复选框也可以是布尔值)，但是有时我们可能想把值绑定到 Vue 实例的一个动态属性上，这时可以用 `v-bind` 实现，并且这个属性的值可以不是字符串。

```vue
<!-- 复选框 -->
<input type="checkbox" v-model="val" true-value="yes" false-value="no" />
```

```vue
<!-- 单选框 -->
<input type="radio" v-model="val" :value="a" />
```

选中时 `vm.val === vm.a`。

```vue
<!-- 选择框 -->
<selection v-model="selected">
	<option :value="{ num: 123 }">123</option>
</selection>
```

选中时，vm.selected = { num: 123 }; typeof vm.selected === 'object'`。

### 表单修饰符

在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步。添加 `lazy` 修饰符，从而转变为使用 `change`事件进行同步。

```vue
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
```

即使在 `type="number"` 时，HTML 输入元素的值也总会返回字符串。如果这个值无法被 `parseFloat()` 解析，则会返回原始的值。

```vue
<input v-model.number="age" type="number">
```

自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符。

```vue
<input v-model.trim="msg">
```

### 自定义事件接收参数

子组件可以通过调用内建的 [**$emit** 方法](https://cn.vuejs.org/v2/api/#vm-emit) 并传入事件名称来触发一个事件，用第二个参数来抛出一个特定的值。如果在父级组件以内联语句监听这个事件的时候，可以通过 `$event` 访问到被抛出的这个值：

```vue
<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>
```

### props 验证

props 在组件实例创建**之前**进行验证。

+ 多个类型

```js
export default {
  props: {
    propA: [String, Number]
  }
}
```

+ 自定义函数

```js
export default {
  props: {
    propC: {
      validator: function(v) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
}
```

+ 构造函数

```js
export default {
  props: {
    propsC: Person
  }
}
```

Person 为一个自定义的构造函数。

### prop 合并

从外部提供给组件的值会替换掉组件内部设置好的值，style 和 class 会合并。

### prop 禁用继承

适合配合实例的 `$attrs` 属性使用。手动决定这些特性会被赋予哪个元素，而不是所有属性都加在跟元素上。

```js
Vue.component('my-component', {
  inheritAttrs: false,
  template: '<div><input v-bind="$attr"/></div>'
})
```

> `inheritAttrs: false` 选项**不会**影响 `style` 和 `class` 的绑定。

### .sync 绑定多个属性

```vue
<text-document v-bind.sync="doc"></text-document>
```

这样会把 `doc` 对象中的每一个属性 (如 `title`) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 `v-on` 监听器。

```vue
<!-- 绑定一个值 -->
<text-document doc.sync="doc"></text-document>
```

### 定义模版

+ inline-template 内联模版，模版更加灵活，但作用域更加难以理解。

```vue
<my-component inline-template>
   <p>These are compiled as the component's own template.</p>
</my-component>
```

+ x-template

### 过滤器参数

过滤器是 JavaScript 函数，因此可以接收参数

```html
{{ message | filterA('arg1', arg2) }}
```

其中 `message` 的值作为第一个参数，普通字符串 `'arg1'` 作为第二个参数，表达式 `arg2` 的值作为第三个参数。

### 在异步函数中使用 $nextTick

因为 `$nextTick()` 返回一个 Promise 对象。

```js
Vue.component('com', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: '没有更新'
    }
  },
	methods: {
    updateMessage: async function () {
      this.message = '更新完成'
      console.log(this.$el.textContent) // => '没有更新'
      await this.$nextTick()
      console.log(this.$el.textContent) // => '更新完成'
    }
  }
})
```

### 删除响应式对象的属性

`vm.delete(target, key)` 和 `Vue.delete(target, key)`，可以删除响应式对象的属性，并触发更新。target 可以是数组。

### 自定义指令生命周期

在 bind钩子函数中第一个参数为 el，用来操作 dom节点，但是执行 `el.focus()`无效，但利用定时器或 `nextTick` 延迟执行可以。（如果在 `el.focus` 前加 `debugger` 断点，不能聚焦，这应该跟指令无关）。放在 inserted 钩子函数中可以。

```js
Vue.directive('focus', function(el) {
  el.focus();
  Vue.nextTick(() => {
    el.focus();
  });
  setTimeout(() => {
    el.focus();
  });
});
```

### 自定义选项

在选项中包含自定义属性，可以用 `vm.$options` 访问。

```js
new Vue({
  customOption: 'foo',
  created: function () {
    console.log(this.$options.customOption) // => 'foo'
  }
})
```

### data 选项

以 `_` 或 `$` 开头的属性 **不会** 被 Vue 实例代理，因为它们可能和 Vue 内置的属性、API 方法冲突。可以使用例如 `vm.$data._property` 的方式访问这些属性。

如果为 `data` 属性使用了箭头函数，则 `this` 不会指向这个组件的实例，不过你仍然可以将其实例作为函数的第一个参数来访问。

```js
data: vm => ({ a: vm.myProp })
```

### `$on` 监听自己触发的自定义事件

```vue
<template>
  <div>
    <button @click="handleEmitEvent">触发自定义事件</button>
  </div>
</template>
<script>
  export default {
    methods: {
      handleEmitEvent () {
        // 在当前组件上触发自定义事件 test，并传值
        this.$emit('test', 'Hello Vue.js')
      }
    },
    mounted () {
      // 监听自定义事件 test
      this.$on('test', (text) => {
        window.alert(text);
      });
    }
  }
</script>
```






















