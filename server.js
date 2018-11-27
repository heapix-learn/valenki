const fs = require('fs')
const jsonServer = require('json-server')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const userdb = JSON.parse(fs.readFileSync('users.json', 'UTF-8'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

const SECRET_KEY = '123456789'
const expiresIn = '10h'


// Create a token from a payload
function createToken (payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

// Verify the token
function verifyToken (token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => decode.login ? decode : err)
}

// Check if the user exists in database
function isAuthenticated ({ login, password }) {
  return userdb.users.findIndex(user => user.login === login && user.password === password) !== -1
}

server.post('/auth/login', (req, res) => {
  const credentials = {
    login: req.body.credential.name,
    password: req.body.credential.password
  }
  if (isAuthenticated(credentials) === false) {
    const status = 401
    const message = 'Incorrect login or password'
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken(credentials)
  res.status(200).json({access_token})
})

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization === 'null') {
    const status = 401
    const message = 'Bad authorization header'
    res.status(status).json({status, message})
    return
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[0]);
    next()
  } catch (err) {
    const status = 401
    const message = 'Error: access_token is not valid'
    res.status(status).json({status, message})
  }
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
