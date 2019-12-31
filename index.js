const http = require('http')
const mongoose = require('mongoose')

const config = require('./config')
const Tasks = require('./Tasks')

const PORT = process.env.PORT || 6005
const server = http.createServer((req, res) => res.end('WebSocket'))

const io = require('socket.io')(server)

io.sockets.on('connection', socket => {

	socket.on('created::task', async data => {
		const task = await Tasks.create({ name: data.name })
		io.emit('created::task', task)
	})
})


mongoose.Promise = global.Promise
mongoose.set('useUnifiedTopology', true)

mongoose.connect(config.database.uri, { useNewUrlParser: true })
.then(() => {
	server.listen(PORT, () => {
		console.log('Conectado a MongoDB..')
		console.log(`Sever running in https://localhost:${PORT}`)
	})
})
