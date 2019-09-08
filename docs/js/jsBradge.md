### Android JsBridge

安卓原生使用 [JsBridge](https://github.com/lzyzsd/JsBridge)，会给 `window` 注入一个 `WebViewJavascriptBridge` 对象，在 js 中使用此对象前需要判断 `WebViewJavascriptBridge` 是否存在，如果不存在可以监听 `WebViewJavascriptBridgeReady` 事件。

```js
if (window.WebViewJavascriptBridge) {
    //do your work here
} else {
    document.addEventListener(
        'WebViewJavascriptBridgeReady'
        , function() {
            //do your work here
        },
        false
    );
}
```

### IOS WebViewJavascriptBridge

```js
function setupWebViewJavascriptBridge (callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    let WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }
  
  let Bridge = {
    callhandler (name, data, callback) {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(name, data, callback)
      })
    },
    registerhandler (name, callback) {
      setupWebViewJavascriptBridge(function (bridge) {
        bridge.registerHandler(name, function (data, responseCallback) {
          callback(data, responseCallback)
        })
      })
    }
  }

  // 调用客户端方法
  Bridge.callhandler('ObjCFn', params, (data) => {
    // 处理返回数据
  })

  // 客户端调用 js 函数，先注册
  Bridge.registerhandler('JSFn', (data, responseCallback) => {
    alert('JS Echo called with:', data)
    responseCallback(data)
  })
```

