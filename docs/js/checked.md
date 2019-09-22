# 设置checkbox, radio的选中状态

在input标签中，给选框添加属性 `checked`，属性值为任何值此选框都为选中状态，包括 `false`, `0`, 或者无值。

用js改变选框的状态可以使用：

``` JavaScript
let inp = document.querySelector('.checkbox');

inp.checked = 'checked';
inp.setAttribute('checked', 'checked');
```
方法1中，设置 `inp` 的 `checked` 属性等于任意一个逻辑值为真的值都会让选框选中，如：`'false'`, `'0'`, `1`, `true`。逻辑值为假时，可设置选框为非选中，如 `false`, `0`, `空字符串`, `NaN`。

方法2中，`setAttribute()` 方法会给 `inp` 添加一个属性，为任何值都会使选框为选中状态。与在 `input` 标签中添加 `checked` 属性效果相同。

`removeAttribute('checked')` 方法可以删除 `checked` 属性，让选框变成未选中，但是删除后再用鼠标点击选中，因为已经没有 `checked` 属性，再次使用 `removeAttribute()` 方法无效。

## 判断checkbox, radio的选中状态

判断选框是否选中可以使用 `int.checked` ，得到的值为 `false` 或者 `true` ，类型为布尔值，分别表示未选中和选中。

如果使用 `inp.getAttribute('checked')` 得到的是`inp` 标签中 `checked` 属性值，类型为 `String` ，不能准确对应选中状态。如：

``` HTML
<input class='checkbox' type='checkbox' checked />

inp.getAttribute('checked')  
//input为选中，而'checked'的属性值为空字符串。
```

`getAttribute()` 和 `setAttribute()` 只是两个操作标签属性的方法，因为 `checked` 是**布尔属性**，设置和获取选框的选中状态使用 `inp.checked` 更合理。

## 布尔属性

布尔属性通常用来表示标签的状态或指定规则, 一般属性值和属性名相同。如表单中的 `checked`, `selected`, `disabled`, `readonly`，其他布尔属性还有：

1. **hidden**：如同 `display: none`，优先级低于CSS。
2. **multiple**：select标签中，按住 `command/ctrl` 键可以实现多选，在 `type='file'` 的 `input` 标签中可以选中多个文件。
3. **contentEditable**：使普通元素可编辑。
4. **async**：`<script async='async' src='a.js'></script>` 设置a.js异步加载，资源加载完时立即执行。
5. **defer**：与async相似，在 `script` 标签中使用，实现js异步加载，当所有资源加载完，页面渲染完毕后执行。
6. **autofocus**：使 `input` 元素自动获取焦点。
7. **require**：规定 `input` 在提交前必填。
8. **spellcheck**: 在文本框、文本域、可编辑的的标签中使用，可以对元素内容做拼写检查。

通常用 `元素.属性` 的形式设置和获取布尔属性的值，不适合用 `getAttribute()` `setAttribute` 来操作。

jQuery的方法 `prop()` 和 `setAttribute()` 类似，当传入的值逻辑为真时，选框被设置成选中。`is(':checked')` 和 `元素.属性` 形式一样，可以准确判断选框是否选中，返回一个 `true` 或者 `false` ，是布尔类型。






