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

const SESSION = []

const PORT = 8000

const server = new Butter()

// ----- Files Routes ------ //

server.route('get', '/', (req, res) => {
  res.sendFile('./public/index.html', 'text/html')
})
server.route('get', '/profile', (req, res) => {
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
      const token = Math.floor(Math.random() * 1000000000)

      SESSION.push({
        userId: user.id,
        token,
      })

      res.setHeader('Set-Cookie', `token=${token}; path=/;`)

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

server.route('get', '/api/user', (req, res) => {
  const token = req.headers.cookie.split('=')[1]
  // console.log(SESSION)
  const session = SESSION.find((i) => i.token === Number(token))
  console.log(`---session`, session)
  if (session) {
    res.status(200).json({
      msg: 'Welcome',
    })
  } else {
    res.status(401).json({
      error: 'Unauthorized Request',
    })
  }

  console.log(token)
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
  console.log(`Server Connected on port ${PORT}`)
})
