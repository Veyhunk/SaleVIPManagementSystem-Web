# SaleVIPManagementSystem-Web
### 项目结构说明
```javascript
 |-app                        // WEB前端模块源码
    |-shared                  // 共享模块
    |-layout                  // 网页布局
    |-demo                    // 演示模块
        |-module.js           // 模块注册和配置
    |-app.js                  // angular顶层入口，在其它模块定义的Module要在这里注入
    |-main.js                 // 手动bootstrap（运行）项目
 |-assets                     // 资源: js、css、images、lib(第三方插件，非Bower和npm)
 |-bower_components           // bower前端依赖组件
 |-node_modules               // npm依赖包
 |-build                      // 部署打包生成文件
 |-tests                      // 测试
 |-404.html
 |-app.scripts.json           // 依赖插件配置
 |-bower.json                 
 |-package.json                 
 |-gulpfile.js                
 |-README.md                               
 |-index.html 
```
## Node版本说明
安装 [n](https://github.com/tj/n) 进行 Node.js 多版本管理，安装完成后，运行 n lts 安装切换到最新的 Node 版本，
我的当前 Node 版本为v6.9.1，npm 版本为v3.10.8。

## 命名规范说明
多数规范延用[here](http://www.yuyanping.com/Front_End/front_end_team_development_style/)，在目录结构上作如下调整：
 
 * 不再使用 controllers、services、directives等文件夹在具体模块内部。
 * 使用.controller、.service、.direcitve、.tpl在模块内部标识。

如下格式：
```javascript
app/
    app.module.js
    app.config.js
    app.routes.js
    directives.js
    layout/
        shell.html      
        shell.controller.js
        topnav.html      
        topnav.controller.js       
    people/
        attendees.html
        attendees.controller.js  
        speakers.html
        speakers.controller.js
        speaker-detail.html
        speaker-detail.controller.js
    sessions/
        sessions.html      
        sessions.controller.js
        session-detail.html
        session-detail.controller.js  
    services/       
        data.service.js  
        localstorage.service.js
        logger.service.js   
        spinner.service.js
```

注意： `session-detail.controller.js`这样的命名，在 angular 里面应该是`SeesionDetailCtrl`这种 Pascal 命名方式，模块应该尽可能的小和高内聚，
这样每一个模块并不会有太多的文件。

使用 `controller as` 后面对象用camelCase 命令方式，如：
```javascript
ng-controller="MyMainCtrl as myMain"
ng-controller="MainCtrl as main"
```

## 第三方插件的引入

首先通过 `bower` 安装第三方插件，记住要加上`--save`参数，这样会自动写入 bower.json 文件，随后到项目根目录下找到`app.scripts.json`文件，按着里面的规则添加下插件信息，重新 gulp 启动，
这样就引入了第三方插件。

## 插件说明
### Bootstrap Google Style
使用 Google 主题的 Bootstrap，查看 [here](http://todc.github.io/todc-bootstrap/components/)。