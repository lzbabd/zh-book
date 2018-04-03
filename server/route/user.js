const express = require('express');
const route = express.Router();
const {writeFile} = require('../lib/utils');
const {getBooks, getHotForums} = require('../api/index')

// 判断是书籍是否已经存入书架
let hasInBookshelf = (req, bid) => req.bookshelf.some(item => item['bid'] === bid);


// 请求书架列表
route.get('/bookshelf', (req, res) => {

  let bookshelf = req.bookshelf || [];

  // 生成请求bid数组
  bookshelf = bookshelf.map(item => item.bid)

  Promise.all(getBooks(bookshelf)).then(result => {
    res.send({code: 200, result: result, message: 'ok'})
  }).catch(err => {
    console.log(err);
    res.send({code: 404, result: [], message: 'error'})
  })

})

// 添加到书架列表 post {id:bookid}
route.post('/bookshelf', async (req, res) => {
  let bookId = req.body.id;
  // 判断是否已经存入书架
  if (hasInBookshelf(req, bookId)) {
    // 这本书已经在书架了
    return res.send({code: 404, message: 'Have it already'})
  }
  let newBook = {bid: bookId}
  if (req.isLogin) {
    // 用户已登录 存入user文件
    let userId = req.session.userId;
    let user = req.userList.find(item => parseInt(item.id) === parseInt(userId))
    user['bookshelf'].unshift(newBook)
    writeFile('user.json', {
      num: req.userCount,
      userList: req.userList
    }).then(() => {
      return res.send({code: 200, message: 'ok'})
    })
  } else {
    // 用户没有登录 存入session书架
    req.session.bookshelf.unshift(newBook)
    res.send({code: 200, message: 'ok'})
  }
})

// 从书架列表移除 post {id:bookid}
route.delete('/bookshelf/:id', async (req, res) => {
  let bookId = req.params.id;
  // 判断是否存在
  if (!hasInBookshelf(req, bookId)) {
    // 这本书不存在
    return res.send({code: 404, message: 'Invalid id'})
  }

  if (req.isLogin) {
    // 用户已登录 从user文件删除
    let userId = req.session.userId;
    let user = req.userList.find(item => parseInt(item.id) === parseInt(userId))
    let n = user['bookshelf'].findIndex(item => item['bid'] === bookId) || 0;
    user['bookshelf'].splice(n, 1)
    writeFile('user.json', {
      num: req.userCount,
      userList: req.userList
    }).then(() => {
      return res.send({code: 200, message: 'ok'})
    })
  } else {
    // 用户没有登录 从session中删除
    let n = req.session.bookshelf.findIndex(item => item['bid'] === bookId) || 0;
    req.session.bookshelf.splice(n, 1)
    res.send({code: 200, message: 'ok'})
  }
})

// 判断是书籍是否已经存入书架
route.get('/hasBookInBookshelf/:bid', (req, res) => {
  let bid = req.params['bid']
  if (hasInBookshelf(req, bid)) {
    return res.send({code: 404, includes: true, message: '书籍已收藏'})
  }
  res.send({code: 200, includes: false, message: '书籍未收藏'})
})

// 获取圈子信息 query ? page=
route.get('/forums', async (req, res) => {
  let {result} = await getHotForums(req.query['page'])
  // 判断是否关注了
  result = result.map(item => {
    item['isFollow'] = req.isLogin ? req.userInfo['forums'].includes(item['forumId']) : false
    return item
  })
  res.send({code: 200, result, message: 'ok'})
})


// 用户登录 {username, password}
route.post('/login', (req, res) => {
  if (req.isLogin) return res.send({
    code: 401,
    message: '用户已登录',
    id: req.session.userId
  })
  let {username, password} = req.body;
  if (!username || !password) {
    return res.send({code: 404, message: 'Invalid params'})
  }
  let user = req.userList.find(item => item.username === username);

  if (user) {
    if (user.password === password) {
      req.session.userId = user.id;
      req.session.bookshelf = null;
      return res.send({code: 200, message: 'ok', id: user.id});
    }
    return res.send({code: 400, message: '用户名或密码错误'})
  }
  res.send({code: 402, message: '用户名未注册'})
})

// 退出登录
route.get('/logout', (req, res) => {
  if (!req.isLogin) return res.send({
    code: 401,
    message: '用户未登录'
  })

  req.session.userId = null;
  req.session.bookshelf = null;
  res.send({code: 200, message: 'ok'})
})

// 用户注册 {username, password}
route.post('/register', async (req, res) => {
  let {username, password} = req.body;
  if (!username || !password) {
    return res.send({code: 404, message: 'Invalid params'})
  }
  let user = req.userList.find(item => item.username === username);

  if (user) {
    return res.send({code: 400, message: '用户名已存在'})
  }

  let newUser = {
    "id": ++req.userCount,
    "username": username.toString(),
    "password": password.toString(),
    "bookshelf": [],
    "forums": []
  }
  req.userList.push(newUser)
  writeFile('user.json', {
    num: req.userCount,
    userList: req.userList
  }).then(() => {
    return res.send({code: 200, message: 'ok', id: newUser.id})
  }).catch(e => {
    console.log(e);
    return res.send({code: 404, message: 'error'})
  })
})

// 验证是否登录
route.get('/isLogin', (req, res) => {
  if (req.isLogin) {
    res.send({
      code: 200,
      isLogin: true,
      message: '用户已登录',
      id: req.session.userId
    })
    return
  }
  res.send({code: 404, isLogin: false, message: '用户未登录'})
})

// 请求用户信息
route.get('/userInfo', async (req, res) => {
  if (!req.isLogin) return res.send({
    code: 401,
    message: '用户未登录'
  })
  let info = req.userInfo || {};
  res.send({
    code: 200,
    result: info,
    id: req.session.userId
  })
})


module.exports = route;
