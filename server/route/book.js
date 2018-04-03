const express = require('express');
const route = express.Router();
const utils = require('../lib/utils');
const {
  getCategory,
  getBooks,
  getBookDetail,
  getCategoryBooks,
  getChapters,
  getChapterContent,
  searchBookAndAuthor,
  getRank,
  getRecommend
} = require('../api/index')


// 获取分类
route.get('/category', async (req, res) => {
  let result = await getCategory();
  for (let key in result) {
    if (!result.hasOwnProperty(key) || !Array.isArray(result[key])) continue;
    result[key] = result[key].map(item => {
      delete item['icon']
      delete item['bookCover']
      delete item['monthlyCount']
      return item
    })
  }
  res.send(result)
})

// todo 获取书籍列表
route.get('/list', async (req, res) => {
  let arr = [
    '5a9e4da7a5ee611ea424b033',
    '222',
    '5a5577e59b2420ef3fda94f2',
    '5a5577e59b2420ef3fda94f2',
    '5a780680acaa077a60c2f3b3',
  ]
  let result = await Promise.all(getBooks(arr))
  result = result.filter(book => book['_id'])
  res.send(result);

})

// 查看书籍详情 (id:xxx)
route.get('/detail/:id', async (req, res) => {
  let result = await getBookDetail(req.params['id']);
  if (result['_id']) {
    return res.send({
      code: 200,
      message: 'ok',
      result
    })
  }
  res.send({
    code: 404,
    message: result.msg,
  })

})
// 获取相关书籍
route.get('/recommend/:id', async (req, res) => {
  let result = await getRecommend(req.params['id']);
  res.send({
    code: 200,
    message: 'ok',
    books: result.books || [],
  })

})

// 获取分类书籍 (query: {})
route.get('/categoryBooks', async (req, res) => {
  let {
    gender = 'male',
    type = 'reputation',
    major = '玄幻',
    minor = '',
    start = 0,
    limit = 10
  } = req.query;
  let query = {
    gender,
    type,
    major,
    minor,
    start,
    limit,
  }
  let result = await getCategoryBooks(query);
  res.send(result);

})

// 获取章节列表
route.get('/chapters/:id', async (req, res) => {
  let result = await getChapters(req.params['id']);
  res.send(result);

})

// 获取章节内容 query ?link必须转码 encodeURIComponent
route.get('/chapter/content', async (req, res) => {
  let link = encodeURIComponent(req.query['link'])
  let result = await getChapterContent(link);
  res.send(result);

})

// 搜索书籍 query ?keyword = {}
route.get('/search', async (req, res) => {
  let result = await searchBookAndAuthor(req.query)
  res.send(result);

})

// 获取排行榜信息
route.get('/ranking', async (req, res) => {
  let result = await getRank()
  res.send({code: 200, message: 'ok', result: result['ranking']});

})

module.exports = route;
