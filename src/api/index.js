import axios from './config'

// 请求方法
export let getX = () => axios.get('/X');

export let getBoutique = () => axios.get('/view/boutique');
export let getRanking = () => axios.get('/book/ranking');
export let getCategory = () => axios.get('/book/category');
export let getTheme = o => axios.get('/book/categoryBooks', {params: o});


// user 方法
export let isLogin = () => axios.get('/user/isLogin');
export let register = (username, password) => axios.post('/user/register', {
  username, password
});
export let logout = () => axios.get('/user/logout');
export let login = (username, password) => axios.post('/user/login', {
  username, password
});
export let getUserInfo = () => axios.get('/user/userInfo');

export let getBanner = () => {
  return axios.get('/view/banner')
};


export let getBook = (id) => {
  return axios.get('/user/hasBookInBookshelf/:bid')
};
export let getDetail = id => {
  return axios.get('/book/detail/' + id)
};

export let bookRack = () => {
  return axios.get('/user/bookshelf')
};


export let getCircle = () => {
  return axios.get('/user/forums')
};

export let getRead = bid => {
  return axios.get('/book/chapters/' + bid)
};
export let getChapter = _id => {
  return axios.get('/book/chapters/' + _id)
};
export let getReadContent = link => {
  return axios.get('/book/chapter/content', {
    params: {
      link
    }
  })
};

export let getSearch = () => {
  return axios.get('/book/search')
};


export let deleteBook = id => {
  return axios.delete('/user/bookshelf/' + id);
};


// 自动补全关键词
export let getKeyword = val => axios.get('/view/keyCom?val=' + val,);
export let search = ({query, start, limit}) => axios.get('/book/search', {
  params: {
    query, start, limit
  }
});

// 判断书籍是否已存入书架
export let isCollect = bid => axios.get('/user/hasBookInBookshelf/' + bid,);


// 收藏书籍(加入书架)
export let collectBook = id => axios.post('/user/bookshelf', {id})
