require('http')
  .createServer(onRequest)
  .listen(3000)

function onRequest (request, response) {
  const { method, url } = request
  console.log(`${method}: ${url}`)

  switch (method) {
    case 'GET':
      onGET(url, response)
      break
    case 'POST':
      onPOST(url, response, request)
  }
}

function onGET (url, response) {
  switch (url) {
    case '/favicon.ico' :
      return
    case '/':
      onIndexRequest(response)
      break
    case '/scripts/aboutBrowser.js':
      onIndexJsRequest(response)
      break
    default:
      onNotFound(response)
  }
}

const fs = require('fs')

function onIndexRequest (response) {
  response.writeHead(200, { 'Context-Type': 'text/html' })
  fs.createReadStream('../../../views/index.html').pipe(response)
}

function onIndexJsRequest (response) {
  response.writeHead(200, { 'Context-Type': 'text/javascript' })
  fs.createReadStream('../../aboutBrowser.js').pipe(response)
}

function onNotFound (response) {
  response.writeHead(404, { 'Context-Type': 'text/plain' }).end('the page is not found')
}

function onPOST (url, response, request) {
  switch (url) {
    case '/testPost':
      onTestPostRequest(response, request)
      break
  }
}

const queryString = require('querystring')

// eğer POST ise direkt req.body.nameInHTML şeklinde erişilebiliyor gönderilen veriye
// eğer GET ise req.query.nameInHTML şeklinde erişilebiliyor gönderilen veriye
function onTestPostRequest (response, request) {
  let body = ''
  request
    .on('data', data => {body += data})
    .on('end', () => {response.writeHead(200, { 'Context-Type': 'text/plain' }).end(JSON.stringify(queryString.parse(body)))})
}