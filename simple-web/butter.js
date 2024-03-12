const http = require('node:http')
const fs = require('node:fs/promises')

class Butter {
  constructor() {
    this.server = http.createServer()

    /**
     *
     * {
     * "get/": () =>{...},
     * "post/upload": ()=> {...}
     * }
     *
     * this.routes["get/"]()
     *
     */
    this.routes = {}

    this.server.on('request', (req, res) => {
      // console.log('A request come in')

      res.sendFile = async (path, mime) => {
        const fileHandle = await fs.open(path, 'r')
        const fileStream = fileHandle.createReadStream()

        res.setHeader('Content-Type', mime)

        fileStream.pipe(res)
      }

      //   set status code
      res.status = (code) => {
        res.statusCode = code
        return res
      }

      // send a json data to the client (for small json data, less than the highWatermark)
      res.json = (data) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(data))
      }

      if (!this.routes[req.method.toLowerCase() + req.url]) {
        return res.status(404).json({
          error: `Cannot ${req.method} ${req.url}`,
        })
      }
      this.routes[req.method.toLowerCase() + req.url](req, res)
      //   res.statusCode = 200
    })
  }

  route(method, path, cb) {
    // console.log(`method`, method)
    // console.log(`path`, path)
    // console.log(`path`, cb)
    this.routes[method + path] = cb
  }

  listen(port, cb) {
    this.server.listen(port, () => {
      cb()
    })
  }
}

module.exports = Butter
