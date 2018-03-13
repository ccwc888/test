![Alt text](doc/img/dva.jpg)
# dva 
继承自外部的同名开源项目，作为当前公司前端团队的主体开发框架使用   
dva的命名来自守望先锋，至于为什么是dva，百度图片大概会告诉你答案:)

---
# [工程概述](doc/工程概述.md)

# 项目依赖说明

|名称|说明||
|--------|-----:|----:|
|[antd](https://ant.design/docs/react/introduce-cn)|蚂蚁金服开源前端控件库||
|[dva](https://github.com/dvajs/dva)|前端脚手架||
|[moment](http://momentjs.com/docs/)|时间格式转换库||
|[rc-tween-one](https://motion.ant.design/components/tween-one)|动画效果处理库||
|socketcluster-client|websocket集群客户端||
|babel|语言标准转换||
|eslint|代码风格检查||
|roadhog|webpack配置等配置集约工具||
|sass-loader|css预处理||


## roadhog
配置文件见 _.roadhogrc_
* theme antd的主题处理模块，可以参见antd的[说明](https://ant.design/docs/react/customize-theme-cn)
* proxy 代理服务器配置

## eslint
配置文件见 _.eslintrc .eslintignore_
* .eslintrc 风格检查规则
* .eslintignore 忽略风格检查的文件

详见[文件和代码格式规范](doc/文件和代码格式规范.md)

# 开发环境
* 推荐使用Visual Studio Code进行开发
* 推荐使用的插件

|名称|安装命令|
|--------|----:|
|ESlint|ext install vscode-eslint|
|EditorConfig for VS Code|ext install EditorConfig|

在VS Code中使用 Control+P 调出命令面板，将安装命令复制进去，即可安装   
安装ESlint插件以后，建议在配置项中打开eslint.autoFixOnSave，这样每次文件保存时会自动格式化一次


---

d.va愛你喲❤(ӦｖӦ｡)   
![Alt text](doc/img/baddva.jpg)

