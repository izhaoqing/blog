# textarea高度自适应

`<textarea>`文本域高度随内容自动变化，不会出现滚动条，可以有多种方法，除了用`js`动态设置它的高度值以外还有其它更简单的方法。

可以用`div`标签模拟`textarea`，将`div`的`contenteditable`属性设置成`true`，使内容可编辑，达到高度随内容变化的目的。`contenteditable`的[兼容性](https://caniuse.com/#feat=contenteditable)很好。

```
<div contenteditable='true'></div>
```

还有一种方法，利用兄弟节点撑开父级高度，设置`textarea`高度为100%即可。

```html
<style>
    .wrap { position: relative; }
    textarea { position: absolute; top: 0; left: 0; height: 100%; }
</style>

<div class="wrap">
    <pre><span></span><br></pre>
    <textarea name="" id="" ></textarea>
</div>
```

```js
document.querySelecotr('textarea').oninput = function () {
    document.querySelector('pre span').innerHTML = this.value;
}
```



