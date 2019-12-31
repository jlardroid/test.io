import http from 'http'
import mongoose from 'mongoose'
import socketIO from 'socket.io'

import config from './config'
import Tasks from './Tasks'

const PORT = process.env.PORT || 6002
const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' })
	res.end('WebSocket')
})

const io = socketIO(server)
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
