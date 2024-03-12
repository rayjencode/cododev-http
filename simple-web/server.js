const Butter = require('./butter')

const PORT = 9001

const server = new Butter()

server.route('get', '/', (req, res) => {
  res.sendFile('./public/index.html', 'text/html')
})
server.route('get', '/style.css', (req, res) => {
  res.sendFile('./public/style.css', 'text/css')
})
server.route('get', '/scripts.js', (req, res) => {
  res.sendFile('./public/scripts.js', 'text/javascript')
})

server.route('post', '/login', (req, res) => {
  res.status(400).json({
    msg: 'Bad login request',
  })
})

server.listen(PORT, () => {
  console.log(`Server Listen to PORT ${PORT}`)
})
