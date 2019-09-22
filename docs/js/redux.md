# Redux

Redux 和 React-redux 并不是同一个东西。Redux 是一种架构模式（Flux 架构的一种变种），它不关注你到底用什么库，你可以把它应用到 React 和 Vue，甚至跟 jQuery 结合都没有问题。而 React-redux 就是把 Redux 这种架构模式和 React.js 结合起来的一个库，就是 Redux 架构在 React.js 中的体现。

### 引入

```js
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

```

### createStore

模拟 createStore 如下：

```js
function createStore(reducer) {
    let state = null;
    let listeners = [];
    const subscribe = listener => listeners.push(listener);
    const getState = () => state;
    const dispatch = action => {
        state = reducer(state, action);
        listeners.forEach(item => item());
    };
    dispatch({});  //初始化state
    return { getState, dispatch, subscribe };
}
```

返回的对象，包含三个函数：

1. **getState** 用来获取当前的 state。
2. **dispatch** 是发出修改数据的行为的唯一方法（发出 action）。
3. **subscribe** 设置监听函数，一旦 state 发生变化，就自动执行这个函数。只要把 View 的更新函数（对于 React 项目，就是组件的 render 方法或 setState 方法）放入 listen ，就会实现 View 的自动渲染。

### store

Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。用createStore 这个函数，来生成 Store。

```js
const store = createStore(reducer);
```

### reducer

发出修改 state 的行为后，会生成一个新的 state,（Store 收到 Action 以后），这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State

```js
function reducer (state, action) {
    if(!state) {
        return { themeColor: 'red' };
    }

    switch(action.type) {
        case 'CHANGE_COLOR':
            return {
                ...state,
                themeColor: action.themeColor
            };
        default:
            return state;
    }
}
```

参数 **state** 对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 state。

当前时刻的 State，可以通过 store.getState() 拿到。

参数 **action** 是一个对象。是 View 发出的通知，表示 State 应该要发生变化了，其中的 type 属性是必须的，表示 Action 的名称，其他属性可以自由设置。参考[规范](https://github.com/acdlite/flux-standard-action)。

```js
const action = {
    type: 'CHANGE_COLOR',
    themeColor: color
}
```

Reducer 函数不用手动调用，store.dispatch 方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入 createStore 方法。

### combineReducers

combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。

```js
import { combineReducers } from 'redux'

const todos = (state, action) => {
    switch(action.type) {
        case '':
        break;
    }
    ...
}
const visibilityFilter = (state, action) => {
    ...
}
const todoApp = combineReducers({
    todos,
    visibilityFilter
});
```


### connect 

而每个组件需要的数据和需要触发的 action 都不一样，所以让 connect 可以接受两个参数 mapStateToProps 和 mapDispatchToProps，分别用于告诉 connect 这个组件需要什么数据和需要触发什么 action。

使用如下：

```js
class Theme extends Component {
    ....
}

const mapStateToProps = (state, ownProps) => {
    return {
        themeColor: state.themeColor
    }
};
//参数1为state对象，参数2为容器组件的props对象

const mapDispatchToProp = (dispatch, ownProps) => {
    return {
        onSwitchColor: color => {
            dispatch({
                type: 'CHANGE_COLOR',
                themeColor: color
            });
        }
    }
};

Theme = connect(mapStateToProps, mapDispatchToProp)(Theme);
```

模拟 connect 如下：

```js
const connect = (mapStateToProps, mapDispatchToProps) => WrappedComponent => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        };

        constructor() {
            super();
            this.state = {
                allProps: {}
            }
        }

        componentWillMount() {
            this._update();
            const { store } = this.context;
            store.subscribe(() => {
                this._update();
            });
        }

        _update() {
            const { store } = this.context;
            let stateProps = mapStateToProps ? mapStateToProps(store.getState()) : {};
            let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch) : {};
            this.setState({
                allProps: {
                    ...this.props,
                    ...stateProps,
                    ...dispatchProps
                }
            });
        }

        render() {
            return <WrappedComponent {...this.state.allProps}/>
        }
    }

    return Connect;
}
```

### Provider

Provider 作为所有组件树的根节点，外界可以通过 props 给它提供 store，它会把 store 放到自己的 context 里面，好让子组件 connect 的时候都能够获取到。

使用如下：

```jsx
<Provider store={store}>
    ... //compoent
</Provider>
```

模拟 Provider 实现如下：

```jsx
class Provider extends Component {
    static propTypes = {
        store: PropTypes.object,
        children: PropTypes.any
    };

    static childContextTypes = {
        store: PropTypes.object
    };

    getChildContext() {
        return {
            store: this.props.store
        }
    }

    render() {
        return (
            <div>{ this.props.children }</div>
        )
    }

}
```

参考：

1. [react.js 小书](http://huziketang.mangojuice.top/books/react/lesson30) （email：569135939@qq.com，阅读码：cK3xhE0xZ0）
2. [redux入门教程-阮一峰](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)