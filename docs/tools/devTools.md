# DevTools

### 截图

选中节点，`com + shift + P`，搜索 `screenshot` 命令，可以截取当前节点或者截全屏。

### 复制变量

在控制台中使用全局的 `copy()` 方法。

### 切换主题

`com + shift + P`，搜索 `theme`，选择明暗主题。

### 运行代码块

进入到 `Sources` 面板，在导航栏里选中 `Snippets` 这栏，点击 `New snippet(新建一个代码块)` ，然后输入你的代码之后保存，大功告成！现在你可以通过右击菜单或者快捷键： `[ctrl] + [enter]` 来运行它了。

使用 `Command Menu (com + shift + P)` 才是最快的方式。只需在它的输入框中输入 `!` ，就可以根据名字来筛选预设代码块。


### console 中的 `$`

在 `Chrome` 的 `Elements` 面板中， `$0` 是对我们当前选中的 `html` 节点的引用。`$1` 是对上一次我们选择的节点的引用，`$2` 是对在那之前选择的节点的引用，一直到 `$4`。

如果没有在 `App` 中定义过 `$` 变量 (例如 `jQuery` )的话，它在 `console` 中就是对这一大串函数 `document.querySelector` 的别名。 `$$` 它不仅执行 `document.QuerySelectorAll` 并且它返回的是：一个节点的 **数组** ，而不是一个 `Node list`。

`$_` 是对上次执行的结果的 **引用** 。

### 条件断点

右击行号，选择 `Add conditional breakpoint...(添加条件断点)`，或者右击一个已经设置的断点并且选择 `Edit breakpoint(编辑断点)`，然后输入一个执行结果为 `true` 或者 `false` 的表达式。或者直接添加 console.log / console.table / console.time 等等。

### 异步的 console

可以在控制台直接使用 `await` ：

```js
response = await fetch('https://a')
json = await response.json()
// 直接打印 json 的值
```

### console 的方法

**console.assert** 当我们传入的第一个参数为 **假** 时，打印跟在这个参数后面的值。

```js
console.assert(null, 'value')
```

**console.table** 以一个漂亮的表格的形式打印出来。

**console.dir** 要打印一个 `DOM` 节点所关联到的真实的 js 对象。

**console.time** 开启一个计时器，**console.timeEnd** 结束计时并且将结果在 `console` 中打印出来。

### console 样式

如果给打印文本加上 `%c` 那么 `console.log` 的第二个参数就变成了`CSS` 规则了。

```js
console.log('abc%cdef', 'color: red;')
// 打印 abcdef 其中 cdef 将会是红色
```

### 实时表达式

只需按下 "眼睛" 符号，可以在那里定义任何 `JavaScript` 表达式。 当表达式的值变化，打印的值它会不断更新。

### 重发请求

如果是 XHR 类型的请求，可以点击右键，点击 `Replay XHR` 重发请求，不必刷新页面。

### 检查修改的内容

通过浏览器进行设计和调整 `css` ：能够在代码执行的地方进行调试是方便又有趣的开发方式。 但在某些时候，你可能希望将已更改的内容与 最初加载的样式表进行比较。

点击主页面在 `Drawer`的 `console` 面板前面的 `⋮` 图标来打开完整选项列表。另外，你也可以打开之前我们提到的 `command Menu` ，然后输入 `Drawer` 来打开。










