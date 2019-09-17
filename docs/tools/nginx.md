### 替换默认 HomeBrew 源

使用阿里云的源

```bash
# 替换brew.git:
cd "$(brew --repo)"
git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
# 替换homebrew-core.git:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
# 应用生效
brew update
# 替换homebrew-bottles:
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.zshrc
source ~/.zshrc
```

使用回官方源：

```bash
# 重置brew.git:
cd "$(brew --repo)"
git remote set-url origin https://github.com/Homebrew/brew.git
# 重置homebrew-core.git:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://github.com/Homebrew/homebrew-core.git

#删除zshrc HOMEBREW_BOTTLE_DOMAIN内容
```

### 安装 nginx

```bash
brew install nginx
```

### 启动 nginx

```bash
nginx
brew services start nginx
```

启动成功后，打开 http://localhost:8080

### 文件目录

+ nginx安装文件目录
  /usr/local/Cellar/nginx

+ nginx配置文件目录
  /usr/local/etc/nginx

+ config文件目录
  /usr/local/etc/nginx/nginx.conf

+ 系统hosts位置
  /private/etc/hosts

+ 主页文件

  /usr/local/var/www

### 常用命令

```bash
nginx  #启动nginx
nginx -V #查看版本，以及配置文件地址
nginx -v #查看版本
nginx -s reload|reopen|stop|quit   #重新加载配置|重启|快速停止|安全关闭nginx
nginx -h #帮助

ps aux | grep nginx #查看nginx服务
```

### 卸载 nginx

```bash 
brew uninstall nginx
```

### 配置文件

/usr/local/etc/nginx/nginx.conf 文件是Nginx总配置文件:

```bash
#运行用户，默认即是nginx，可以不进行设置
user  nginx;
#Nginx进程，一般设置为和CPU核数一样
worker_processes  1;   
#错误日志存放目录
error_log  /var/log/nginx/error.log warn;
#进程pid存放位置
pid        /var/run/nginx.pid;


events {
    worker_connections  1024; # 单个后台进程的最大并发数
}


http {
    include       /etc/nginx/mime.types;   #文件扩展名与类型映射表
    default_type  application/octet-stream;  #默认文件类型
    #设置日志模式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;   #nginx访问日志存放位置

    sendfile        on;   #开启高效传输模式
    #tcp_nopush     on;    #减少网络报文段的数量

    keepalive_timeout  65;  #保持连接的时间，也叫超时时间

    #gzip  on;  #开启gzip压缩

    include /etc/nginx/conf.d/*.conf; #包含的子配置项位置和文件
```

/usr/local/etc/nginx/nginx.conf.default 是一个子文件的配置项:

```bash
server {
    listen       80;   #配置监听端口
    server_name  localhost;  //配置域名

    #charset koi8-r;     
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;     #服务默认启动目录
        index  index.html index.htm;    #默认访问文件
    }

    #error_page  404              /404.html;   # 配置404页面

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;   #错误状态码的显示页面，配置后需要重启
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

### 修改端口

修改 `/usr/local/etc/nginx/nginx.conf` 

```bash
http {
    server {
        listen       8181;
        server_name  localhost;  

        #charset koi8-r;
        .....
        }
    }
}
```

### 配置 404 页面

修改配置:

```bash
error_page 404  /404.html;
error_page 404  http://baidu.com; #使用外部页面
```

在 `usr/local/var/www/` 下新增 404.html

```html
<html>
  ...
</html>
```

### 访问控制

服务器只允许特定主机访问。可以在 `location` 里配置。`deny` 表示禁止，`allow` 表示允许。在同一个块下的权限指令，匹配到就不会再继续匹配下一条规则了。

```shell
location / {
    deny 123.4.32.3;
    allow 35.33.202.3;
}
```

网站下的 img 可以被所有用户访问，但 admin 目录则只允许公司内部固定IP访问，需要 `location` 块来完成相关的需求匹配。

```shell
location = /img {
    allow all
}
location = /admin {
    deny all;
}
```

`=`号代表精确匹配，使用了`=`后是根据其后的模式进行精确匹配。也使用正则表达式设置访问权限。

```shell
location ~\.php$ {
    deny all;
}
```

### 设置虚拟主机

虚拟主机是指在一台物理主机服务器上划分出多个磁盘空间，每个磁盘空间都是一个虚拟主机，每台虚拟主机都可以对外提供Web服务，并且互不干扰。配置虚拟主机可以基于端口号、基于IP和基于域名。

**基于端口号**来配置虚拟主机，原理是 Nginx 监听多个端口，根据不同的端口号，来区分不同的网站。

在配置文件夹下新建一个配置文件 `8001.conf` ，作为子配置文件：

```shell
server{
    listen 8001;
    server_name localhost;
    root /usr/local/var/www/html8001;
    index index.html;
}

# 监听 8001 端口，跟目录在 /usr/local/var/www/html8001 文件夹下，首页是 index.html
```

**基于IP**和基于端口的配置几乎一样，只是把`server_name`选项，配置成IP就可以了。

```shell
server{
    listen 80;
    server_name 112.74.164.244;
    root /usr/local/var/www/html8001;
    index index.html;
}
```

**基于域名**配置虚拟主机，把`server_name`选项，配置成域名就可以了。

```shell
server{
    listen 80;
    server_name zq.com;
    root /usr/local/var/www/html8001;
    index index.html;
}
```

### 反向代理

客户端发送的请求，内容被发送到代理服务器上，这个代理服务器再把请求发送到自己设置好的内部服务器上，而用户真实想获得的内容就在这些设置好的服务器上。代理服务器向外部客户端提供了一个统一的代理入口，客户端的请求都要先经过这个代理服务器。具体访问那个服务器是由 Nginx 来控制的。再简单点来讲，一般代理指代理的客户端，反向代理是代理的服务器。

使用反向代理用户只能通过外来网来访问代理服务器，并且用户并不知道自己访问的真实服务器是那一台，可以很好的提供安全保护。反向代理的主要用途是实现服务器压力的平均分配，为多个服务器提供负债均衡、缓存等功能。

```shell
server{
        listen 80;
        server_name nginx.a.com;
        location / {
               proxy_pass http://a.com;
        }
}
# 将 nginx.a.com 代理到 a.com
```

反向代理还有些常用的指令：

- proxy_set_header :在将客户端请求发送给后端服务器之前，更改来自客户端的请求头信息。
- proxy_connect_timeout:配置Nginx与后端代理服务器尝试建立连接的超时时间。
- proxy_read_timeout : 配置Nginx向后端服务器组发出read请求后，等待相应的超时时间。
- proxy_send_timeout：配置Nginx向后端服务器组发出write请求后，等待相应的超时时间。
- proxy_redirect :用于修改后端服务器返回的响应头中的Location和Refresh。

### 适配pc端和移动端

Nginx通过内置变量 `$http_user_agent`，可以获取到请求客户端的 userAgent，就可以用户目前处于移动端还是PC端，进而展示不同的页面给用户。

```shell
server{
    listen 80;
    server_name nginx2.jspang.com;
    location / {
        root /usr/share/nginx/pc;
        if ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {
            root /usr/share/nginx/mobile;
        }
        index index.html;
    }
}
```



















