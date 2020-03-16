### 使用方式

+ 浏览器直接打开
+ 在 HTML 中使用 `<img>` 标签引用
+ 直接在 HTML 中使用 SVG 标签
+ 作为 CSS 背景

```html
<svg></svg>
<img src="a.svg" />
<div style="background: url(a.svg)"></div>
```

### 基本图形

```html
<rect x="0" y="0" width="100" height="100" rx="3" ry="3" />
<circle cx="25" cy="75" r="20"/>
<ellipse cx="75" cy="75" rx="20" ry="5"/>
<line x1="10" x2="50" y1="110" y2="150"/>
<polyline points="60 110, 65 120, 70 115, 95 150, 100 145"/>
<polygon points="50 160, 55 180, 70 180, 40 190, 30 180, 45 180"/>
```

### 基本属性

+ fill 填充
+ stroke 描边
+ stroke-width 描边宽度
+ transform 基于父级坐标的变换

### 基本操作API

```js
document.createElementNS(ns, tagName)  // 创建图形
element.appendChild(childElement)  // 添加图形
element.setAttribute(name, value)  // 设置属性
element.getAttribute(name) // 获取属性
```

> ns 表示 namespace，'http://www.w3.org/2000/svg'


### 图形分组

+ `<g>` 标签来创建分组
+ 属性继承
+ trnasform 定义坐标变换
+ 可以嵌套使用

