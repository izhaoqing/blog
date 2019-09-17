## css规范

### CSS reset:

+ [http://html5reset.org/](http://html5reset.org/)
+ [http://www.zhangxinxu.com/wordpress/2010/08/html5-css-reset/](http://www.zhangxinxu.com/wordpress/2010/08/html5-css-reset/)

### 格式

1. 类名用破则号代替驼峰。
2. 不使用ID选择器。ID 选择器优先级高，不能通过改变 class 去覆盖样式，而且 ID 选择器是不可重用的。
3. 在一个规则声明中应用了多个选择器时，每个选择器独占一行。
4. 在规则声明的左大括号 `{` 前加上一个空格。
5. 在属性的冒号 `:` 后面加上一个空格，前面不加空格。
6. 规则声明之间用空行分隔开。
7. 注释使用行注释，独占一行。

```css
.add-button {
	position: fixed;
	right: 1rem;
	bottom: 3rem;
	height: 3rem;
	width: 3rem;
	line-height: 3rem;
	opacity: .8;
	border-radius: 100%;
}

.approval-radio,
.radio {
	width: 1rem;
	height: 1rem;
	border-radius: 1rem;
}
```

避免在 CSS 和 JavaScript 中绑定相同的类，用于特定 JavaScript 的类名时，添加 `.js-` 前缀。

```html
<button class='js-btn'>submit</btn>
```

