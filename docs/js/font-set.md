## 移动端rem自适应布局

### 用js设置`font-size`

动态计算`html`的`font-size`

```JavaScript
(function (doc, win) {

    var docEl = doc.documentElement,

    isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),

    dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,

    dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放

    dpr = 1,

    scale = 1 / dpr,

    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    docEl.dataset.dpr = dpr;

    var metaEl = doc.createElement('meta');

    metaEl.name = 'viewport';

    metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale;

    docEl.firstElementChild.appendChild(metaEl);

    var recalc = function() {

        var width = docEl.clientWidth;

        if (width / dpr > 750) {
            width = 750 * dpr;
        }

        // 乘以100，px : rem = 100 : 1

        docEl.style.fontSize = 100* (width / 750) + 'px';
    };

    recalc()

    if (!doc.addEventListener) return;

    win.addEventListener(resizeEvt, recalc, false);

})(document, window);
```

引入前：
    
```CSS
body {
    width: 750px;
    height: 640px;
}

```

引入后：
   
```CSS
body {    
    width: 7.5rem;    
    height: 6.4rem;    
}
```

### 用媒体查询设置`font-size`

```CSS
//SUI css源码

html {
    font-size: 20px
}

@media only screen and (min-width: 400px) {
    html {
        font-size: 21.33px !important
    }
}

@media only screen and (min-width: 414px) {
    html {
        font-size: 22.08px !important
    }
}

@media only screen and (min-width: 480px) {
    html {
        font-size: 25.6px !important
    }
}
```

用媒体查询设置`html`的`font-size`更简单，但是不能准确还原设计图。