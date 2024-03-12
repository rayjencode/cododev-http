const Butter = require('./butter')

const USERS = [
  {
    id: 1,
    name: 'apple',
    username: 'apple',
    password: 'apple',
  },
  {
    id: 2,
    name: 'orange',
    username: 'orange',
    password: 'orange',
  },
  {
    id: 3,
    name: 'mango',
    username: 'mango',
    password: 'mango',
  },
]

const POSTS = [
  {
    id: 1,
    title: 'Post One',
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    userId: 2,
  },
]

const PORT = 9002

const server = new Butter()

// ----- Files Routes ------ //

server.route('get', '/', (req, res) => {
  console.log(`Server 2`)
  res.sendFile('./public/index.html', 'text/html')
})

server.route('get', '/login', (req, res) => {
  res.sendFile('./public/index.html', 'text/html')
})

server.route('get', '/styles.css', (req, res) => {
  res.sendFile('./public/styles.css', 'text/css')
})

server.route('get', '/scripts.js', (req, res) => {
  res.sendFile('./public/scripts.js', 'text/javascript')
})

// ------- JSON Routes ------ //

server.route('post', '/api/login', (req, res) => {
  let body = ''

  req.on('data', (chunk) => {
    body += chunk.toString('utf-8')
  })

  req.on('end', () => {
    body = JSON.parse(body)
    // console.log(body)

    const username = body.username
    const password = body.password

    const user = USERS.find((i) => i.username === username)

    if (user && user.password === password) {
      res.status(200).json({
        msg: 'Loggedin successfully',
      })
    } else {
      res.status(401).json({
        error: 'Invalid username or password',
      })
    }
  })
})

server.route('get', '/api/posts', (req, res) => {
  const posts = POSTS.map((item) => {
    return {
      ...item,
      author: USERS.find((i) => i.id === item.userId).name,
    }
  })
  res.status(200).json(posts)
})

server.listen(PORT, () => {
  console.log(`Server 2 Connected on port ${PORT}`)
})
