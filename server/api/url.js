module.exports = {
  staticHost: 'http://statics.zhuishushenqi.com',
  category: {
    // 带书籍数量的父分类
    categoryWithBookCount: '/cats/lv2/statistics',
    // 带子分类的父分类
    categoryWithSubCategories: '/cats/lv2',
    // 分类详情: 带着书籍
    categoryInfo: '/book/by-categories'
  },
  book: {
    // 书籍详情
    bookInfo: '/book', // id 书籍id
    // 书籍最新章节
    bookUpdate: '/book', //query ?view=updated&id=id,id(可以查询多条)
    // 相关推荐
    relatedRecommendedBooks: '/book', // /book/56d0b60dfb51235c3a7a2739/recommend
    // 作者名下的书籍
    authorBooks: '/book/accurate-search', // query ?author=忘语
    // 书籍章节列表(根据书源id)
    bookChaptersBySourcesId: '/atoc', // :sourcesId?view=chapters
    // 书籍章节列表(根据书id)
    bookChaptersByBookId: '/mix-atoc', // :bookId?view=chapters
    // 书源
    bookSources: '/atoc', // query ?view=summary&book=5779b38d3b433dd647d95da2
    // 章节内容:id 单章id
    chapterContent: 'http://chapter2.zhuishushenqi.com/chapter', //id: chapter id
    // 书籍搜索 可以搜索作者但是不精确
    bookSearch: '/book/fuzzy-search', //query ?query=凡人修仙传
    // 搜索自动补充
    searchKeyWord: '/book/auto-complete' //query ?query=凡
  },
  rank: {
    // 排名分类
    rankCategory: '/ranking/gender',
    // 排名详情(起点月票榜)
    rankInfo: '/ranking/54d4306c321052167dfb75e4' // id: rank id
  },
  comment: {
    // 讨论
    discussions: '/post/by-book',
    // 短评
    shortReviews: '/post/short-review',
    //长评
    bookReviews: '/post/review/by-book'
  },
  bookList: {
    // 书单
    lists: '/book-list',
    // 列表
    detail: '/book-list' // bookId
  }
}
