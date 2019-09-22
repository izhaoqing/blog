# 移动端开发

### Rem 适配

```js
(function(c, d) {
  var e = document.documentElement || document.body,
    a = "orientationchange" in window ? "orientationchange" : "resize",
    b = function() {
      var f = e.clientWidth;
      e.style.fontSize = f >= 750 ? "100px" : 100 * (f / 750) + "px";
    };
  b();
  c.addEventListener(a, b, false);
})(window);
```

### Mate 标签

页面在手机上显示时，让页面强制让文档的宽度与设备的宽度保持1:1，并且文档缩放比例是1.0，且不允许用户通过点击或者缩放等操作对屏幕放大浏览。

```html
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport"/>
```

某些浏览器会强制缩放，可以用事件来阻止：
```js
window.onload = function () {
	document.addEventListener("touchstart", function (event) {
		if (event.touches.length > 1) {
			event.preventDefault();
		}
	});
	var lastTouchEnd = 0;
	document.addEventListener("touchend", function (event) {
        var now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
};
```

禁止 ios 自动识别电话：

```html
<mate content="telephone=no" name="formate-detection"></mate>
```

禁止 android 识别邮箱：

```html
<mate content="email=no" name="formate-detection"></mate>
```

### 动画硬件加速

使用 translate3d 或者 translateZ，可启用GPU加速

```css
transform: translate3d(0,0,0);
transform: translateZ(0);
```

### click 延迟

click事件因为要等待确认是否是双击事件，会有300ms的延迟（两次点击事件间隔小于300ms就认为是双击），体验并不好。

采用 touchstart 或者 touchend 代替 click。或者封装tap事件来代替click 事件，所谓的tap事件由touchstart事件+ touchmove（判断是否是滑动事件）+touchend事件封装组成。

### 快速回弹滚动

在 ios 上，如果存在局部滚动，就要加这个属性了！如果不加，滚动会很慢卡顿严重。

```css
-webkit-overflow-scrolling: touch;
```

### 性能优化

一、CSS 

1、尽量不要在行内写CSS 

2、使用link代替@import 

3、压缩CSS 

4、避免使用CSS表达式 

5、CSS写在HTML文件上部

二、JavaScript 

1、JS以外部文件形式引入 

2、避免重复的JS代码 

3、减少JS对DOM的操作 

4、避免无谓的循环 

5、JS代码（引入连接）放在页面下部 

6、压缩JS代码

三、HTML 

如果可能减少页面中的DOM元素

四、图片 

图片使用适当的格式，比如小图片用GIF PNG8等这样会减少图片的大小

1.[web移动前端有哪些优化方案？](https://link.juejin.im/?target=https%3A%2F%2Fwww.zhihu.com%2Fquestion%2F23198146%3Fsort%3Dcreated) 

2.[web移动端页面性能优化方案](https://link.juejin.im/?target=http%3A%2F%2Fblog.csdn.net%2Fu010683915%2Farticle%2Fdetails%2F71043188) 

3.[Web前端优化最佳实践及工具集锦](https://link.juejin.im/?target=http%3A%2F%2Fwww.csdn.net%2Farticle%2F2013-09-23%2F2817020-web-performance-optimization) 

4.[移动前端系列——移动页面性能优化](https://link.juejin.im/?target=http%3A%2F%2Ftgideas.qq.com%2Fwebplat%2Finfo%2Fnews_version3%2F804%2F808%2F811%2Fm579%2F201412%2F293834.shtml) 

5.[Web性能优化：图片优化](https://link.juejin.im/?target=http%3A%2F%2Fwww.cnblogs.com%2Fwizcabbit%2Fp%2Fweb-image-optimization.html)

