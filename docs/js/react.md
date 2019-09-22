# React notes

## JSX

JSX 只是为 `React.createElement(component, props, ...children)` 方法提供的语法糖。

```js
React.createElement(
  string/ReactClass type,
  [object props],
  [children ...]
)
```

React.createElement 方法创建并返回一个给定类型的ReactElement元素。type参数可以是一个html标签名称字符串，也可以是一个ReactClasss。这个type参数对于createElement来说是必须的。第二个参数是该标签的属性，这个参数是可选的。第三个参数是该元素的子节点，同样也是可选的。

`render`的返回值可以是一个数组，外部不需包裹元素，但需要给每个元素加key值。

```jsx
render() {
    return[
        <li key='1'>1</li>,
        <li key='2'>2</li>
    ]
}
```

## 组件

### 函数定义组件

```jsx
function Hello (props) {
    return <div>hello {props.name}</div>
}

ReactDom.render() {
    <Hello name='z'/>,
    document.getElementById('root')
}
```

该函数叫做无状态组件，它接收一个单一的 `props` 对象并返回了一个 React 元素，可读性更好，精简至只有一个render方法。除此之外还有一下特点：

1. **组件不会被实例化，整体渲染性能得到提升**
   因为组件被精简成一个render方法的函数来实现的，由于是无状态组件，就不会在有组件实例化的过程，无实例化过程也就不需要分配多余的内存，从而性能得到一定的提升。
2. **组件不能访问this对象**
   无状态组件由于没有实例化过程，所以无法访问组件this中的对象，例如：`this.ref`、`this.state`等均不能访问。若想访问就不能使用这种形式来创建组件
3. **组件无法访问生命周期的方法**
   因为无状态组件是不需要组件生命周期管理和状态管理，所以底层实现这种形式的组件时是不会实现组件的生命周期方法。所以无状态组件是不能参与组件的各个生命周期管理的。
4. **无状态组件只能访问输入的props，同样的props会得到同样的渲染结果，不会有副作用**

> 无状态组件内部其实是可以使用`ref`功能的，虽然不能通过`this.refs`访问到，但是可以通过将ref内容保存到无状态组件内部的一个本地变量中获取到。

```jsx
function TestComp(props){
    let ref;
    return (<div>
        <div ref={node => ref = node}>
            ...
        </div>
    </div>)
}
```

### React.createClass()

此方法是用ES5的原生的JavaScript来实现创建React组件。

```jsx
var InputControlES5 = React.createClass({
    propTypes: {//定义传入props中的属性各种类型
        initialValue: React.PropTypes.string,
        //自定义属性验证
        title: (props, propName) => {
            if (props[propName])
        }
    },
    defaultProps: { //组件默认的props对象
        initialValue: ''
    },
    // 设置 initial state
    getInitialState: function() {//组件相关的状态对象
        return {
            text: this.props.initialValue || 'placeholder'
        };
    },
    handleChange: function(event) {
        this.setState({ //this represents react component instance
            text: event.target.value
        });
    },
    render: function() {
        return (
            <div>
                Type something:
                <input onChange={this.handleChange} value={this.state.text} />
            </div>
        );
    }
});
```

### Component

以ES6的形式来创建react的组件。

```jsx
class InputControlES6 extends React.Component {
    constructor(props) {
        super(props);

        // 设置 initial state
        this.state = {
            text: props.initialValue || 'placeholder'
        };

        // ES6 类中函数必须手动绑定
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    render() {
        return (
            <div>
                Type something:
                <input onChange={this.handleChange}
               value={this.state.text} />
            </div>
        );
    }
}
InputControlES6.propTypes = {
    initialValue: React.PropTypes.string
};
InputControlES6.defaultProps = {
    initialValue: ''
};
```

创建的组件，其成员函数不会自动绑定this，需要开发者手动绑定，否则this不能获取当前组件实例对象。

`React.Component`  有三种手动绑定方法：可以在构造函数中完成绑定，也可以在调用时使用 `method.bind(this)` 来完成绑定，还可以使用 arrow function 来绑定。

```jsx
constructor(props) {
	super(props);
	this.handleClick = this.handleClick.bind(this); //构造函数中绑定
}

<div onClick={this.handleClick.bind(this)}></div> //使用bind来绑定

<div onClick={()=>this.handleClick()}></div> //使用arrow function来绑定
```

`React.createClass` 在创建组件时，有关组件 props 的属性类型及组件默认的属性会作为**组件实例的属性**来配置，其中defaultProps是使用 `getDefaultProps `的方法来获取默认组件属性的。`React.Component` 在创建组件时配置这两个对应信息时，他们是作为**组件类的属性**，不是组件实例的属性，也就是所谓的**类的静态属性**来配置的。

```js
class TodoItem extends React.Component {
    static propTypes = {//类的静态属性
        name: React.PropTypes.string
    };

    static defaultProps = {//类的静态属性
        name: ''
    };

    ...
}
```



### 阻止组件渲染

让 `render` 方法返回 `null` 而不是它的渲染结果即可实现。组件的 `render` 方法返回 `null` 并不会影响该组件生命周期方法的回调。

```jsx
render() {
    if(!this.props.id) return null;
    return <div>hello</div>
}
```

## 事件绑定

### 绑定方式

`react`封装了很多`on*`[事件](https://reactjs.org/docs/events.html#supported-events)，无需考虑兼容问题，写法为驼峰命名。

一般`on*`绑定事件只能用在 HTML 标签上，不能用在组件上。`<Header onClick={...}/>` 无效，但可以将事件函数通过 `props` 传给组件，在组件内部调用。

```jsx
class Btn extends component {
    handleClick() {
        this.props.onClick();
    }
    render() {
        return <button onClick={this.handleClick.bind(this)}>确定</button>
    }   
}

class Text extends component {
    render() {
        return <Btn onClick={() => console.log('click btn')} />
    }
}
```

### event对象

`event`对象由`react`封装，提供统一的 api 和属性。包括`event. stopPropagation()`,  `evnet. preventDefault()`。

事件函数中的`this`不是实例本身，而是`null`或者`undefined`，需要调用实例，要手动绑定，比如用`bind`。

```js
class Title extends Component {
    handleClick (e) {
        console.log(this)   //Title本身
    }
    
    render () {
        return <h1 onClick={this.handleClick.bind(this)}></h1>
    }
}         
```

也可在回调函数中使用箭头函数，渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题。


```js
class Title extends Component {
    handleClick (e) {
        console.log(this)   //Title本身
    }
    
    render () {
        return <h1 onClick={ e => this.handleClick(e)}></h1>
    }
}         
```

向事件函数传递参数。

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

通过 `bind` 方式向监听函数传参，在类组件中定义的监听函数，事件对象 `e` 要排在所传递参数的后面。

## state和setState

React 里，`state` 就是用来存储可变化的状态的。更新组件的 `state`，然后根据新的 `state` 就可重新渲染用户界面。构造函数是唯一能够初始化 `this.state` 的地方。

### setState方法

`setState()`方法由父类`Component`提供，当我们调用这个函数的时候，React 会更新组件的状态 `state` ，并且重新调用 `render` 方法重新渲染页面。

不能直接用 `this.state = xxx` 这种方式来修改，React 就没办法知道你修改了组件的状态，不会更新页面。

`setState` 方法，它接受一个对象或者函数作为参数。

### 对象参数

这个对象表示该组件的新状态。只需要传入需要更新的部分，而不需要传入整个对象。

```js
constructor (props) {
    super(props)
    this.state = {
      name: 'Tomy',
      isLiked: false
    }
  }

handleClickOnLikeButton () {
   this.setState({
      isLiked: !this.state.isLiked
   })
}
```

### 函数参数

当调用 `setState` 时，React.js 并不会马上修改 `state`，而是把这个对象放到一个更新队列里面，稍后才会从队列当中把新的状态提取出来合并到 `state` 中，最后触发组件更新。

```js
...
handleClickfn () {
    console.log(this.state.name  //'Tomy'
    this.setState({
        name: 'Leo'
    })
    console.log(this.state.name  //'Tomy'
}
...
```

调用 `setState` 方法不会立即更新 `state`，如果需要使用更新后的值，需要传入一个函数作为参数。

```js
...
constructor(props) {
    super(props)
    this.state = {
        num: 0
    }
}
handleClickfn () {
    console.log(this.state.num          //0
    this.setState(prevState => {
        return { num: prevState ++ }    //1 
    })
    this.setState(prevState => {
        return { num: prevState ++ }    //2
    })
}
...
```

### 第二个参数

setState(data,callback) 这个函数会合并data到this.state,并重新渲染组件。渲染完成后，调用可选的callback回调。（大部分情况下不需要调用回调，因为React会负责把界面更新到最新状态）

## props对象

每个组件都可以接受一个 `props` 参数，它是一个对象，包含了所有你对这个组件的配置。组件内部是通过 `this.props` 的方式获取到组件的参数的。

在使用一个组件的时候，可以把参数放在标签的属性当中，所有的属性都会作为 `props` 对象的键值，如果只有键名则默认值为`true`。

```js
class Text extends Component {
    render () {
        return <div>{this.props.username}</div>
    }
}

<Text username='zq' />
```

可以把任何类型的数据作为组件的参数，包括字符串、数字、对象、数组、甚至是函数等等。在`constructor`中使用`props`必须传入参数。

```js
constructor(props) {
    super(props);
    this.state = {this.id = this.porps.id}
}
```

### PropTypes

 React.js 提供了一种机制，可以给组件的配置参数加上类型验证。

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Text extends Component {
    static propTypes = {
        user: PropTypes.object
    }
}
```

我们可以通过 `isRequired` 关键字来强制组件某个参数必须传入。

```js
class Text extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    }
}
```

PropTypes 提供了一系列的数据类型可以用来配置组件的参数: [Typechecking With PropTypes - React](https://reactjs.org/docs/typechecking-with-proptypes.html)，[示例](https://doc.react-china.org/docs/typechecking-with-proptypes.html#proptypes)


### 属性默认值 defaultProps

```js
static defaultProps = {
    name: 'leo'
}
```

`propType` 类型检查是在 `defaultProps` 之后。

`props`一旦传入进来就不能改变，修改会报错。但可以通过父组件主动重新渲染的方式来传入新的`props`。

`state` 是让组件控制自己的状态，`props` 是让外部对组件自己进行配置。

尽量少地用 `state`，尽量多地用 `props`。没有 `state` 的组件叫无状态组件，设置了 `state` 的叫做有状态组件。因为状态会带来管理的复杂性。React.js 非常鼓励无状态组件，在 0.14 版本引入了函数式组件——一种定义不能使用 `state` 组件。

```js
const HelloWorld = (props) => {
  const sayHi = (event) => alert('Hello World')
  return (
    <div onClick={sayHi}>Hello World</div>
  )
}
```

## props.children

所有嵌套在组件中的 JSX 结构都可以在组件内部通过 `props.children` 获取到。

```jsx
class Text extends Component {
    render() {
        return <div>{this.props.children}</div>
    }
}

<Text>
    <div>children</div>
    <span>text</span>
</Text>
```

```html
//渲染结果
<div>
    <div>children</div>
    <span>text</span>
</div>
```

React.js 就是把我们嵌套的 JSX 元素一个个都放到数组当中，然后通过 `props.children` 传给了 `Text` 组件。

`props.children` 是数组，可以在组件中灵活使用。

```jsx
render() {
    return return <div>{this.props.children[0]}</div>
}
```

```html
//渲染结果
<div>
    <div>children</div>
</div>
```

通常情况下，插入 JSX 中的 JavsScript 表达式将被认作字符串、React 元素或这些内容的列表。然而，`props.children` 可以像其它属性一样传递任何数据，而不仅仅是 React 元素。例如，如果你使用自定义组件，则可以将调用 `props.children` 来获得传递的子代。

```jsx
function Repeat(props) {
    let items = [];
    for (let i=0; i<props.num; i++) {
        items.push(props.children(i))
    }
}

render() {
    return (
        <Repeat num=3>
            {index => <li key={index}>{index}item</li>}
        </Repeat>
    )
}
```

## 列表渲染

### 渲染 JSX 元素的数组

在 JSX 的表达式插入 {} 里面可以放任何数据，如果是一个存放了多个 JSX 元素的数组，会被直接展开。

```jsx
render () {
    return (
        <div>
            {[
                <span>React.js </span>,
                <span>is </span>,
                <span>good</span>
            ]}
        </div>
    )
}
```

```html
//渲染结果
<div>
    <span>React.js </span>,
    <span>is </span>,
    <span>good</span> 
</div>  
```

### 使用 map 渲染列表数据

用 `map` 方法遍历数据，返回一个 JSX 元素的数组。

```jsx
render() {
    const users = [{name: 'leo', age: 30}, {name: 'zq', age: 20}];
    return(
        <div>
        {users.map((item, i) => {
            <div key={i}>
                <span>{item.name}</span>
                <span>{item.age}></span>
            </div>
        })}
        </div>
    )
}
```

### key

对于用表达式套数组罗列到页面上的元素，都要为每个元素加上 `key` 属性，这个 `key` 必须是每个元素唯一的标识。一般来说，`key` 的值可以直接后台数据返回的 `id`，因为后台的 `id` 都是唯一的。

## 状态提升

种组件之间共享的状态交给组件最近的公共父节点保管，即把该状态提升到这些组件的最近公共父组件中，用 `props` 传递数据或者函数来管理这种依赖或着影响的行为, 通过 `props` 把状态传递给子组件，这样就可以在组件之间共享数据了。

## 生命周期

![生命周期](http://ww1.sinaimg.cn/large/006y8mN6gy1g78hnh2806j30kk0p0dhq.jpg)

### componentWillReceiveProps(nextProps)

组件从父组件接收到新的 `props` 之前调用。输入参数 `nextProps` 是即将被设置的属性，旧的属性还是可以通过 `this.props` 来获取。

### shouldComponentUpdate(nextProps, nextState)

输入参数 `nextProps` 和上面的 `componentWillReceiveProps` 函数一样，`nextState` 表示组件即将更新的状态值，可以通过这个方法控制组件是否重新渲染。如果返回 `false` 组件就不会重新渲染。

### componentWillUpdate(nextProps, nextState)

输入参数与 `shouldComponentUpdate` 一样，在这个回调中，可以做一些在更新界面之前要做的事情。需要特别注意的是，在这个函数里面，你就不能使用 `this.setState` 来修改状态。这个函数调用之后，就会把 `nextProps` 和 `nextState` 分别设置到 `this.props` 和 `this.state` 中。紧接着这个函数，就会调用 `render()` 来更新界面了。

### componentDidUpdate(prevProps, prveState)

组件重新渲染并且把更改变更到真实的 DOM 以后调用，到这里已经完成了属性和状态的更新了，此函数的输入参数变成了 `prevProps` 和 `prevState`。

### componentWillUnmount()

当组件要被从界面上移除的时候，就会调用。在这个函数中，可以做一些组件相关的清理工作，例如取消计时器、网络请求等。

## 表单

### 受控组件

表单元素会根据用户输入自动更新状态，在 React 中，可变的状态通常保存在组件的状态属性中，并且只能用 `setState()` 方法进行更新。像这种其值由 React 控制的输入表单元素称为“受控组件。

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

### textarea标签

在React中，`<textarea>`会用`value`属性来代替。这样的话，表单中的`<textarea>` 非常类似于使用单行输入的表单。

```jsx
render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
}
```

### select标签

在React中，会在根`select`标签上而不是在当前的`selected`属性上使用`value`属性。

```html
<!-- html -->
<select>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
</select>
```

```jsx
...
constructor(props) {
    super(props);
    this.state = {value: lime}
}
...

<select value={this.state.value} onChange={this.handleChange}>
	<option value="grapefruit">Grapefruit</option>
	<option value="lime">Lime</option>
	<option value="coconut">Coconut</option>
</select>
...
```

### 多个输入

当你有处理多个受控的`input`元素时，你可以通过给每个元素添加一个`name`属性，来让处理函数根据 `event.target.name` 的值来选择做什么。

```js
handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
}
```

## ref属性

React.js 当中提供了 `ref` 属性来帮助我们获取已经挂载的元素的 DOM 节点，你可以给某个 JSX 元素加上 `ref` 属性。

```js
...
componentDidMount() {
    this.input.focus();
}
render() {
    return <input ref={input => this.input = input} />
}
...
```

给 `input` 元素加了一个 `ref` 属性，这个属性值是一个函数。当 `input` 元素在页面上挂载完成以后，React.js 就会调用这个函数，并且把这个挂载以后的 DOM 节点传给这个函数。这样以后我们就可以通过 `this.input` 获取到这个 DOM 元素。


## dangerouslySetHTML

出于安全考虑的原因（XSS 攻击），在 React.js 当中所有的表达式插入的内容都会被自动转义，包括html标签。我们可以通过dangerouslySetInnerHTML属性动态设置元素的 innerHTML。

```js
render() {
    return <div dangerouslySetInnerHTML={{__html: this.porps.html}}></div>
}
```

## style

在 React.js 中需要把 `CSS` 属性变成一个对象再传给元素。 

属性需要用驼峰命名。用对象作为 style 方便我们动态设置元素的样式。我们可以用 props 或者 state中的数据生成样式对象再传给元素，然后用 setState 就可以修改样式。

```js
<h1 style={{fontSize: '12px', color: 'red'}}></h1>
```

## context

React.js 的 `context` 相当于组件的全局变量，某个组件只要往自己的 `context` 里面放了某些状态，这个组件之下的所有子组件都直接访问这个状态而不需要通过中间组件的传递。一个组件的 `context` 只有它的子组件能够访问，它的父组件是不能访问到的。

```js
//父组件
import React, { Component } from 'react'
import PropTypes from 'prop-types'
class Index extends Component {
    static childContextTypes = {
        themeColor: PropTypes.string
    }
    constructor() {
        super();
        this.state = {
            themeColor: 'red'
        }
    }
    getChildContext() {
        return { themeColor: this.state.themeColor }
    }
    render() {
        return (
            <div>
                <Main/>
            </div>
        )
    }
}
```

`getChildContext` 这个方法就是设置 `context` 的过程。

`childContextTypes`，它的作用其实与 `propsType` 验证组件 `props` 参数的作用类似。不过它是验证 `getChildContext` 返回的对象。如果你要给组件设置 `context`，那么 `childContextTypes` 是必写的。

```js
//子组件
import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Main extends from Component {
    static contextTypes = {
        themeColor: PropTypes.string
    }
    render() {
        return <div style={{color: this.context.themeColor}}></div>
    }
}
```

声明以后，在子组件中就可以通过 `this.context.themeColor` 获取到在 Index 放置的`themeColor`的值。但是必须写 `contextTypes` 来声明和验证你需要获取的状态的类型，它也是必写的，如果你不写就无法获取 `context` 里面的状态。



------



## 知识点

#### 传入 setState 函数的第二个参数的作用是什么？

该函数会在setState函数调用完成并且组件开始重渲染的时候被调用，我们可以用该函数来监听渲染是否完成：

```js
this.setState(
  { username: 'tylermcginnis33' },
  () => console.log('setState has finished and the component has re-rendered.')
)
```

#### 为什么我们需要使用 React 提供的 Children API 而不是 JavaScript 的 map？

props.children并不一定是数组类型，譬如下面这个元素：

```jsx
<Parent>
  <h1>Welcome.</h1>
</Parent>
```

如果我们使用props.children.map函数来遍历时会受到异常提示，因为在这种情况下props.children是对象（object）而不是数组（array）。React 当且仅当超过一个子元素的情况下会将props.children设置为数组，就像下面这个代码片：

```jsx
<Parent>
  <h1>Welcome.</h1>
  <h2>props.children will now be an array</h2>
</Parent>
```

这也就是我们优先选择使用React.Children.map函数的原因，其已经将props.children不同类型的情况考虑在内了。








