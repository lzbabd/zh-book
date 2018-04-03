# 纵横阅读

> 基于vue + 追书api实现的小说阅读应用(UI仿纵横小说)


## 概述

这个项目后端使用express，前端使用了vue。

前端技术栈为:
- vue
- vue-router
- vuex ...
- hotcss
- stylus + postcss
- axios

后端技术栈为:
- express
- body-parser
- express-session
- compression
- compression
- nginx + pm2

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
│   │   ├── reset.styl
│   │   ├── public.styl
│   │   └── ...
│   ├── font            # 字体文件
│   ├── image           # 图片文件
│   │   └── ...
│   └── js              # js文件
│       ├── utils.js
│       └── ...
├── base                # 基础组件
│   ├── Tips.vue
│   └── ...
├── components          # 页面级组件
│   └── ...
├── main.js             # 入口JS文件
├── router              # 路由配置
│   └── index.js        # 导出路由
└── vuex                # vuex文件夹
```

## 项目后端目录 */server*
``` bash
.
├── api                 # 请求文件夹
│   ├── README.md
│   ├── index.js
│   └── url.js          # 接口地址
├── app.js              # 入口文件
├── config.js           # 配置文件
├── lib                 # 工具库
│   └── utils.js        # 工具
├── middleware          # 中间件
│   └── index.js
├── mock                # mock数据
│   ├── 1.json
│   ├── banner.json
│   ├── bookList.json
│   ├── defaultBook.json
│   ├── hot.json
│   ├── overBook.json
│   ├── rank.json
│   └── user.json
└── route               # 路由文件夹
    ├── book.js         # 书籍模块
    ├── user.js         # 用户模块
    └── view.js         # 视图模块

```

## 项目预览地址

![链接](http://note.zeebin.top/public/img/qr_code.png)

## 辅助开发资源

追书API:
https://github.com/zimplexing/vue-nReader/blob/master/doc/zhuishushenqi.md

hotcss:
http://imochen.github.io/hotcss/

## 功能完成进度

- [x] 书籍分类
- [x] 书籍列表
- [x] 搜索书籍
- [x] 登录注册
- [x] 书架功能
- [x] 书籍阅读
- [x] 主题切换
- [ ] 书架目录


