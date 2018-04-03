# 纵横阅读

> 基于vue + 追书api实现的小说阅读应用(UI仿纵横小说)


## 概述

这个项目后端使用express，前端使用了vue。

前端技术栈为

基础列库：vue
路由：vue-router
数据管理：vuex ...
前端路由管理：vue-router
移动端布局: hotcss
样式：stylus + postcss

## 运行方式
### 安装nodejs8.9+
Mac：安装nvm，使用nvm安装相应版本Nodejs Windows：Node.js官方安装最新版本

``` bash
# 安装依赖
npm install
```

### 开发环境
``` bash
# Node.js端运行在 localhost:4000
npm run dev-server

# Borwser端运行在 localhost:8080
npm start
```


### 生产环境
``` bash
# Node.js服务器
npm run server

# 编译代码
npm run build
```

## 项目前端目录 */src*
``` bash
.
├── App.vue             # 根组件
├── api                 # 数据请求文件夹
│   ├── config.js       # axios配置
│   └── index.js        # 请求方法
├── assets              # 静态资源文件夹(被编译处理)
│   ├── css             # css
│   ├── font            # 字体文件
│   ├── image           # 图片文件
│   └── js              # js文件
├── base                # 基础组件
├── components          # 页面级组件
│   └── HelloWorld.vue  # ...
├── main.js             # 入口JS文件
└── router              # 路由配置
    └── index.js        # 导出路由
```

## 项目后端目录 */server*
``` bash
├── app.js              # 入口文件
├── lib                 # 工具库
│   └── utils.js        # 工具
├── mock                # mock数据
└── route               # 路由文件夹
    └── ...

```

## 项目预览地址

![链接](http://note.zeebin.top/public/img/qr_code.png)



## 辅助开发资源


# 其他未完成功能


