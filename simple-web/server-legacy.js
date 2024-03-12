const http = require('node:http')
const fs = require('node:fs/promises')

const server = http.createServer()

server.on('request', async (request, response) => {
  if (request.url === '/' && request.method === 'GET') {
    // console.log(request)
    response.setHeader('Content-Type', 'text/html')
    const fileHandle = await fs.open('./public/index.html', 'r')
    const fileStream = fileHandle.createReadStream()

    fileStream.pipe(response)
  }
  if (request.url === '/style.css' && request.method === 'GET') {
    response.setHeader('Content-Type', 'text/css')
    const fileHandle = await fs.open('./public/style.css', 'r')
    const fileStream = fileHandle.createReadStream()

    fileStream.pipe(response)
  }
  if (request.url === '/scripts.js' && request.method === 'GET') {
    // console.log(request.url)
    response.setHeader('Content-Type', 'text/javascript')

    const fileHandle = await fs.open('./public/scripts.js', 'r')
    const fileStream = fileHandle.createReadStream()

    fileStream.pipe(response)
  }
  if (request.url === '/login' && request.method === 'POST') {
    response.setHeader('Content-Type', 'application/json')
    response.statusCode = 2000

    const body = {
      msg: 'Logging in...',
    }

    response.end(JSON.stringify(body))
  }
  if (request.url === '/user' && request.method === 'PUT') {
    response.setHeader('Content-Type', 'application/json')
    response.statusCode = 401

    const body = {
      msg: 'You must first loggedin',
    }
    response.end(JSON.stringify(body))
  }

  if (request.url === '/upload' && request.method === 'PUT') {
    response.setHeader('Content-Type', 'application/json')
    const fileHandle = await fs.open('./storage/image.jpg', 'w')
    const fileStream = fileHandle.createWriteStream()

    request.pipe(fileStream)

    request.on('end', () => {
      response.statusCode = 201
      response.end(
        JSON.stringify({
          msg: 'Successfully Uploaded',
        })
      )
    })
  }
})

server.listen(9000, () => {
  console.log('Web Server is live at http://localhost:9000')
})
