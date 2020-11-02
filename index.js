const http = require('http')
const fs = require('fs')
const request = require('request')
const axios = require('axios');
const ctype = {'Content-Type': 'text/html;charset=utf-8'}

//APIの実行
async function getData() {
  const url = 'http://aikatsup.com/api/v1/search'
  return await axios.get(url, {
    params: {
      id: 3144
    }
  })
}

//画像の保存
function outPutImg(data) {
  request(data.image.url).pipe(fs.createWriteStream('img/' +data.id+ '_' +data.words+ '.jpg'))
}

function handler (req, res) {
  res.writeHead(200, ctype)

  getData().then((data) => {
    data = data.data.item
    outPutImg(data)
    resData = '<h1>' +data.id+ '_' + data.words + '</h1><img src=\"' +data.image.url+ '\" width=\"960\">'
    res.end(resData)
  }).catch(() => {
    resData = 'api通信失敗'
    res.end(resData)
  })
}

const svr = http.createServer(handler)
console.log('http://localhost:3000')
svr.listen(3000)