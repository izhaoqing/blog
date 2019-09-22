# Path

###  `path.join([…paths])`

+ `...paths` [`<string>`](http://nodejs.cn/s/9Tw2bK) 路径片段的序列。
+ 返回: [`<string>`](http://nodejs.cn/s/9Tw2bK)

`path.join()` 方法使用平台特定的分隔符作为定界符将所有给定的 `path` 片段连接在一起，然后规范化生成的路径。

零长度的 `path` 片段会被忽略。 如果连接的路径字符串是零长度的字符串，则返回 `'.'`，表示当前工作目录。

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回: '/foo/bar/baz/asdf'

path.join('foo', {}, 'bar');
// 抛出 'TypeError: Path must be a string. Received {}'
```

如果任何路径片段不是字符串，则抛出 [`TypeError`](http://nodejs.cn/s/Z7Lqyj)。

###  `path.resolve([...paths])`

+  `…paths` [`<string>`](http://nodejs.cn/s/9Tw2bK)路径或路径片段的序列。
+  返回: [`<string>`](http://nodejs.cn/s/9Tw2bK)

`path.resolve()` 方法将路径或路径片段的序列解析为绝对路径。其处理方式类似于对这些路径逐一进行cd操作。

给定的路径序列从右到左进行处理，每个后续的 `path` 前置，直到构造出一个绝对路径。 例如，给定的路径片段序列：`/foo`、 `/bar`、 `baz`，调用 `path.resolve('/foo', '/bar', 'baz')` 将返回 `/bar/baz`。

如果在处理完所有给定的 `path` 片段之后还未生成绝对路径，则再加上当前工作目录。

生成的路径已规范化，并且除非将路径解析为根目录，否则将删除尾部斜杠。

零长度的 `path` 片段会被忽略。

如果没有传入 `path` 片段，则 `path.resolve()` 将返回当前工作目录的绝对路径。

```js
path.resolve('/foo/bar', './baz');
// 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// 返回: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录是 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

`path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')` 相当于：

```shell
cd foo/bar
cd /tmp/file/
cd ..
cd a/../subfile
pwd
```



