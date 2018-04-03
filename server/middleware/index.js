module.exports = {
  setCORS(host = []) {
    return (req, res, next) => {
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      res.header("Access-Control-Allow-Credentials", true);
      res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
      res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
      // res.header("X-Powered-By", '3.2.1');
      if (req.method === 'OPTIONS') {
        return res.send('support CORS')
      }
      next();
    }
  },
  // 初始化 登录/非登录 数据
  isLogin() {
    return (req, res, next) => {
      if (req.session.userId > 0) {
        // 用户已登录
        req.isLogin = true;
        req.userInfo = req.userList.find(item => parseInt(item.id) === parseInt(req.session.userId)) || {}
        req.bookshelf = req.userInfo['bookshelf'] || [];
      } else {
        req.isLogin = false;
        req.userInfo = {};
        // 用户没有登录
        if (!('bookshelf' in req.session)) {
          // 书架未初始化
          req.session.bookshelf = req.userList[0].bookshelf || [];
        }
        req.bookshelf = req.session.bookshelf
      }
      next()
    }
  }
}
