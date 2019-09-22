# Vue-Router

### Install

```shell
$ npm install vue-router
```

### 引入

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new Router({
    routes: [
    {
      path: '/',
      redirect: '/recommend'
    }, {
      path: '/recommend',
      name: 'recommend',
      component: Recommend,
      children: [{
        path: ':id',
        component: MusicList
      }]
    }
  ]
})

new Vue({
    el: '#root',
    router
})
```

入口文件和路由一般是分开的。将路由配置文件 index.js 放在 main.js 同级目录 router 文件夹下，可以直接使用 `import router from './router'` 引入 router 实例。

```js
// main.js
import Vue from 'vue'
import router from './router'

new Vue({
    el: '#root',
    router
})
```

```js
// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
        
    }]
})
```

### 路由标签

```vue
<router-link></router-link>
<router-view></router-view>
```

`<router-link>` 会被渲染成 `<a>` 标签，可以使用 **tab** 属性定义渲染的标签。

```vue	
<router-link tab="div"></router-link>
```

当被点击时，vue 会给当前的标签添加一个 `router-link-active` 的class。

### 命名视图

在一个页面里有多个 `<router-view>` 区域，通过配置路由的 js 文件，操作这些区域。

```vue
<router-view></router-view>
<router-view name='left'></router-view>
<router-view name='right'></router-view>
```

在路由的配置文件里，通过 `components` 字段配置这三个区域。

```js
// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Component1 from './Component1'
import Component2 from './Component2'
import Component3 from './Component3'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
        path: '/',
        components: {
            default: Component1,
            left: Components2,
            right: Components3
        }
    }]
})
```

> 和单路由区域 component 参数不一致。

### 路由传参

#### name

在组件内可以通过 `this.$route.name` 获取到路由配置中的 name 属性值。

```js
// router/index.js
routes: [{
    path: '/',
    name: 'home',
    component: Home
}]
```

```vue
// Home.vue
<p>
    {{$route.name}}
</p>
```

#### rul动态路由

一个“路径参数”使用冒号 `:` 标记。当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用。

```js
// router/index.js
routes: [{
    path: '/home/:id',
    name: 'home',
    component: Home
}]
```

```vue
<router-link to='/home/100'></router-link>
```

```vue
// Home.vue
<p>{{$route.params.id}}</p>
```

你可以在一个路由中设置多段“路径参数”，对应的值都会设置到 `$route.params` 中。例如：

| 模式                          | 匹配路径            | $route.params                        |
| ----------------------------- | ------------------- | ------------------------------------ |
| /user/:username               | /user/evan          | `{ username: 'evan' }`               |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: 123 }` |

除了 `$route.params` 外，`$route` 对象还提供了其它有用的信息，例如，`$route.query` (如果 URL 中有查询参数)、`$route.hash` 等等。你可以查看 [API 文档](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1) 的详细说明。

### 响应路由参数的变化

使用路径参数匹配路由时，渲染的同一个组件，会复用原来的组件，组件生命周期函数不会被调用，复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) `$route` 对象：

```js
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

或者使用 2.2 中引入的 `beforeRouteUpdate` 守卫：

```js
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

### 路由正则匹配

加入正则需要在路由配置文件里（/src/router/index.js）以圆括号的形式加入。

```js
path:'/params/:newsId(\d+)/:newsTitle'
```

### 子路由

一个被渲染组件同样可以包含自己的嵌套 `<router-view>`。

需要在 `VueRouter` 的参数中使用 `children` 配置：

```js
routes: [
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend,
      children: [{
        path: ':id', //匹配 /recommend/:id
        component: MusicList
      }]
    }
  ]
```

### 编程式导航

除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法。

#### $router.push

```js
this.$router.push(location, onCompete?, onAbort?)
```

| 声明式                    | 编程式             |
| ------------------------- | ------------------ |
| `<router-link :to="...">` | `router.push(...)` |

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。

```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})

const userId = 123
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

同样的规则也适用于 `router-link` 组件的 `to` 属性：

```vue
<router-link :to='{ name: 'user', params: { userId: 1 }}'></router-link>
```

在 2.2.0+，可选的在 `router.push` 或 `router.replace` 中提供 `onComplete` 和 `onAbort` 回调作为第二个和第三个参数。这些回调将会在导航成功完成 (在所有的异步钩子被解析之后) 或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。

#### $router.replace

```js
this.$router.replace(location, onCompete?, onAbort?)
```

跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

| 声明式                            | 编程式                |
| --------------------------------- | --------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

#### $router.go(n)

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`。类似的有 `router.back()` `router.forward()`。

### 重定向

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```

重定向的目标也可以是一个命名的路由：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```

甚至是一个方法，动态返回重定向目标：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```

### 别名

“重定向”的意思是，当用户访问 `/a`时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`，那么“别名”又是什么呢？

**/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。**

上面对应的路由配置为：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

alias 可以是一个数组

```js
alias: ['/baz', 'baz-alias'] 
```

### 路由组件传参

[路由组件传参](https://router.vuejs.org/zh/guide/essentials/passing-props.html)

#### 布尔模式

如果 `props` 被设置为 `true`，`route.params` 将会被设置为组件属性。

```js
const User = {
    props: ['id'],
    tpmepalte: '<div>{{id}}</div>'
}
cosnt router = new VueRouter({
    routes: [
        {
            path: '/user/:id',
            component: User, props: true
        }
    ]
})
```

#### 对象模式

 如果 `props` 是一个对象，它会被按原样设置为组件属性。当 `props` 是静态的时候有用。

```js
const User = {
    props: ['id'],
    tpmepalte: '<div>{{id}}</div>'
}
cosnt router = new VueRouter({
    routes: [
        {
            path: '/user/user1',
            component: User, 
            props: {
               id: 12334
            }
        }
    ]
})
```

渲染结果为：

```html
<div>12334</div>
```

#### 函数模式

创建一个函数返回 `props`。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。

```js
const router = new VueRouter({
    routes: [
        {
            path: 'user',
            component: User,
            props: route => {
                return {
                    query: route.query.q
                }
            }
        }
    ]
})
```

URL `/search?q=vue` 会将 `{query: 'vue'}` 作为属性传递给 `SearchUser` 组件。

### H5 History 模式

`vue-router` 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

如果不想要很丑的 hash，我们可以用路由的 **history 模式**，这种模式充分利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

需要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是 app 依赖的页面。

### 导航守卫

**参数或查询的改变并不会触发进入/离开的导航守卫**。你可以通过观察 `$route` 对象来应对这些变化，或使用 `beforeRouteUpdate` 的组件内守卫。

#### 全局守卫

可以使用 `router.beforeEach` 注册一个全局前置守卫。

```js
router.beforEach((to, from, next) => {
    // ...
})
```

每个守卫方法接收三个参数：

- **to: Route**: 即将要进入的目标 [路由对象](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)
- **from: Route**: 当前导航正要离开的路由
- **next: Function**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。
  - **next()**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
  - **next(false)**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  - **next('/') 或者 next({ path: '/' })**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://router.vuejs.org/zh/api/#to) 或 [`router.push`](https://router.vuejs.org/zh/api/#router-push) 中的选项。
  - **next(error)**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`](https://router.vuejs.org/zh/api/#router-onerror) 注册过的回调。

**确保要调用 next 方法，否则钩子就不会被 resolved。**

#### 全局解析守卫

`router.beforeResolve` 在所有组件内守卫和异步路由组件被解析之后调用。

#### 全局后置钩子

后置钩子不接受 next 函数，也不会改变导航本身。

```js
router.afterEach((to, from, from) => {
    // ..
})
```

#### 路由独享守卫

在路由配置上直接定义 `beforEach` 守卫。

```js
const router = VueRouter({
    routes: {
        component: User,
        path: '/user',
        beforEach: (to, from, next) => {
            // .. 
        }
    }
})
```

#### 组件内守卫

```js
beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
},
beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
},
beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
}
```

在路由组件内才能定义路由导航钩子。也就是说router中定义的入口vue文件之外的组件，是没有钩子函数的。

