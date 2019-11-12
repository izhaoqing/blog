# AngularJs

## 应用

AngularJS **模块（Module）** 定义了 AngularJS 应用。

AngularJS **控制器（Controller）** 用于控制 AngularJS 应用。

**ng-app** 指令指明了应用, **ng-controller** 指明了控制器。

```js
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
});
```

## 自定义指令

可以使用 **directive** 函数来添加自定义的指令。

使用驼峰法来命名一个指令， **runoobDirective**, 但在使用它时需要以 **-** 分割, **runoob-directive**:

```js
app.directive('myDirective', function () {
    return {
        template: '<h2>directive</h2>'
    }
})
```

可以通过元素名、属性名、类名、注释方式来调用指令。

```html
<my-directive></my-directive>
<div my-directive></div>
<div class="my-directiv"></div>
<!-- directive: my-directive -->
```

通过添加 **restrict** 属性，限制指令只能通过特定的方式来调用。

```js
angular.directive('myDirective', function () {
    return {
        template: '<h2>directive</h2>',
        restrict: 'A'
    }
})
```

restrict 值可以是以下几种:

- `E` 作为元素名使用
- `A` 作为属性使用
- `C` 作为类名使用
- `M` 作为注释使用

restrict 默认值为 `EA`, 即可以通过元素名和属性名来调用指令。

## ng-model

```html
<form ng-app="" name="myForm">
    Email:
    <input type="email" name="myAddress" ng-model="text">
    <span ng-show="myForm.myAddress.$error.email">不是一个合法的邮箱地址</span>
</form>
```

`ng-model` 指令可以为应用数据提供状态值:

```html
<form ng-app="" name="myForm" ng-init="myText = 'test@runoob.com'">
    Email:
    <input type="email" name="myAddress" ng-model="myText" required></p>
    <h1>状态</h1>
    <p>Valid: {{myForm.myAddress.$valid}} (如果输入的值是合法的则为 true)。</p>
    <p>Invalid: {{myForm.myAddress.$invalid}} (如果输入的值是不合法的则为 true)。</p>
    <p>Dirty: {{myForm.myAddress.$dirty}} (如果值改变则为 true)。</p>
    <p>Touched: {{myForm.myAddress.$touched}} (如果通过触屏点击则为 true)。</p>
</form>
```

`ng-model` 指令基于它们的状态为 HTML 元素提供了 CSS 类，分别在不同的状态下加不同的类：

```css
input.ng-valid {}
input.ng-invalid {}
input.ng-dirty {}
input.ng-touched {}
```

`ng-model` 指令根据表单域的状态添加/移除以下类：

- `ng-valid`: 验证通过
- `ng-invalid`: 验证失败
- `ng-valid-[key]`: 由$setValidity添加的所有验证通过的值
- `ng-invalid-[key]`: 由$setValidity添加的所有验证失败的值
- `ng-pristine`: 控件为初始状态
- `ng-dirty`: 控件输入值已变更
- `ng-touched`: 控件已失去焦点
- `ng-untouched`: 控件未失去焦点
- `ng-pending`: 任何未满足$asyncValidators的情况

## $scope

**$scope** 是一个 JavaScript 对象，带有属性和方法。当在控制器中添加 **$scope** 对象时，视图 (HTML) 可以获取了这些属性。

在所有 controller 里面都是可以直接用 `{{$root.key}}` 来显示的，那当然也可以赋值给 $scope。

```js
// 浏览器中显示选中节点的 scope 
angular.element($0).scope()
```

## 过滤器

过滤器可以使用一个管道字符（|）添加到表达式和指令中。

| 过滤器    | 描述                     |
| --------- | ------------------------ |
| currency  | 格式化数字为货币格式。   |
| filter    | 从数组项中选择一个子集。 |
| lowercase | 格式化字符串为小写。     |
| orderBy   | 根据某个表达式排列数组。 |
| uppercase | 格式化字符串为大写。     |

#### 表达式过滤器

```html
<div ng-app="myApp" ng-controller="personCtrl">
	<p>姓名为 {{ lastName | uppercase }}</p>
</div>
```

#### 指令过滤器

```html
<li ng-repeat="x in names | orderBy:'country'">
    {{ x.name + ', ' + x.country }}
</li>
```

#### 输入过滤器

**filter** 过滤器从数组中选择一个子集

```html
<p><input type="text" ng-model="test"></p>
<ul>
  <li ng-repeat="x in names | filter:test | orderBy:'country'">
    {{ (x.name | uppercase) + ', ' + x.country }}
  </li>
</ul>
```

#### 自定义过滤器

```html
<div ng-app="myApp">
    <div ng-controller="myCtrl">
        {{name | reverse}}
    </div>
</div>
```

```js
let app = angular.model('myApp', [])
app.controller('myCtrl', function($scope) {
    $scope.name = 'Tom'
})
app.filter('reverse', function() {
    return function(text) {
        return text.split('').reverse().join('')
    }
})
```

## 服务

在 AngularJS 中，服务是一个函数或对象，可在你的 AngularJS 应用中使用。

AngularJS 内建了30 多个服务。

如果要使用它，需要在 controller 中定义。

#### $location

$location 服务，它可以返回当前页面的 URL 地址，提供了 absUrl，url，path，host 等[方法](<https://www.cnblogs.com/liulangmao/p/4067131.html>)。

```js
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $location) {
    $scope.myUrl = $location.absUrl();
});
// $location 返回当前页面的 url 地址
```

#### $http

[$http服务](<http://www.runoob.com/angularjs/angularjs-http.html>) 向服务器发送请求，应用响应服务器传送过来的数据。

```js
$http({
    method: 'GET',
    url: '/someUrl'
}).then()
```

```js
$http.get('/someUrl', config).then(successCallback, errorCallback);
$http.post('/someUrl', data, config).then(successCallback, errorCallback);
```

```js
app.controller('myCtrl', function($scope, $http) {
    $http.get('./detail.do').then(function(res) {
        $scope.data = res.data
    })
})
```

#### 自定义服务

使用 app.service 方法创建自定义服务。

```js
app.service('myService', function() {
    this.toString = function(s) {
        return x.toString()
    }
})
app.controller('myCtrl', function($scope, myService) {
    $scope.str = myService.toString({name: 'Tom'})
})
```

#### 在过滤器中使用服务

可以在控制器，指令，过滤器或其他服务中使用服务或自定义服务

```js
app.filter('format', ['myService', '$location', function(myService, location) {
    return function(s) {
        return myService.toString(s) + ' / ' + location.absUrl()
    } 
}])
// 指定服务后，函数参数中可以拿到
```

## 表格

ng-repeat 指令可以完美的显示表格。

```html
<table>
    <tr ng-repeat="x in names | orderBy : 'Country'">
        <td>{{ x.Name }}</td>
        <td>{{ x.Country }}</td>
      </tr>
</table>
```

```js
app.controller('myCtrl', function($scope) {
    $scope.names = [{Name: 'Tom', Country: 'America'}]
})
```

#### 序号

表格显示序号可以在 `<td>` 中添加 **$index**: 

```html
<table>
  <tr ng-repeat="x in names">
    <td>{{ $index + 1 }}</td>
    <td>{{ x.Name }}</td>
    <td>{{ x.Country }}</td>
  </tr>
</table>
```

#### 奇偶行

```html
<table>
    <tr ng-repeat="x in names">
        <td ng-if="$odd" style="background-color:#f1f1f1">{{ x.Name }}</td>
        <td ng-if="$even">{{ x.Name }}</td>
        <td ng-if="$odd" style="background-color:#f1f1f1">{{ x.Country }}</td>
        <td ng-if="$even">{{ x.Country }}</td>
    </tr>
</table>
```

## 模块

通过 AngularJS 的 **angular.module** 函数来创建模块，模块定义了一个应用程序，模块是应用控制器的容器。

```html
<div ng-app="myApp"></div>
<script>
let app = angular.module('myApp', [])
</script>
```

然后在 AngularJS 应用中添加控制器，指令，过滤器等。

> 在模块定义中 [] 参数用于定义模块的依赖关系。
> 中括号[]表示该模块没有依赖，如果有依赖的话会在中括号写上依赖的模块名字。

## 全局 API

| API                                                          | 描述                                          |
| ------------------------------------------------------------ | --------------------------------------------- |
| angular.lowercase (<angular1.7） <br />angular.$$lowercase()（angular1.7+） | 转换字符串为小写                              |
| angular.uppercase() (<angular1.7） <br />angular.$$uppercase()（angular1.7+） | 转换字符串为大写                              |
| angular.isString()                                           | 判断给定的对象是否为字符串，如果是返回 true。 |
| angular.isNumber()                                           | 判断给定的对象是否为数字，如果是返回 true。   |
| angular.copy()                                               | 数组或对象深度拷贝                            |
| angular.equals()                                             | 如果两个对象相等返回 true                     |

## 包含

使用 **ng-include** 指令来包含 HTML 内容:

```html
<div ng-include="'head.htm'"></div>
```

ng-include 指令除了可以包含 HTML 文件外，还可以包含 AngularJS 代码:

```html
<table>
    <tr ng-repeat="x in names">
        <td>{{ x.Name }}</td>
        <td>{{ x.Url }}</td>
    </tr>
</table>
```

```html
<div ng-app="myApp" ng-controller="sitesCtrl"> 
	<div ng-include="'sites.htm'"></div>
</div>
 
<script>
    var app = angular.module('myApp', []);
    app.controller('sitesCtrl', function($scope, $http) {
        $http.get("sites.php").then(function (response) {
            $scope.names = response.data.records;
        });
    });
</script>
```

包含跨域文件需要设置域名访问白名单，还需要设置服务端允许跨域访问：

```html
<body ng-app="myApp">
	<div ng-include="'https://c.runoob.com/runoobtest/angular_include.php'"></div>
<script>
    var app = angular.module('myApp', [])
    app.config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'https://c.runoob.com/runoobtest/**'
        ]);
    });
</script>
</body>
```

## 依赖注入

AngularJS 提供很好的依赖注入机制。以下5个核心组件用来作为依赖注入：

value、factory、service、provider、constant

#### value

Value 是一个简单的 javascript 对象，用于向控制器传递值（配置阶段）：

```js
var app = angular('myApp', [])
app.value('defaultVal', 5)
app.controller('myCtrl', function($scope, defaultVal) {
    $scope.num = defaultVal
})
```

#### factory

factory 是一个函数用于返回值。在 service 和 controller 需要时创建。

通常我们使用 factory 函数来计算或返回值。

```js
var app = angular('myApp', [])
app.factory('MathService', function() {
    return {
        multiply: function(a, b) {
            return a * b
        }
    }
})
// 在 service 中注入 factory 'MathService'
app.service('CalcService', function(MathService) {
    this.square = function(a) {
        return MathService.multiply(a, a)
    }
})
```

#### provider

通过 provider 创建一个 service、factory等(配置阶段)。Provider 中提供了一个 factory 方法 get()，它用于返回 value/service/factory。

```js
// 使用 provider 创建 service 定义一个方法用于计算两数乘积
var app = angular('myApp', [])
app.config(function($provide) {
    $provide.provider('MathService', function() {
        this.$get = function() {
            return {
                multiply: function(a, b) {
                    return a * b
                }
            }
        }
    })
})
```

#### constant

constant(常量)用来在配置阶段传递数值，注意这个常量在配置阶段是不可用的。

```js
app.constant("configParam", "constant value");
```

## 路由

单页 Web 应用中 AngularJS 通过 **#! + 标记** 实现。

```html
<div>
    <a href="#!/">首页</a>
    <a href="#!/list">列表</a>
</div>
<div ng-view></div>
<script>
	let app = angular.module('myApp', ['ngRoute'])
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
            	template: '这是首页'
        	})
            .when('/list', {
				template: '这是列表'
            })
            .otherwise({
				redirectTo: '/'
            })
    }])
</script>
```

when(path, object) 按顺序定义所有路由，函数包含两个参数：

- 第一个参数是 URL 或者 URL 正则规则。
- 第二个参数是路由配置对象。

#### 路由设置对象

```js
$routeProvider.when(url,{
    template:string, //在ng-view中插入简单的html内容
    templateUrl:string, //在ng-view中插入html模版文件
    controller:string,function / array, //在当前模版上执行的controller函数
    controllerAs:string, //为controller指定别名
    redirectTo:string,function, //重定向的地址
    resolve:object<key,function> //指定当前controller所依赖的其他模块
});
```

```js
let app = angular.module('myApp', ['ngRoute'])
app.controller('HomeCtrl', function($scope, $route) {
    $scope.$route = $route
})
app.controller('ListCtrl', function($scope, $route) {
    $scope.$route = $route
})
app.config(function($routeProvider) {
    $routeProvider.when('/home', {
        template: 'home.html',
        controller: 'HomeCtrl'
    }).when('/list', {
        template: 'list.html',
        controller: 'ListCtrl'
    })
})
```





























