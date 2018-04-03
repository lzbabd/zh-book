const express = require('express');
const route = express.Router();
const utils = require('../lib/utils');
const {keyComplete, getBooks} = require('../api')


// banner 请求接口
route.get('/banner', (req, res) => {
  utils.readFile('banner.json').then(result => {
    res.send({
      code: 200,
      result: result,
      message: 'ok'
    })
  }).catch(err => {
    res.status(404)
    res.send({
      code: 404,
      result: [],
      message: 'error'
    })
  })
})

// 关键词补充 query ? val=
route.get('/keyCom', async (req, res) => {
  keyComplete(req.query['val']).then(result => {
    return res.send(result)
  }).catch(e => {
    console.log(e.message);
    res.send({code: 404, message: 'error'})
  })
})

// 书城列表 boutique
route.get('/boutique', async (req, res) => {
  let recommend = [
    '5816b415b06d1d32157790b1',
    '56928442c49f3bce42b7f521',
    '548d9c17eb0337ee6df738f5',
    '53e56ee335f79bb626a496c9',
    '57ceb2069acafda7326052ae'
  ]
  let free = [
    '53026961b2c50edb7c080482',
    '58f825bb30a95f25565a3d02',
    '54a9edf9a8b9b8c35d8a983f',
    '520a230cff0b5cf74400277e',
    '595b8ee3a54f31975a09c9bd',
    '57a981def7c11139427720eb',
  ]
  let sell = [
    '573d655d608bed412452b999',
    '520b6093a9d7038825000344',
    '591e62e8c6212c3b4318faff',
    '582c5dfd75f1c8ab7a44a94c',
    '5710a23e44993b5a22ae36ad',
    '59dda2bf19be019161eb4bc9',
  ]
  let Male = [
    '56928442c49f3bce42b7f521',
    '5816b415b06d1d32157790b1',
    '582d9b14772890d404ee4bf1',
    '54262d86198ede733cfe3d48',
    '56de87cbadc279664982afd9',
    '5763cb49512c38e3082db209',
  ]
  let female = [
    '5a95120d4351da46cd34a271',
    '599ba0e19a5314622b8f353c',
    '5833ed3a45eb4e9f0352ab45',
    '57a3744b32a39aa8471d7800',
    '569a333316ef9be07f6260bc',
    '5532dd5ba155a7a57e70c1e3',
  ]
  let newBook = [
    '5aa0ff50df01ca1e8fe384d2',
    '54dc32e999322a3e7d946659',
    '51060bbfbb1c67cf28000026',
    '5667b5c224aafd4f3abe7c3f',
    '5836323138bcc1c615e5832b',
    '56e3cfeb4ee9d70763a24a8d',
  ]
  let data = {
    recommend: await Promise.all(getBooks(recommend)),
    free: await Promise.all(getBooks(free)),
    sell: await Promise.all(getBooks(sell)),
    Male: await Promise.all(getBooks(Male)),
    female: await Promise.all(getBooks(female)),
    newBook: await Promise.all(getBooks(newBook))
  }
  let result = {
    code: 200,
    success: 'ok',
    result: data
  }
  res.send(result);
})


module.exports = route;
