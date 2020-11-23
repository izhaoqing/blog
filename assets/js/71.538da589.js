(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{407:function(t,s,a){"use strict";a.r(s);var n=a(21),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"nginx"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#nginx"}},[t._v("#")]),t._v(" Nginx")]),t._v(" "),a("h3",{attrs:{id:"替换默认-homebrew-源"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#替换默认-homebrew-源"}},[t._v("#")]),t._v(" 替换默认 HomeBrew 源")]),t._v(" "),a("p",[t._v("使用阿里云的源")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 替换brew.git:")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),t._v("brew --repo"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v('"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 替换homebrew-core.git:")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),t._v("brew --repo"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v('/Library/Taps/homebrew/homebrew-core"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 应用生效")]),t._v("\nbrew update\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 替换homebrew-bottles:")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>")]),t._v(" ~/.zshrc\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("source")]),t._v(" ~/.zshrc\n")])])]),a("p",[t._v("使用回官方源：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 重置brew.git:")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),t._v("brew --repo"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v('"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote set-url origin https://github.com/Homebrew/brew.git\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 重置homebrew-core.git:")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),t._v("brew --repo"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v('/Library/Taps/homebrew/homebrew-core"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote set-url origin https://github.com/Homebrew/homebrew-core.git\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#删除zshrc HOMEBREW_BOTTLE_DOMAIN内容")]),t._v("\n")])])]),a("h3",{attrs:{id:"安装-nginx"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装-nginx"}},[t._v("#")]),t._v(" 安装 nginx")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("brew "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" nginx\n")])])]),a("h3",{attrs:{id:"启动-nginx"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#启动-nginx"}},[t._v("#")]),t._v(" 启动 nginx")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("nginx\nbrew services start nginx\n")])])]),a("p",[t._v("启动成功后，打开 http://localhost:8080")]),t._v(" "),a("h3",{attrs:{id:"文件目录"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文件目录"}},[t._v("#")]),t._v(" 文件目录")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("nginx安装文件目录\n/usr/local/Cellar/nginx")])]),t._v(" "),a("li",[a("p",[t._v("nginx配置文件目录\n/usr/local/etc/nginx")])]),t._v(" "),a("li",[a("p",[t._v("config文件目录\n/usr/local/etc/nginx/nginx.conf")])]),t._v(" "),a("li",[a("p",[t._v("系统hosts位置\n/private/etc/hosts")])]),t._v(" "),a("li",[a("p",[t._v("主页文件")]),t._v(" "),a("p",[t._v("/usr/local/var/www")])])]),t._v(" "),a("h3",{attrs:{id:"常用命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常用命令"}},[t._v("#")]),t._v(" 常用命令")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("nginx  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#启动nginx")]),t._v("\nnginx -V "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#查看版本，以及配置文件地址")]),t._v("\nnginx -v "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#查看版本")]),t._v("\nnginx -s reload"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("reopen"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("stop"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("quit   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#重新加载配置|重启|快速停止|安全关闭nginx")]),t._v("\nnginx -h "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#帮助")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ps")]),t._v(" aux "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" nginx "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#查看nginx服务")]),t._v("\n")])])]),a("h3",{attrs:{id:"卸载-nginx"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#卸载-nginx"}},[t._v("#")]),t._v(" 卸载 nginx")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("brew uninstall nginx\n")])])]),a("h3",{attrs:{id:"配置文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置文件"}},[t._v("#")]),t._v(" 配置文件")]),t._v(" "),a("p",[t._v("/usr/local/etc/nginx/nginx.conf 文件是Nginx总配置文件:")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#运行用户，默认即是nginx，可以不进行设置")]),t._v("\nuser  nginx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#Nginx进程，一般设置为和CPU核数一样")]),t._v("\nworker_processes  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#错误日志存放目录")]),t._v("\nerror_log  /var/log/nginx/error.log warn"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#进程pid存放位置")]),t._v("\npid        /var/run/nginx.pid"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\nevents "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    worker_connections  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1024")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 单个后台进程的最大并发数")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\nhttp "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    include       /etc/nginx/mime.types"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#文件扩展名与类型映射表")]),t._v("\n    default_type  application/octet-stream"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#默认文件类型")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#设置日志模式")]),t._v("\n    log_format  main  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$remote_addr")]),t._v(" - "),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$remote_user")]),t._v(" ["),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$time_local")]),t._v('] "'),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$request")]),t._v("\" '")]),t._v("\n                      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$status")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$body_bytes_sent")]),t._v(' "'),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$http_referer")]),t._v("\" '")]),t._v("\n                      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'\""),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$http_user_agent")]),t._v('" "'),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$http_x_forwarded_for")]),t._v("\"'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    access_log  /var/log/nginx/access.log  main"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#nginx访问日志存放位置")]),t._v("\n\n    sendfile        on"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#开启高效传输模式")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#tcp_nopush     on;    #减少网络报文段的数量")]),t._v("\n\n    keepalive_timeout  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("65")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#保持连接的时间，也叫超时时间")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#gzip  on;  #开启gzip压缩")]),t._v("\n\n    include /etc/nginx/conf.d/*.conf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#包含的子配置项位置和文件")]),t._v("\n")])])]),a("p",[t._v("/usr/local/etc/nginx/nginx.conf.default 是一个子文件的配置项:")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("server "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    listen       "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#配置监听端口")]),t._v("\n    server_name  localhost"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  //配置域名\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#charset koi8-r;     ")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#access_log  /var/log/nginx/host.access.log  main;")]),t._v("\n\n    location / "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        root   /usr/share/nginx/html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#服务默认启动目录")]),t._v("\n        index  index.html index.htm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#默认访问文件")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#error_page  404              /404.html;   # 配置404页面")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# redirect server error pages to the static page /50x.html")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#")]),t._v("\n    error_page   "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("500")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("502")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("503")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("504")]),t._v("  /50x.html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#错误状态码的显示页面，配置后需要重启")]),t._v("\n    location "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" /50x.html "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        root   /usr/share/nginx/html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# proxy the PHP scripts to Apache listening on 127.0.0.1:80")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#location ~ \\.php$ {")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#    proxy_pass   http://127.0.0.1;")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#}")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#location ~ \\.php$ {")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#    root           html;")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#    fastcgi_pass   127.0.0.1:9000;")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#    fastcgi_index  index.php;")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#    include        fastcgi_params;")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#}")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# deny access to .htaccess files, if Apache's document root")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# concurs with nginx's one")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#location ~ /\\.ht {")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#    deny  all;")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"修改端口"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#修改端口"}},[t._v("#")]),t._v(" 修改端口")]),t._v(" "),a("p",[t._v("修改 "),a("code",[t._v("/usr/local/etc/nginx/nginx.conf")])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("http "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    server "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        listen       "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8181")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        server_name  localhost"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  \n\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#charset koi8-r;")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"配置-404-页面"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置-404-页面"}},[t._v("#")]),t._v(" 配置 404 页面")]),t._v(" "),a("p",[t._v("修改配置:")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("error_page "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("404")]),t._v("  /404.html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nerror_page "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("404")]),t._v("  http://baidu.com"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#使用外部页面")]),t._v("\n")])])]),a("p",[t._v("在 "),a("code",[t._v("usr/local/var/www/")]),t._v(" 下新增 404.html")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  ...\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("html")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("h3",{attrs:{id:"访问控制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#访问控制"}},[t._v("#")]),t._v(" 访问控制")]),t._v(" "),a("p",[t._v("服务器只允许特定主机访问。可以在 "),a("code",[t._v("location")]),t._v(" 里配置。"),a("code",[t._v("deny")]),t._v(" 表示禁止，"),a("code",[t._v("allow")]),t._v(" 表示允许。在同一个块下的权限指令，匹配到就不会再继续匹配下一条规则了。")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("location / "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    deny "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("123.4")]),t._v(".32.3"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    allow "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("35.33")]),t._v(".202.3"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("网站下的 img 可以被所有用户访问，但 admin 目录则只允许公司内部固定IP访问，需要 "),a("code",[t._v("location")]),t._v(" 块来完成相关的需求匹配。")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("location "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" /img "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    allow all\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nlocation "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" /admin "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    deny all"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[a("code",[t._v("=")]),t._v("号代表精确匹配，使用了"),a("code",[t._v("=")]),t._v("后是根据其后的模式进行精确匹配。也使用正则表达式设置访问权限。")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("location ~"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(".php$ "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    deny all"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"设置虚拟主机"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#设置虚拟主机"}},[t._v("#")]),t._v(" 设置虚拟主机")]),t._v(" "),a("p",[t._v("虚拟主机是指在一台物理主机服务器上划分出多个磁盘空间，每个磁盘空间都是一个虚拟主机，每台虚拟主机都可以对外提供Web服务，并且互不干扰。配置虚拟主机可以基于端口号、基于IP和基于域名。")]),t._v(" "),a("p",[a("strong",[t._v("基于端口号")]),t._v("来配置虚拟主机，原理是 Nginx 监听多个端口，根据不同的端口号，来区分不同的网站。")]),t._v(" "),a("p",[t._v("在配置文件夹下新建一个配置文件 "),a("code",[t._v("8001.conf")]),t._v(" ，作为子配置文件：")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("server"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    listen "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8001")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    server_name localhost"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    root /usr/local/var/www/html8001"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    index index.html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 监听 8001 端口，跟目录在 /usr/local/var/www/html8001 文件夹下，首页是 index.html")]),t._v("\n")])])]),a("p",[a("strong",[t._v("基于IP")]),t._v("和基于端口的配置几乎一样，只是把"),a("code",[t._v("server_name")]),t._v("选项，配置成IP就可以了。")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("server"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    listen "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    server_name "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("112.74")]),t._v(".164.244"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    root /usr/local/var/www/html8001"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    index index.html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[a("strong",[t._v("基于域名")]),t._v("配置虚拟主机，把"),a("code",[t._v("server_name")]),t._v("选项，配置成域名就可以了。")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("server"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    listen "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    server_name zq.com"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    root /usr/local/var/www/html8001"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    index index.html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"反向代理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#反向代理"}},[t._v("#")]),t._v(" 反向代理")]),t._v(" "),a("p",[t._v("客户端发送的请求，内容被发送到代理服务器上，这个代理服务器再把请求发送到自己设置好的内部服务器上，而用户真实想获得的内容就在这些设置好的服务器上。代理服务器向外部客户端提供了一个统一的代理入口，客户端的请求都要先经过这个代理服务器。具体访问那个服务器是由 Nginx 来控制的。再简单点来讲，一般代理指代理的客户端，反向代理是代理的服务器。")]),t._v(" "),a("p",[t._v("使用反向代理用户只能通过外来网来访问代理服务器，并且用户并不知道自己访问的真实服务器是那一台，可以很好的提供安全保护。反向代理的主要用途是实现服务器压力的平均分配，为多个服务器提供负债均衡、缓存等功能。")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("server"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        listen "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        server_name nginx.a.com"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        location / "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n               proxy_pass http://a.com"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 将 nginx.a.com 代理到 a.com")]),t._v("\n")])])]),a("p",[t._v("反向代理还有些常用的指令：")]),t._v(" "),a("ul",[a("li",[t._v("proxy_set_header :在将客户端请求发送给后端服务器之前，更改来自客户端的请求头信息。")]),t._v(" "),a("li",[t._v("proxy_connect_timeout:配置Nginx与后端代理服务器尝试建立连接的超时时间。")]),t._v(" "),a("li",[t._v("proxy_read_timeout : 配置Nginx向后端服务器组发出read请求后，等待相应的超时时间。")]),t._v(" "),a("li",[t._v("proxy_send_timeout：配置Nginx向后端服务器组发出write请求后，等待相应的超时时间。")]),t._v(" "),a("li",[t._v("proxy_redirect :用于修改后端服务器返回的响应头中的Location和Refresh。")])]),t._v(" "),a("h3",{attrs:{id:"适配pc端和移动端"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#适配pc端和移动端"}},[t._v("#")]),t._v(" 适配pc端和移动端")]),t._v(" "),a("p",[t._v("Nginx通过内置变量 "),a("code",[t._v("$http_user_agent")]),t._v("，可以获取到请求客户端的 userAgent，就可以用户目前处于移动端还是PC端，进而展示不同的页面给用户。")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("server"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    listen "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    server_name nginx2.jspang.com"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    location / "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        root /usr/share/nginx/pc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$http_user_agent")]),t._v(" ~* "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'(Android|webOS|iPhone|iPod|BlackBerry)'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            root /usr/share/nginx/mobile"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        index index.html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);