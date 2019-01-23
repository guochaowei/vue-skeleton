vue单页面骨架层设置

查看效果
 npm install
 npm run serve
 浏览器打开http://localhost:8080/，最好网络模式设为 fast-3g

开发步骤：
利用node直出在loading阶段设置骨架层
01: 使用vue-cli 创建项目 选择 Babel Progressive-Web-App-support Router Vuex Linter Sass css预处理器 save时运行eslint
02: public文件夹下的index.html，DOM里面有一个div#app，当js被执行完成之后，此div#app会被整个替换掉，在div#app内直接插入骨架屏相关内容
03: 在/src目录下新建一个Skeleton.vue文件，是要展示的骨架样式
04: 在/src目录再新建一个skeleton.entry.js入口文件
05: 在完成了骨架屏的准备之后，需要一个关键插件vue-server-renderer. 该插件本用于服务端渲染，利用它能够把.vue文件处理成html和css字符串的功能，来完成骨架屏的注入
08: 在public文件夹下新建一个template.html文件，并且其代码和index.html文件代码相同，但是需要在div#app中添加<!--vue-ssr-outlet-->占位符
09: 在根目录新建一个webpack.skeleton.conf.js文件，以专门用来进行骨架屏的构建，然后可以通过 webpack --config ./webpack.skeleton.conf.js 命令，在/dist目录下生成一个skeleton.json文件
10: 在根目录下新建一个skeleton.js，该文件即将被用于往index.html内插入骨架屏
11: 在package.json中增加一条命令"preserve": "webpack --config ./webpack.skeleton.conf.js && node skeleton.js"，放在"serve"命令之前。