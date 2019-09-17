## Vuex

vuex 和单纯的全局对象区别：

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。

### State

Vuex 使用 **单一状态树**，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 ([SSOT](https://en.wikipedia.org/wiki/Single_source_of_truth))”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

#### 获取 vuex 状态

store 实例中读取状态最简单的方法就是在[计算属性](https://cn.vuejs.org/guide/computed.html)中返回某个状态。

```js
computed: {
    count () {
        return store.state.count
    }
}
```

避免每个使用 state 的组件都需要频繁的导入，Vuex 通过 `store` 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 `Vue.use(Vuex)`）：

```js
const app = new Vue({
	el: #app,
    store
})
```

在根实例中注册 store 选项，该 store 实例会注入到所有子组件中，子组件都能通过 `this.$store` 访问到。

```js
computed: {
    conut () {
        return this.$store.state.count
    }
}
```

#### mapState

当一个组件需要获取多个状态时，可以利用 mapState 辅助函数生成计算属性。

```js
import {mapState} from 'vuex'
export default {
    // ...
    computed: {
        // ...
        ...mapState({
            count: state => state.count,
            // 字符串参数等同于 state => state.count
            countAlias: 'count'
            // 如果需要获取局部状态，使用常规函数
            countPlusLocalState: function (state) {
            	return state.count + this.localState
            }
        })
    }
    
}
```

当映射的计算属性和 state 子节点相同时，可以直接传入字符串数组。

```js
computed: {
    // 映射 this.count 为 store.state.count
    ...mapState(['count'])
}
```

### Getter

从 store 中派生出一些状态，可以在 store 中定义 getter，相当于 store 中的计算属性，只有依赖值发生改变才会重新计算。

```js
const store = new Vuex.store({
    state: {},
    getters: {
        doneTods: state => {
            return this.state.todos.filter(todo => todo.done)
        }
    }
})
```

#### 通过属性访问

Getter 会暴露为 store.getters 对象，可以以属性的形式访问这些值。

```js
store.getters.count
```

Getter 也可以接受其他 getter 作为第二个参数。

```js
getters: {
    todosCount: (state, getters) => {
        return getters.todos.length
    }
}
```

在组件中使用：

```js
computed: {
    count () {
        return this.$store.getters.todosCount
    }
}
```

#### 通过方法访问

让 getter 返回一个函数，实现给 getter 传参。

```js
getters: {
    getTodoById: state => id => {
        return state.todos.find(todo => todo.id === id)
    }
}
```

getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。

### mapGetters

将 getter 映射到局部计算属性。

```js
computed: {
    ...mapGetters(['count', 'list'])
}
```

如果需要给 getter 属性另取名字，使用对象形式。

```js
mapGetters({
    count: 'doneTodosCount'
})
```

### Mutation

更改 store 中的 state 唯一方式是提交 mutation。mutation 类似事件，都已一个字符串的事件类型（type）和回调函数（handler）

```js
const store = new Vuex.store({
    // ...
    mutations: {
        increment(state) {
            state.count++
        }
    }
})
```

用 **stroe.commit** 提交 mutation.

```js
store.commit('increment')
```

#### 提交载荷 (Payload)

传入 store.commit 额外的参数即为 mutation 的载荷。

```js
mutations: {
    increment(state, payload) {
        state.count += payload.amount
    }
}
```

```js
store.commit('increment', {
    amount: 10
})
```

#### 对象风格提交

提交 mutation 的另一种方式。

```js
store.commit({
    type: 'increment',
    amount: 10
})
```

#### Mutation 需遵循 Vue 的响应规则

Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。

1. 最好提前在你的 store 中初始化好所有所需属性。
2. 当需要在对象上添加新属性时，你应该

- 使用 `Vue.set(obj, 'newProp', 123)`, 或者

- 以新对象替换老对象。例如，利用[对象展开运算符](https://github.com/sebmarkbage/ecmascript-rest-spread)我们可以这样写：

  ```js
  state.obj = { ...state.obj, newProp: 123 }
  ```

#### 使用常量代替事件类型

使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然。

#### Mutation 必须是同步函数

异步函数执行让状态的改变都是不可追踪。

#### mapMutations

在组件中可以使用 `this.$store.commit()` 提交 mutation，也可以使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `store.commit` 调用（需要在根节点注入 `store`）

```js
import {mapMutations} from 'vuex'
export default {
    // ...
    methods: {
        ...mapMutaions([
            'increment'， // this.increment() 映射到 this.$store.commit('increment')
            // mapMutations 也支持载荷
            'incrementBy' // this.incrementBy() 映射到 this.$store.commit('incrementBy')
        ]),
        ...mapMutations({
            add: 'increment'  // this.add() 映射到 this.$.increment.commit('increment')
        })
    }
}
```

### Acitin

Action 提交的是 mutation，而不是直接变更状态。可以包含任意异步操作。

```js
const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
        increment(context) {
            context.commit('increment')
        }
    }
})
```

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。

可以使用结构赋值简写：

```js
const store = new Vuex.Store({
    // ...
    actions: {
        increment({commit, state, getters}, data) {
            commit('increment', data)
        }
    }
})
```

#### 分发 Action

```js
store.dispath('increment')
```

Actions 支持同样的载荷方式和对象方式进行分发:

```js
// 载荷方式
store.dispath('increment', {
    amount: 10
})

// 对象方式
store.dispath({
    type: 'increment',
    amount: 10
})
```

#### 在组件中分发 Action

使用 `this.$store.dispath('increment')`。或者使用 `mapActions`。

```js
methods: {
    ...mapActions([
        'increment'
    ]),
    ...mapActions({
        add: 'increment'
    })
}
```

#### 组合 Action

`store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：

```js
acitons: {
    'actions1'({commit}) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('aMutation')
                resolve()
            }, 1000)
        })
    }
}
```

```js
store.dispatch('actions1').then(() => {})
```

### Module

应用的所用状态集中在一个比较大的对象里，sotre 会变得臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。

```js
const moduleA = {}

const moduleB = {}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

#### 局部状态

对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**，getter 的的三个参数是根节点状态。

```js
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state, getters, rootState) {
      return state.count * 2
    }
  }
}
```

对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`：

```js
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

### 插件

logger 插件，修改state 时，会在控制台打印日志。

```js
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// 调试工具，在开发环境下使用
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  // 严格模式，开启会检测 state 的修改是否来源于 mutation
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
```

