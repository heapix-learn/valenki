const fs = require('fs')
const jsonServer = require('json-server')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const userdb = JSON.parse(fs.readFileSync('db.json', 'UTF-8'))
const messagedb = JSON.parse(fs.readFileSync('db.json', 'UTF-8'))
const middlewares = jsonServer.defaults()

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

server.use(middlewares);
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

const SECRET_KEY = '123456789'
const expiresIn = '10h'


// Create a token from a payload
function createToken(payload) {
	return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token
function verifyToken(token) {
	return jwt.verify(token, SECRET_KEY, (err, decode) => decode.email ? decode : err)
}

// Check if the user exists in database
function isAuthenticated({email, password}) {
	const userdb = JSON.parse(fs.readFileSync('db.json', 'UTF-8'))
	return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}

function findUser({email, password}) {
	const userdb = JSON.parse(fs.readFileSync('db.json', 'UTF-8'))
	return userdb.users.find(user => user.email === email && user.password === password)
}

function likeMessage(id, count) {
	const messagedb = JSON.parse(fs.readFileSync('db.json', 'UTF-8'))
	const LikedMessage = messagedb.messages.find(message => message.id === id)
	LikedMessage.liked += count;
	messagedb.messages[messagedb.messages.findIndex(message => message.id === id)] = LikedMessage;
	db.set('messages', messagedb.messages)
		.write()
	return LikedMessage.liked;
}

function dislikeMessage(id, count) {
	const messagedb = JSON.parse(fs.readFileSync('db.json', 'UTF-8'))
	const disLikedMessage = messagedb.messages.find(message => message.id === id)
	disLikedMessage.disliked += count;
	messagedb.messages[messagedb.messages.findIndex(message => message.id === id)] = disLikedMessage;
	db.set('messages', messagedb.messages)
		.write()
	return disLikedMessage.disliked;

}

server.post('/auth/login', (req, res) => {
	const email = req.body.email
	console.log(email)
	const password = req.body.password
	console.log(password)

	if (isAuthenticated({email, password}) === false) {
		const status = 401
		const message = 'Incorrect email or password'
		res.status(status).json({status, message})
		return
	}
	const user = findUser({email, password})
	const access_token = createToken({email, password})
	res.status(200).json({access_token, user})
})

server.post('/auth/register', (req, res) => {
	const email = req.body.email
	const password = req.body.password
	if (findUser({email, password}) !== undefined) {
		const status = 401
		const message = 'This user already registered'
		res.status(status).json({status, message})
		return
	}
	const userdb = JSON.parse(fs.readFileSync('db.json', 'UTF-8'))
	const id = userdb.users[userdb.users.length - 1].id + 1
	const user = req.body
	user.id = id
	db.get('users').push(user)
		.write()
	res.status(200).json(id)
})

// server.post('/likes', (req, res) => {
// 	const like = req.body;
// 	db.get('likes').push(like)
// 		.write()
// 	res.status(200).json('lalala')
// 	return
// })

// server.put('/messages_like', (req, res) => {
// 	const id = req.body.id;
// 	const count = req.body.count
// 	const counter = likeMessage(id, count)
// 	res.status(200).json(counter)
// 	return
// })
//
// server.put('/messages_dislike', (req, res) => {
// 	const id = req.body.id;
// 	const count = req.body.count
// 	const counter = dislikeMessage(id, count)
// 	res.status(200).json(counter)
// 	return
// })

server.use(/^(?!\/users)(?!\/auth).*$/, (req, res, next) => {
	if (req.headers.authorization === undefined || req.headers.authorization === 'null') {
		const status = 401
		const message = 'Bad authorization header'
		res.status(status).json({status, message})
		return
	}
	try {
		verifyToken(req.headers.authorization.split(' ')[0])
		next()
	} catch (err) {
		const status = 401
		const message = 'Error: access_token is not valid'
		res.status(status).json({status, message})
	}
})

server.use(router);
server.listen(3000, () => {
	console.log('JSON Server is running')
})
