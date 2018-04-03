const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const compression = require('compression');
const config = require('./config')
const {setCORS, isLogin} = require('./middleware/index')
const {readFile} = require('./lib/utils');

/**
 * Create Server
 */
app.listen(config.PORT, () => {
  console.log(`server is running at port to ${config.PORT}...`);
});

/**
 * Public Middleware
 */
// CORS
app.use(setCORS());

// SESSION
app.use(session({
  secret: 'zh',//=>用来对SESSION-ID相关的COOKIE进行签名
  saveUninitialized: false, //=>是否自动保存未初始化的会话，建议FALSE
  resave: false, //=>是否每次都重新保存会话，建议FALSE
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30 //=>有效期，单位是毫秒
  }
}));

// BODY-PARSER
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// COMPRESSION GZIP
app.use(compression({filter: shouldCompress}))

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // 不压缩此响应头的请求
    return false
  }
  // 标准压缩
  return compression.filter(req, res)
}

// USER DATA (必须在登录验证之前注入)
app.use(async (req, res, next) => {
  let result = await readFile('user.json')
  req.userList = result.userList
  req.userCount = result.num
  next()
});

// INIT LOGIN
app.use(isLogin())

//
app.get('/', (req, res) => {
  res.redirect('/index.html')
});

/**
 * Handle Route API
 */
app.use('/book', require('./route/book'));
app.use('/view', require('./route/view'))
app.use('/user', require('./route/user'))


/**
 * Handle Static Resource
 */
app.use(express.static(path.join(__dirname, '../dist')));

/**
 * Handle Other
 */
app.use((req, res) => {
  res.status(404);
  res.send('NOT FOUND!')
});
