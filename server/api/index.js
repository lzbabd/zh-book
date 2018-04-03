const {category, book, rank, comment, bookList} = require('./url');
const axios = require('axios');

// axios 请求配置
axios.defaults.baseURL = 'http://api.zhuishushenqi.com';
axios.interceptors.response.use(res => res.data);

// 获取分类
let getCategory = () => axios.get(category.categoryWithBookCount)

// 获取书籍列表
let getBooks = aryId => aryId.map(id => axios.get(`${book.bookInfo}/${id}`))

// 获取书籍详情
let getBookDetail = id => axios.get(`${book.bookInfo}/${id}`)

// 搜索书籍/作者
let searchBookAndAuthor = ({query = '', start = 0, limit = 10}) => axios.get(book.bookSearch, {
  params: {query, start, limit}
})

/**
 * 获取分类书籍
 * @query {}
 * gender: 'male' // 性别 (female,male,press)
 * type: 'reputation' // 按照不同的类型获取分类下的书籍(hot, new, reputation, over)
 * minor: '东方玄幻' // 子分类
 * start: 0 // 起始位置
 * limit: 20 //每页数量
 */
let getCategoryBooks = query => axios.get(category.categoryInfo, {
  params: query
})

// 获取全部书源
let getSources = bookId => axios.get(book.bookSources, {
  params: {view: 'summary', book: bookId}
})

let getRecommend = bookId => {
  return axios.get(`/book/${bookId}/recommend`)
}

// 获取章节列表(根据书籍id)
let getChapters = bookId => axios.get(`${book.bookChaptersByBookId}/${bookId}?view=chapters`)

// 获取章节内容(根据link)
let getChapterContent = link => axios.get(`${book.chapterContent}/${link}`)

// 关键词补充
let keyComplete = word => axios.get(`${book.searchKeyWord}`, {
  params: {query: word}
})

// 获取书籍最新更新信息
let getBookUpdate = id => axios.get(book.bookUpdate, {
  params: {view: 'updated', id: id}
})

// 获取圈子信息 app.zongheng.com/app/forum/v1/ajax/hotForums
let getHotForums = page => axios.post('http://app.zongheng.com/app/forum/v1/ajax/hotForums', {
  pageNum: page
})


let getRank = () => axios.get(rank.rankInfo)
module.exports = {
  getCategory,
  getBooks,
  getBookDetail,
  searchBookAndAuthor,
  getCategoryBooks,
  getChapters,
  getChapterContent,
  keyComplete,
  getBookUpdate,
  getHotForums,
  getRank,
  getRecommend
}
