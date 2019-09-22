# Gulp

### gulp 启动服务

```js
let connect = require('gulp-connect')
gulp.task('webserver',function(cb){
    connect.server({
        root: 'dist/views',
        port: 8099,
        livereload: true,
      	middleware: function(connect, opt) {
            return [
                proxy('/wcm', {
                    target: 'http://106.124.143.127:8090',
                    changeOrigin: false
                })
            ];
        }
    });
    cb();
});
```

